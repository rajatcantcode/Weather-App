import React, { useEffect, useState, useRef } from "react";
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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const observer = useRef<IntersectionObserver | null>(null);
  const lastCityElementRef = useRef<HTMLTableRowElement | null>(null);

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
  }, [searchTerm]);

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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset page when a new search term is entered
    setCities([]); // Clear existing cities when starting a new search
  };

  return (
    <div className="overflow-x-auto">
      <input
        type="text"
        placeholder="Search city..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <motion.table
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full border-collapse"
      >
        <thead>
          <tr>
            <th className="px-4 py-2">City Name</th>
            <th className="px-4 py-2">Country</th>
            <th className="px-4 py-2">Timezone</th>
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
                    <Link
                      to={`/weather/${city.geoname_id}`}
                      className="text-blue-500 hover:underline"
                    >
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
