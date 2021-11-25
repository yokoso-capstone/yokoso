import React from "react";
import Slider from "rc-slider";
import "rc-tooltip/assets/bootstrap.css";
import {
  HStack,
  Center,
  Input,
  Button,
  Box,
  InputLeftElement,
  InputGroup,
} from "@chakra-ui/react";
import { Heading6 } from "../core/Text";

interface CounterProps {
  onClickMinus: () => any;
  onClickAdd: () => any;
  value: number;
}

interface SliderProps {
  max: number;
  min: number;
  value: number[];
  onChange: (x: any) => any;
}

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

export function CounterFilter(props: CounterProps) {
  const { onClickAdd, onClickMinus, value } = props;
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
  const { max, min, value, onChange } = props;
  return (
    <Box p="10px" aria-label="base">
      <Range
        allowCross={false}
        value={value}
        draggableTrack
        min={min}
        max={max + 1}
        onChange={onChange}
        tipFormatter={(value) => (value > max ? `$${max}+` : `$${value}`)}
        trackStyle={[{ background: "#BC002D" }]}
        handleStyle={[{ backgroundColor: "white", borderColor: "grey" }]}
      />
      <Center p="10px">
        <HStack>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              padding="0px"
              color="gray.300"
              fontSize="1em"
            >
              $
            </InputLeftElement>
            <Input
              value={value[0]}
              onChange={(event) => {
                const value = Number(event.target.value);

                if (!Number.isNaN(value) && min <= value && value <= max) {
                  onChange([value, max]);
                }
              }}
            />
          </InputGroup>
          <Box>
            <Heading6>-</Heading6>
          </Box>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              padding="0px"
              color="gray.300"
              fontSize="1em"
            >
              $
            </InputLeftElement>
            <Input
              value={`${value[1] > max ? `${max}+` : `${value[1]}`}`}
              onChange={(event) => {
                const value = Number(event.target.value);

                if (!Number.isNaN(value) && min <= value) {
                  onChange([min, value]);
                }
              }}
            />
          </InputGroup>
        </HStack>
      </Center>
    </Box>
  );
}
