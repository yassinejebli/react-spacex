import React from "react";
import { mount } from "enzyme";
import Nav from "./Nav";
import App from "../../App";
describe("Nav", () => {
  const appWrapper = mount(<App />);
  it("renders two links", () => {
    const nav = appWrapper.find(Nav);
    const links = nav.find("a");
    expect(links.length).toEqual(2);
  });
});
