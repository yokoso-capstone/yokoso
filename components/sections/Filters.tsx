import Slider from "rc-slider";
import "rc-tooltip/assets/bootstrap.css";
import { Heading6 } from "@/components/core/Text";
import {
  HStack,
  Center,
  Input,
  Button,
  Box,
  InputLeftElement,
  InputGroup,
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
  max: number;
  min: number;
  value: number[];
  step?: number;
  filterName: string;
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
    <Box p="10px">
      <Range
        allowCross={false}
        defaultValue={value}
        draggableTrack
        min={min}
        max={max + 1}
        onAfterChange={onChange}
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
              children="$"
            />
            <Input value={`${value[0]}`} />
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
              children="$"
            />
            <Input
              isReadOnly
              value={`${value[1] > max ? `${max}+` : `${value[1]}`}`}
            />
          </InputGroup>
        </HStack>
      </Center>
    </Box>
  );
}
