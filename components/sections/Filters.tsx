import { useState } from "react";

import {
  HStack,
  Center,
  Input,
  Button,
  Flex,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  NumberInput,
  NumberInputField,
  Box,
} from "@chakra-ui/react";

interface CounterProps {
  onClickMinus: () => any;
  onClickAdd: () => any;
  value: number;
  onOpen?: () => any;
  onClose?: () => any;
  isOpen?: boolean;
  set: (x: any) => any;
}

interface SliderProps {
  maxValue: number;
  minValue: number;
  value: number;
  step?: number;
  filterName: string;
  onChange: (x: any) => any;
}

export function CounterFilter(props: CounterProps) {
  const { onClickAdd, onClickMinus, value, set } = props;
  return (
    <Center p="10px">
      <HStack spacing="20px">
        <Button borderRadius="20%" onClick={onClickMinus}>
          -
        </Button>
        <Box textAlign="center" w="30px">
          {value}
        </Box>
        <Button borderRadius="20%" onClick={onClickAdd}>
          +
        </Button>
      </HStack>
    </Center>
  );
}

export function SliderFilter(props: SliderProps) {
  const { maxValue, minValue, value, step, filterName, onChange } = props;
  return (
    <Box p="10px">
      <Slider
        aria-label="price-slider"
        max={maxValue}
        min={minValue}
        step={step}
        defaultValue={value}
        onChangeEnd={onChange}
      >
        <SliderTrack>
          <SliderFilledTrack bg="brand.primary" />
        </SliderTrack>
        <SliderThumb borderWidth="1px" borderColor="grey" />
      </Slider>
      <Box>
        {filterName}: ${value}
        {value == maxValue ? "+" : ""}
      </Box>
    </Box>
  );
}
