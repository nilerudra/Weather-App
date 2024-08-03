# Weather App

A React-based weather application that provides current weather data and a 7-day forecast for any city. The app uses the OpenWeatherMap API to fetch weather information and displays it in an intuitive, user-friendly interface.

## Features

- **Current Weather**: Displays the current temperature, weather icon, and description for the selected city or your current location.
- **7-Day Forecast**: Shows a daily forecast including the day of the week, weather icon, description, and temperature.
- **Search Functionality**: Allows users to search for any city and view the weather data for that location.
- **Location-Based Weather**: Automatically fetches weather data based on the user's current location using browser geolocation.

## Installation

To get started with the Weather App, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/weather-app.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd weather-app
   ```

3. **Install the dependencies:**

   ```bash
   npm install
   ```

4. **Create a `.env` file in the root directory of the project and add your OpenWeatherMap API key:**

   ```
   REACT_APP_API_KEY=your_api_key_here
   ```

5. **Start the development server:**

   ```bash
   npm start
   ```

   Your app should now be running at `http://localhost:3000`.

## Usage

- **Search for Weather**: Type a city name into the search bar and press Enter or click on a suggestion to view the weather data.
- **View Current Location**: Click the location button to fetch weather data based on your current location.
- **Forecast Information**: View detailed weather information for the next 7 days, including the day of the week, weather icon, description, and temperature.

## API

This app uses the [OpenWeatherMap API](https://openweathermap.org/api) to fetch weather data. You will need an API key to use the service. Make sure to replace `your_api_key_here` in the `.env` file with your actual API key.

## Dependencies

- **React**: JavaScript library for building user interfaces.
- **Axios**: Promise-based HTTP client for making API requests.
- **Material-UI**: React components for faster and easier web development.

## Contributing

Feel free to open issues and submit pull requests if you have any improvements or bug fixes.

1. **Fork the repository**
2. **Create a new branch (`git checkout -b feature/your-feature`)**
3. **Commit your changes (`git commit -am 'Add new feature'`)**
4. **Push to the branch (`git push origin feature/your-feature`)**
5. **Create a new Pull Request**

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
