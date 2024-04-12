import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CitiesTable from "./pages/CitiesTable";
import WeatherPage from "./pages/WeatherPage";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CitiesTable />}></Route>
          <Route path="/weather/:cityId" element={<WeatherPage />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
