import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function CitiesTable() {
  interface City {
    geoname_id: string;
    name: string;
    country: string;
    timezone: string;
  }

  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastCityElementRef = useRef<HTMLTableRowElement | null>(null);

  const city = useRef();

  async function fetchCities() {
    try {
      setLoading(true);
      setPage(page + 1);
      const response = await axios.get(
        `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?select=geoname_id%2Cname%2Ctimezone%2Ccou_name_en&q=${searchTerm}&limit=20&offset=${
          (page + 1) * 20
        }`
      );
      if (response.data && response.data.results) {
        setCities((prevCities) => [...prevCities, ...response.data.results]);
        setHasMore(response.data.results.length > 0);
        setPage((prevPage) => prevPage + 1);
      } else {
        console.error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching city data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCities();
  }, []);

  useEffect(() => {
    if (!hasMore || loading) return;

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        fetchCities();
      }
      if (entries[0].isIntersecting) {
        fetchCities;
      }
    }, options);

    if (lastCityElementRef.current) {
      observer.current.observe(lastCityElementRef.current);
    }
  }, [hasMore, loading]);

  const handleSearch = async () => {
    const apiKey = "c624a1b68c482efec200eda655c98cca";
    if (city) {
      if (city.current.value.length === 0) {
        fetchCities();
      } else {
        const geoCodingResponse = await axios.get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${city.current.value}&limit=1&appid=${apiKey}`
        );

        const { lat, lon } = geoCodingResponse.data[0];

        const searchedData = await axios.get(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`
        );
        console.log(searchedData);
      }
    }
  };

  return (
    <div className="h-full overflow-x-auto bg-sky-200">
      <div className="text-center search">
        <motion.h1
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          className="mt-10 text-2xl font-semibold"
        >
          Weather App
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, x: -300 }}
          animate={{ opacity: 1, x: 0 }}
          className=""
        >
          <input
            type="text"
            className="px-3 py-2  w-[20vw] my-10 text-lg rounded"
            placeholder="Search city..."
            ref={city}
          />
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.92 }}
            className="px-3 py-2 ml-6 rounded-lg bg-emerald-400"
            onClick={handleSearch}
          >
            Search
          </motion.button>
        </motion.div>
      </div>

      <motion.table
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full border-collapse"
      >
        <thead>
          <tr>
            <th className="py-2 ">City Name</th>
            <th className="py-2 ">Country</th>
            <th className="py-2 ">Timezone</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((city, index) => {
            if (index === cities.length - 1) {
              return (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="hover:bg-gray-100"
                  ref={lastCityElementRef}
                >
                  <td className="px-4 py-2 text-center">
                    <Link
                      to={`/weather/${city.geoname_id}`}
                      className="text-blue-500 hover:underline"
                    >
                      {city.name}
                    </Link>
                  </td>
                  <td className="px-4 py-2 text-center">{city.country}</td>
                  <td className="px-4 py-2 text-center">{city.timezone}</td>
                </motion.tr>
              );
            } else {
              return (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="hover:bg-gray-100"
                >
                  <td className="px-4 py-2 text-center">
                    <Link to={`/weather/${city.geoname_id}`} className="">
                      {city.name}
                    </Link>
                  </td>
                  <td className="px-4 py-2 text-center">{city.cou_name_en}</td>
                  <td className="px-4 py-2 text-center">{city.timezone}</td>
                </motion.tr>
              );
            }
          })}
        </tbody>
      </motion.table>
      {loading && <div className="">Loading...</div>}
    </div>
  );
}

export default CitiesTable;
