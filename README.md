# Introduction

Welcome to the Regal Weather App, designed to harness the power of the AccuWeather Forecast API and provide a comprehensive weather forecast for the next five days.

## Installation

Open a terminal and navigate to any folder where you would like to download the code base for the application. You may also just navigate through your `Desktop` folder.

After navigating to your preferred folder, copy down the commands step by step below in the terminal where you navigated through your preferred folder.

1. ```git clone https://github.com/Fralalala/regal-weather-ui.git```

    The `git clone` command copies the code base to the folder you are in.
    
2. ```npm install```

    The code base as is will need some libraries to be downloaded. Simply `npm install` and it will install the required dependecies.

3. ```npm start```

    Initialize the program by simply running ```npm start```

## Questions

1. How can I input my own AccuWeather API?
    - The application contains a built in feature that accepts an API Key from AccuWeather. If an invalid key is inputted, a default key is used so that regardless if successful or not, it will show data.
  
2. Which libraries are used to aid in Development?
    - Moment.js
    - Axios
    - Framer Motion
    - React-Toastify