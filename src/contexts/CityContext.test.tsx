import { useCity } from "@hooks/useCity"
import { act, renderHook, waitFor } from "@testing-library/react-native"
import { CityProvider } from "./CityContext"

describe("Context: CityContext", () => {
  it("should be change selected city", async () => {
    const {result} = renderHook(() => useCity(), {wrapper: CityProvider})

    //waitfor: aguarda o useEffect interno do cityProvider, e act executa a ação após o término do useEffect
    await waitFor(() => act(() => result.current.handleChanceCity({
        id: '1', 
        latitude: 123, 
        longitude: 456,
        name: "Novo Hamburgo"
      })
    ))
      expect(result.current.city?.name).toBe("Novo Hamburgo")
  })
})