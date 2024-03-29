import { mockWeatherAPIResponse } from "@__tests__/mocks/mockWeatherAPIResponse"
import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from "@__tests__/utils/customRender"
import { api } from "@services/api"
import { Dashboard } from "@screens/Dashboard"
import { saveStorageCity } from "@libs/asyncStorage/cityStorage"
import { mockCityAPIResponse } from "@__tests__/mocks/mockCityAPIResponse"

describe("Screen: Dashboard", () => {
  it('should be show city weather', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: mockWeatherAPIResponse });

    const city = {
      id: '1',
      name: 'Rio do Sul, BR',
      latitude: 123,
      longitude: 456
    }

    await saveStorageCity(city)

    render(<Dashboard />)

   await waitFor(() => expect(screen.findByText(/rio do sul/i, {}, {timeout: 5000})).toBeTruthy());

  })

  it('should be show another selected weather city', async () =>{
    const city = {
      id: '1',
      name: 'Rio do Sul, BR',
      latitude: 123,
      longitude: 456
    }

    await saveStorageCity(city)

    jest.spyOn(api, 'get')
      .mockResolvedValueOnce({ data: mockWeatherAPIResponse })
      .mockResolvedValueOnce({ data: mockCityAPIResponse })
      .mockResolvedValueOnce({ data: mockWeatherAPIResponse })

      render(<Dashboard />)
      await waitForElementToBeRemoved(() => screen.queryByTestId("loading"))
      
      const cityName = 'São Paulo'

      await waitFor(() => {
        const search = screen.getByTestId('search-input')
        fireEvent.changeText(search, cityName)
      })
  
      await waitFor(() =>  {
        fireEvent.press(screen.getByText(cityName, { exact: false }))
      })
  
      expect(screen.getByText(cityName, { exact: false })).toBeTruthy()
  })
})