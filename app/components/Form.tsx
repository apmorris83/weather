import { FC, useState, FormEvent, useEffect } from 'react'
import { CurrentWeather } from '../types/currentWeather'

type FormProps = {
    saveWeather: (weather: CurrentWeather) => void
    clearWeather: () => void
}

export const Form: FC<FormProps> = ({ saveWeather, clearWeather }) => {
    const [location, setLocation] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [hasError, setHasError] = useState(false)

    useEffect(() => {
        if (location.length === 0) {
            setHasError(false)
            clearWeather()
        }
    }, [clearWeather, location])

    const fetchWeather = async (location: string) => {
        setLoading(true)
        setHasError(false)

        try {
            const apiKey = '6d714243321e4166ae7131017231607'
            const response = await fetch(
                `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`
            )

            if (!response.ok) {
                const errorResponse = await response.json()
                setHasError(true)
                setError(errorResponse.error.message)
            } else {
                const {
                    current: { temp_c, humidity, wind_mph },
                    location: { name }
                } = await response.json()
                saveWeather({ temp_c, humidity, wind_mph, name })
            }

            setLoading(false)
        } catch (error) {
            console.log('Error fetching weather data:', error)
            setLoading(false)
        }
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setHasError(false)
        fetchWeather(location)
    }

    const handleChange = (event: FormEvent<HTMLInputElement>) => {
        setLocation(event.currentTarget.value)
    }

    return (
        <form
            className="bg-white shadow-md rounded px-8 pt-8 pb-12 m-2 flex flex-col md:flex-row items-end md:w-3/4 w-full"
            onSubmit={handleSubmit}
        >
            <div className="w-full relative">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                    What is the current weather in...
                </label>
                <input
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        hasError ? 'border-red-500' : ''
                    }`}
                    id="location"
                    type="text"
                    value={location}
                    onChange={handleChange}
                    placeholder="Enter a location"
                />
                {hasError && <p className="text-sm text-red-500 absolute -bottom-6">{error}</p>}
            </div>
            <div className="flex items-center justify-center w-full md:w-auto">
                <button
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full md:ml-4 mt-8 ${
                        !location ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    type="submit"
                    disabled={!location || loading}
                >
                    Submit
                </button>
            </div>
        </form>
    )
}
