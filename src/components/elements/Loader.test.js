import React from "react";
import { shallow } from "enzyme";
import Loader from "./Loader";
describe("Loader", () => {
  const loader = shallow(<Loader />);
  it("shows loader", () => {
    loader.setProps({
      loading: true,
    });
    expect(loader.find("#loader").exists()).toBeTruthy();
  });

  it("hides loader", () => {
    loader.setProps({
      loading: false,
    });
    expect(loader.find("#loader").exists()).not.toBeTruthy();
  });
});
