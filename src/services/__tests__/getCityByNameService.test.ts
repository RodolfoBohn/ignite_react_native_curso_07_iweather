import { mockCityAPIResponse } from "@__tests__/mocks/mockCityAPIResponse"
import { api } from "@services/api"
import { CityProps, getCityByNameService } from "@services/getCityByNameService"

describe("Service:getCityByNameService", () => {
  it("should return data correctly", async () => {
    jest.spyOn(api, 'get').mockResolvedValue({data: mockCityAPIResponse})

    const expected:CityProps = {
      id: mockCityAPIResponse.id, 
      latitude: mockCityAPIResponse.coord.lat, 
      longitude: mockCityAPIResponse.coord.lon, 
      name: `${mockCityAPIResponse.name}, ${mockCityAPIResponse.sys.country}`
    }

    const response = await getCityByNameService("São Paulo")
    
    expect(response).toHaveLength(1)
    expect(response).toStrictEqual([expected])
  })
})