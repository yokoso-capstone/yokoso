import React from "react";
import { shallow } from "enzyme";
import { Box, IconButton } from "@chakra-ui/react";
import { Heading4 } from "../../core/Text";
import DashboardHeader from "../../sections/DashboardHeader";

describe("DashboardHeader Test", () => {
  const wrapper = shallow(<DashboardHeader title="test" />);

  it("Base Box Exist", () => {
    const base = wrapper.find(Box);
    expect(base.length).toBe(1);
  });

  it("Renders heading text equal to the DashboardHeader title prop", () => {
    const title = wrapper.find(Heading4);
    expect(title.text()).toBe("test");
  });

  it("IconButtons Exist", () => {
    expect(
      wrapper.containsMatchingElement(<IconButton aria-label="Notifications" />)
    ).toEqual(true);
    expect(
      wrapper.containsMatchingElement(<IconButton aria-label="Profile" />)
    ).toEqual(true);
  });
});
