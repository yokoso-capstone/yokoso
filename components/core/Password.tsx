import React, {useState} from "react";
import { 
    Input,
    InputGroup,
    InputRightElement,
    Button
} from "@chakra-ui/react";

function Password(){
    const [show, setShow] = React.useState(false);
    const handleClick=() =>setShow(!show);

    return(
        <InputGroup>
            <Input 
                pr = "4.5rem"
                type={show ? "text" : "password"} 
                placeholder="Password"
            />
            <InputRightElement width="4.5rem">
                <Button onClick = {handleClick} h ="1.65rem" size="sm">
                    {show? "Hide":"Show"}
                </Button>
            </InputRightElement>
        </InputGroup>
    );
}

export default Password