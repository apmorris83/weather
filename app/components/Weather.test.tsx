import { render, screen } from '@testing-library/react'
import { Weather } from './Weather'

const weather = { temp_c: 10, humidity: 20, wind_mph: 30, name: 'Manchester' }

describe('Weather', () => {
    const setup = () => {
        return render(<Weather weather={weather} />)
    }

    it('should render', () => {
        setup()
        expect(screen.getByText('Temperature: 10')).toBeVisible()
        expect(screen.getByText('Humidity: 20')).toBeVisible()
        expect(screen.getByText('Wind speed: 30mph')).toBeVisible()
    })
})
