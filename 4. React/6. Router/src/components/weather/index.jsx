
import { useState, useEffect } from "react"
import Post from "./../post"
import axios from "axios";




function Weather() {

    const [weatherData, setWeatherData] = useState(null)
    const [cityName, setCityName] = useState("")

    const submitHandler = (e) => {
        e.preventDefault();

        console.log("I am click handler")
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=e0f99c494c2ce394a18cc2fd3f100543`)
            .then(response => {
                console.log("response: ", response.data);

                setWeatherData(response.data);
            })
            .catch(err => {
                console.log("error: ", err);
            })
    }

    return (
        <div>

            <form onSubmit={submitHandler}>
                City Name:
                <input type="text" placeholder="enter your city name" required
                    onChange={(e) => { setCityName(e.target.value) }} />

                <button type="submit">get weather</button>
            </form>
            <br />
            <br />

            {(weatherData === null) ? null :
                <div>
                    Temperature: {Math.round(weatherData?.main?.temp)}°C
                    <br />
                    min: {Math.round(weatherData?.main?.temp_min)}°C
                    <br />
                    max: {Math.round(weatherData?.main?.temp_max)}°C
                </div>
            }
        </div>
    );
}

export default Weather;



