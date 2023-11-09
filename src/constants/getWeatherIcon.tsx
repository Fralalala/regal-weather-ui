const weatherIcons: { [key: string]: string } = {
  sunny: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/clear-day.svg",
  "mostly sunny":
    "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/fog-day.svg",
  "partly sunny":
    "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/partly-cloudy-day.svg",
  "intermittent clouds":
    "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/partly-cloudy-day.svg",
  "hazy sunshine":
    "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/haze-day.svg",
  "mostly cloudy":
    "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/partly-cloudy-day.svg",
  cloudy:
    "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/partly-cloudy-day.svg",
  "dreary (overcast)":
    "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/fog.svg",
  fog: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/fog.svg",
  showers: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/drizzle.svg",
  "mostly cloudy w/ showers":
    "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/rain.svg",
  "partly sunny w/ showers":
    "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/rain.svg",
  "t-storms":
    "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/thunderstorms.svg",
  "mostly cloudy w/ t-storms":
    "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/thunderstorms-extreme.svg",
  "partly sunny w/ t-storms":
    "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/thunderstorms.svg",
  rain: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/rain.svg",
  flurries: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/rain.svg",
};

export const getWeatherIcon = (weatherPhrase: string) => {
  return (
    weatherIcons?.[weatherPhrase] ||
    "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-day.svg"
  );
};
