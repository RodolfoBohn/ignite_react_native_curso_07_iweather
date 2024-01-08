import { render, fireEvent } from "@testing-library/react-native"
import { SelectList } from "."
import { CityProps } from "@services/getCityByNameService"

describe("Components:SelectList", () => {
  it("should return selected item data", () => {
    const data: CityProps[] = [{
      id: '1', latitude: 123, longitude: 123, name: "Novo Hamburgo"},
      {id: '2', latitude: 789, longitude: 546, name: "Feliz"}
    ]

    const onPress = jest.fn()

    const {getByTestId, getByText} = render(<SelectList data={data} onChange={() => {}} onPress={onPress} />)

    const options = getByTestId("select-list-options")

    const button = getByText(data[0].name)

    fireEvent(button, 'press')

    expect(onPress).toHaveBeenCalledTimes(1)
    expect(onPress).toHaveBeenCalledWith(data[0])
    expect(options.children).toHaveLength(2)
  })

  it("should not render with empty list", () => {
    const {getByTestId} = render(<SelectList data={[]} onChange={() => {}} onPress={() => {}} />)
    const options = getByTestId("select-list-options")

    expect(options.children).toHaveLength(0)
  })
})