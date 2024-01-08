import { render, waitFor, screen, act } from "@__tests__/utils/customRender"
import { Routes } from "."
import { saveStorageCity } from "@libs/asyncStorage/cityStorage"
import { api } from "@services/api"
import { mockWeatherAPIResponse } from "@__tests__/mocks/mockWeatherAPIResponse"

describe("Routes", () => {
  it('should be render Search screen when not city selected', async () => {
    render(
      <Routes />
    )
      const title = waitFor(() => screen.findByText("Escolha um local para ver a previsão do tempo"))
    
      expect(title).toBeTruthy()
  })

  it('should render dashboard when city is selected', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({data: mockWeatherAPIResponse})

    await saveStorageCity({
      id: '1', 
      latitude: 123, 
      longitude: 456, 
      name: "Novo Hamburgo"
    })
    
    const {findByText} = await act(() => waitFor(() => render(<Routes />)))
    
    const title = findByText("Novo Hamburgo")
    expect(title).toBeTruthy()
  })
})