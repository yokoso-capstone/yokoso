import React from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";

interface PasswordProps {
  isInvalid?: boolean;
  onChange?: (value: any) => any;
  focusBorderColor?: string;
}

function Password(props: PasswordProps) {
  const [show, setShow] = React.useState(false);
  const { isInvalid, onChange, focusBorderColor } = props;
  const handleClick = () => setShow(!show);

  return (
    <InputGroup>
      <Input
        pr="4.5rem"
        type={show ? "text" : "password"}
        placeholder="Password"
        isInvalid={isInvalid}
        onChange={onChange}
        focusBorderColor={focusBorderColor}
      />
      <InputRightElement width="3rem">
        <IconButton
          variant="ghost"
          size="sm"
          aria-label="Show Password"
          onClick={handleClick}
          icon={show ? <ViewOffIcon /> : <ViewIcon />}
        />
      </InputRightElement>
    </InputGroup>
  );
}

export default Password;
