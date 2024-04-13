<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

</head>
<body>

<h1>WeatherApp</h1>

<h2>Overview</h2>
<p>WeatherApp is a web application that provides weather information for various cities. It consists of two main pages: Citiestable and WeatherPage.</p>

<h2>Citiestable</h2>
<p>The Citiestable page displays a table of cities along with their corresponding country and timezone. The table implements infinite scroll functionality, where additional cities are loaded automatically as the user scrolls down the page. Each scroll triggers the addition of the next 20 cities to the table.</p>

<h3>Features</h3>
<ul>
  <li>Infinite scroll: As the user scrolls down the page, additional cities are loaded dynamically.</li>
  <li>City details: Clicking on a city name in the table redirects the user to the WeatherPage with the corresponding city's ID attached to the route.</li>
</ul>

<h2>WeatherPage</h2>
<p>The WeatherPage displays detailed weather information for a specific city. It retrieves the city ID from the route parameters using the useParams hook and then fetches the weather data from an external API.</p>

<h3>Features</h3>
<ul>
  <li>Dynamic routing: Retrieves the city ID from the route parameters using useParams.</li>
  <li>API integration: Fires an API request to fetch weather data for the specific city using the city ID.</li>
  <li>Display weather information: Renders the retrieved weather data on the page, including temperature, humidity, wind speed, and other relevant information.</li>
</ul>

<h2>Technologies Used</h2>
<ul>
  <li>React.js: Front-end library for building user interfaces.</li>
  <li>React Router: Library for declarative routing in React applications.</li>
  <li>Axios: Promise-based HTTP client for making API requests.</li>
  <li>Framer Motion: Animation library for React.</li>
  <li>Three.js: 3D graphics library for creating 3D animations and visualizations.</li>
  <li>TypeScript: Typed superset of JavaScript for improved developer experience.</li>
</ul>

<h2>Installation</h2>
<ol>
  <li>Clone the repository from <a href="https://github.com/vishwajitingole/Weather-App">GitHub Repository URL</a>.</li>
  <li>Navigate to the project directory.</li>
  <li>Run <code>npm install</code> to install dependencies.</li>
  <li>Start the development server by running <code>npm run dev</code>.</li>
  <li>Access the application in your web browser at the provided URL.</li>
</ol>

</body>
</html>
