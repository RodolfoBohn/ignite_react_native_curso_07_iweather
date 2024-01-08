import { CityProps } from "@services/getCityByNameService"
import { getStorageCity, saveStorageCity, removeStorageCity } from "./cityStorage"

describe("libs: cityStorage", () => {
  const newCity: CityProps = {
    id: '1', 
    latitude: 123, 
    longitude: 456, 
    name: 'Novo Hamburgo'
  }

  it('should return null when have any city storaged', async () => {
    const response =await getStorageCity()

    expect(response).toBeNull()
  })

  it('should return storaged city', async () => {
    await saveStorageCity(newCity)
    const response = await getStorageCity()
    
    expect(response).toStrictEqual(newCity)
  })

  it('should remove storaged city', async () => {
    await saveStorageCity(newCity)
    await removeStorageCity()

    const response = await getStorageCity()
    
    expect(response).toBeNull()
  })
})