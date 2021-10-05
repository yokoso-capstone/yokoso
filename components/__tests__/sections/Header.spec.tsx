import React from "react";
import { mount } from "enzyme";

// Example test case to show valid setup of enzyme and jest

test("hello world", () => {
  const wrapper = mount(<p>Hello Jest!</p>);
  expect(wrapper.text()).toMatch("Hello Jest!");
});
