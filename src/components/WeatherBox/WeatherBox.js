import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';
import ErrorBox from '../ErrorBox/ErrorBox';
const WeatherBox = props => {
  const [weatherData, setWeatherData] = useState('');
  const [pending,setPending] = useState(false);
  const [errorData,setErrorData] = useState(false);
  const handleCityChange = useCallback(city=>{
    const key = '9c028ec1ea0172688df831c561aa8520';
    setPending(true);
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`)
   .then(res => {
    if(res.status === 200){
      return res.json()
      .then(data => {
       setPending(false);
       setErrorData(false);
       setWeatherData({
         city: data.name,
         temp: data.main.temp,
         icon: data.weather[0].icon,
         description: data.weather[0].main
       });
     });
    }else{
      setPending(false);
      setErrorData(true);
      alert('ERROR');
    };
   });
},[]);
console.log(weatherData);
  return (
    <section>
      <PickCity weather={handleCityChange} />
      { (weatherData && !pending) && <WeatherSummary {...weatherData} /> }
      {pending && <Loader />}
      {errorData && <ErrorBox />}
    </section>
  )
};

export default WeatherBox;