
import { useState } from "react"
import axios from "axios";


let baseUrl = ``;
if (window.location.href.split(":")[0] === "http") {
    baseUrl = `http://localhost:5001`;
}


function App() {

    const [weatherData, setWeatherData] = useState(null)
    const [cityName, setCityName] = useState("")

    const submitHandler = (e) => {
        e.preventDefault();

        console.log("I am click handler")
        axios.get(`${baseUrl}/weather/${cityName}`)
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

                    City: {weatherData?.city}
                    <br />
                    Temperature: {Math.round(weatherData?.temp)}°C
                    <br />
                    min: {Math.round(weatherData?.min)}°C
                    <br />
                    max: {Math.round(weatherData?.max)}°C
                    <br />
                    humidity: {Math.round(weatherData?.humidity)}°C
                </div>
            }
        </div>
    );
}

export default App;




