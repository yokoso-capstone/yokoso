import React from "react";
import { shallow } from "enzyme";
import { Box, Image, Center } from "@chakra-ui/react";
import {
  PropertyImage,
  MultiWeightText,
  PropertyDes,
} from "../../sections/Listings";

describe("PropertyImage Test", () => {
  const wrapper = shallow(
    <PropertyImage image="https://placekitten.com/400/400" size="150px" />
  );

  it("Base Box Exist", () => {
    const base = wrapper.find(Box);
    expect(base.length).toBe(1);
  });

  it("renders correct image", () => {
    expect(wrapper.find(Image).prop("src")).toEqual(
      "https://placekitten.com/400/400"
    );
  });
});

describe("MultiWeightText Test", () => {
  const wrapper = shallow(<MultiWeightText bold="100" normal="/month" />);

  it("Base Box Exist", () => {
    const base = wrapper.find(Box);
    expect(base.length).toBe(1);
  });

  it("Texts Correct", () => {
    expect(wrapper.text().includes("100")).toBe(true);
    expect(wrapper.text().includes("/month")).toBe(true);
  });
});

describe("PropertyDes Test", () => {
  const wrapper = shallow(
    <PropertyDes numBaths={3} numBeds={4} title="title" location="ottawa" />
  );

  it("Base Center Exist", () => {
    const base = wrapper.find(Center);
    expect(base.length).toBe(1);
  });

  it("Base Box Exist", () => {
    const base = wrapper.find(Box);
    expect(base.length).toBe(2);
  });

  it("Texts Correct", () => {
    expect(wrapper.text().includes("3")).toBe(true);
    expect(wrapper.text().includes("4")).toBe(true);
    expect(wrapper.text().includes("title")).toBe(true);
    expect(wrapper.text().includes("ottawa")).toBe(true);
  });
});
