'use client'

import { useCallback, useState } from 'react'
import { Form } from './components/Form'
import { CurrentWeather } from './types/currentWeather'
import { Weather } from './components/Weather'

export default function Home() {
    const [weather, setWeather] = useState<CurrentWeather | null>(null)

    const saveWeather = useCallback((data: CurrentWeather) => {
        setWeather(data)
    }, [])

    const clearWeather = useCallback(() => {
        setWeather(null)
    }, [])

    return (
        <main className="flex justify-center flex-col items-center h-screen">
            <Form saveWeather={saveWeather} clearWeather={clearWeather} />
            {!!weather && <Weather weather={weather} />}
        </main>
    )
}
