import './Sidebar.css';
import { useStateValue } from '../StateProvider';
import { useEffect, useState } from 'react';

const Sidebar = () => {
  const [weatherData, SetWeatherData] = useState();

  useEffect(() => {
    const successCallback = (position) => {
      console.log(position.coords.longitude, position.coords.latitude);
      let URL = `https://community-open-weather-map.p.rapidapi.com/forecast?units=metric&lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
      fetch(URL, {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
          'x-rapidapi-key':
            '103f715cf8msh733c1d98bc68e04p156b81jsn2e2d3849b1a1',
        },
      })
        .then((response) => response.json())
        .then((data) => SetWeatherData(data))
        .catch((err) => {
          console.error(err);
        });
    };
    const errorCallback = (err) => console.log(err);

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);

  const [{ user }] = useStateValue();

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h4>{weatherData?.city.name} </h4>
        <img
          src={`/icons/${weatherData?.list[0].weather[0].icon}.png`}
          alt="weather_img"
        />
        <h1>{Math.round(weatherData?.list[0].main.temp)}°C</h1>
      </div>
      <div className="sidebar__bottom">
        <h4>Welcome</h4>
        <h4>{user?.displayName}</h4>
      </div>
    </div>
  );
};

export default Sidebar;
