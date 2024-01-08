import { getNextDays } from "./getNextDays"

describe("getNextDays", () => {
  test('should return next five days', () => {
    const days = getNextDays()
  
    expect(days.length).toBe(5)
  })
})