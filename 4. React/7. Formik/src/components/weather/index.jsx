
import { useState } from "react"
import axios from "axios";
import { useFormik } from 'formik';
import * as yup from 'yup';

import "./index.css"

function Weather() {

    const [weatherData, setWeatherData] = useState(null)

    const myFormik = useFormik({
        initialValues: {
            cityName: '',
        },
        validationSchema:
            yup.object({
                cityName: yup
                    .string('Enter your email')
                    .required('Email is required')
                    .min(3, "please enter more then 3 characters ")
                    .max(20, "please enter within 20 characters "),
            }),
        onSubmit: (values) => {
            console.log("values: ", values);

            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${values.cityName}&units=metric&appid=e0f99c494c2ce394a18cc2fd3f100543`)
                .then(response => {
                    console.log("response: ", response.data);

                    setWeatherData(response.data);
                })
                .catch(err => {
                    console.log("error: ", err);
                })
        },
    });


    return (
        <div>
            <form onSubmit={myFormik.handleSubmit}>
                <input
                    id="cityName"
                    label="City Name"
                    value={myFormik.values.cityName}
                    onChange={myFormik.handleChange}
                />
                {
                    (myFormik.touched.cityName && Boolean(myFormik.errors.cityName)) ?
                        <span style={{ color: "red" }}>{myFormik.errors.cityName}</span>
                        :
                        null
                }

                <br />
                <button type="submit"> Submit </button>
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
        </div >
    );
}

export default Weather;



