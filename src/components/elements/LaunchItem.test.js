import { shallow } from "enzyme";
import React from "react";
import LaunchItem from "./LaunchItem";

const setup = (Component, props = {}) => {
  const wrapper = shallow(<Component {...props} />);
  return wrapper;
};

describe("LaunchItem", () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      missionName: "Mission name",
      nationality: "Spain",
      manufacturer: "Spain",
      type: "Type 1",
    };
    wrapper = setup(LaunchItem, props);
  });
  it("should render launchItem component", () => {
    const launchItemComponent = wrapper.find(
      `[data-test='launchItemComponent']`
    );
    expect(launchItemComponent.exists()).toBeTruthy();
  });

  it("should show 'Mission name' in the title element", () => {
    const missionNameElement = wrapper.find(`[data-test='missionName']`);
    expect(missionNameElement.text()).toBe("Mission name");
  });
});
