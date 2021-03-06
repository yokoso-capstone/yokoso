import React from "react";
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";
import { 
    Input,
    InputGroup,
    InputRightElement,
    IconButton
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
            <InputRightElement width="3rem">
                <IconButton variant = "ghost" size ="sm" aria-label="Show Password" onClick={handleClick} icon={show? <ViewOffIcon/> :<ViewIcon/>}></IconButton>
            </InputRightElement>
        </InputGroup>
    );
}

export default Password