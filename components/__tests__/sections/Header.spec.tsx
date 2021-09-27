import React from "react";
import { mount } from "enzyme";

// Example test case to show valid setup of enzyme and jes

test("hello world", () => {
  const wrapper = mount(<p>Hello Jest!</p>);
  expect(wrapper.text()).toMatch("Hello Jest!");
});

// import React from "react";
// import { shallow } from "enzyme";
// import Header from "../../sections/Header";

// describe("Header Test", () => {
//   it("Button Exist", () => {
//     const header = shallow(<Header darkTheme />);
//     expect(header.exists("<ButtonPrimary>")).toBeTruthy();
//   });
// });
