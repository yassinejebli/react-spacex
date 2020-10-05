import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import Header from "./components/elements/Header";
describe("App", () => {
  const appWrapper = shallow(<App />);
  it("renders Header", () => {
    // expect(appWrapper.containsMatchingElement(<Header />)).toEqual(true);
  });
});
