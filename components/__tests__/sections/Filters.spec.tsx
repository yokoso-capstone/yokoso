import React from "react";
import { shallow } from "enzyme";
import { Box, Button, HStack, Center, InputGroup } from "@chakra-ui/react";
import { CounterFilter, SliderFilter } from "../../sections/Filters";

describe("PropertyImage Test", () => {
  const wrapper = shallow(
    <CounterFilter
      value={0}
      onClickAdd={() => null}
      onClickMinus={() => null}
    />
  );

  it("Base Center Exist", () => {
    const base = wrapper.find(Center);
    expect(base.length).toBe(1);
  });

  it("renders correct stack and number of buttons", () => {
    const stack = wrapper.find(HStack);
    const button = wrapper.find(Button);
    expect(stack.length).toBe(1);
    expect(button.length).toBe(2);
  });
});

describe("SliderFilter Test", () => {
  const wrapper = shallow(
    <SliderFilter max={2100} min={0} value={[0]} onChange={() => null} />
  );

  it("Base Box Exist", () => {
    const base = wrapper.find(Box);
    expect(base.length).toBeGreaterThan(1);
  });

  it("Input Groups Exist", () => {
    const base = wrapper.find(InputGroup);
    expect(base.length).toBe(2);
  });
});
