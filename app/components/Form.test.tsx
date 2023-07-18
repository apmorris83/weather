import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Form } from './Form'

const response = {
    current: { temp_c: 10, humidity: 20, wind_mph: 30 },
    location: { name: 'Manchester' }
}

const mockSave = jest.fn()
const mockClear = jest.fn()

global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve(response)
    })
) as jest.Mock

describe('Form', () => {
    const setup = () => {
        return render(<Form saveWeather={mockSave} clearWeather={mockClear} />)
    }

    it('should render', () => {
        setup()
        expect(screen.getByText('What is the current weather in...')).toBeVisible()
    })

    it('should handle save', async () => {
        setup()
        await userEvent.type(
            screen.getByLabelText('What is the current weather in...'),
            'manchester'
        )
        await userEvent.click(screen.getByRole('button', { name: 'Submit' }))
        expect(mockSave).toBeCalledWith({
            temp_c: 10,
            humidity: 20,
            wind_mph: 30,
            name: 'Manchester'
        })
    })
})
