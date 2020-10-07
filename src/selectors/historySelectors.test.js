import { historySelectors } from "./historySelectors";

describe("History selectors", () => {
  it("should select history state", () => {
    const mockStore = () => ({
      history: {
        historyName: "history name",
      },
    });
    const result = historySelectors(mockStore());
    expect(result.historyName).toEqual("history name");
  });
});
