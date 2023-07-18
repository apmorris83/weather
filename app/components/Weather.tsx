import { FC } from 'react'
import { CurrentWeather } from '../types/currentWeather'

type WeatherProps = {
    weather: CurrentWeather
}

export const Weather: FC<WeatherProps> = ({ weather }) => {
    const { temp_c, humidity, wind_mph, name } = weather

    return (
        <div className="bg-white shadow-md rounded p-8 m-2 md:w-3/4 w-full">
            <h1 className="text-gray-700 text-sm font-bold mb-2">{`The current weather in ${name} is:`}</h1>
            <p className="text-gray-700 text-sm">{`Temperature: ${temp_c}`}</p>
            <p className="text-gray-700 text-sm">{`Humidity: ${humidity}`}</p>
            <p className="text-gray-700 text-sm">{`Wind speed: ${wind_mph}mph`}</p>
        </div>
    )
}
