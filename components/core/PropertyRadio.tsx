/* eslint-disable react/destructuring-assignment */
import { useRadio, Box } from "@chakra-ui/react";

function PropertyRadio(props: any) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        width={["None", "100px", "150px", "150px", "150px"]}
        height={["65px", "65px", "74px", "74px", "74px"]}
        textAlign="center"
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "teal.600",
          color: "white",
          borderColor: "teal.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={["2", "2", "5", "5", "5"]}
        py={["2", "2", "3", "3", "3"]}
      >
        {props.children}
      </Box>
    </Box>
  );
}

export default PropertyRadio;
