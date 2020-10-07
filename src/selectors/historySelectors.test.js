import { historySelectors } from "./historySelectors";

describe("History selectors", () => {
  it("should select history state", () => {
    const mockStore = () => ({
      history: {
        historyName: "history name",
        type: 1,
        type2: 2,
      },
    });
    const result = historySelectors(mockStore());
    expect(result.history).toBe();
  });
});
