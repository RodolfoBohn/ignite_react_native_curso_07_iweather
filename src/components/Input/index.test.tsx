import {render} from '@testing-library/react-native'

import {Input} from '.'

describe("Components: Input", () => {
  test("should render without activityIndicator", () => {
    const {queryByTestId} = render(<Input />)

    const activityIndicator = queryByTestId("input-activity-indicator")

    expect(activityIndicator).toBeNull()
  })

  test("should render with activityIndicator", () => {
    const {queryAllByTestId} = render(<Input isLoading />)

    const activityIndicator = queryAllByTestId("input-activity-indicator")

    expect(activityIndicator).toBeTruthy()
  })
})