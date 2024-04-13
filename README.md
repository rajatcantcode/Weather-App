WeatherApp 

Overview
WeatherApp is a web application that provides weather information for various cities. It consists of two main pages: Citiestable and WeatherPage.

Citiestable
The Citiestable page displays a table of cities along with their corresponding country and timezone. The table implements infinite scroll functionality, where additional cities are loaded automatically as the user scrolls down the page. Each scroll triggers the addition of the next 20 cities to the table.

Features
Infinite scroll: As the user scrolls down the page, additional cities are loaded dynamically.
City details: Clicking on a city name in the table redirects the user to the WeatherPage with the corresponding city's ID attached to the route.
WeatherPage
The WeatherPage displays detailed weather information for a specific city. It retrieves the city ID from the route parameters using the useParams hook and then fetches the weather data from an external API.

Features
Dynamic routing: Retrieves the city ID from the route parameters using useParams.
API integration: Fires an API request to fetch weather data for the specific city using the city ID.
Display weather information: Renders the retrieved weather data on the page, including temperature, humidity, wind speed, and other relevant information.
Technologies Used
React.js: Front-end library for building user interfaces.
React Router: Library for declarative routing in React applications.
Axios: Promise-based HTTP client for making API requests.
Framer Motion: Animation library for React.
Three.js: 3D graphics library for creating 3D animations and visualizations.
TypeScript: Typed superset of JavaScript for improved developer experience.
Installation
Clone the repository from  https://github.com/vishwajitingole/Weather-App
Navigate to the project directory.
Run npm install to install dependencies.
Start the development server by running npm start.
Access the application in your web browser at the provided URL.
