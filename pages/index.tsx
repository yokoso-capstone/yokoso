import { ReactElement } from "react";
import { Button } from "@/components/core/Button";
import Signup from "@/components/Signup";
import { useDisclosure } from "@chakra-ui/hooks";
import Login from "@/components/Login";

function HomePage(): ReactElement {
  const {
    isOpen: isOpenSignup,
    onOpen: onOpenSignup,
    onClose: onCloseSignup,
  } = useDisclosure();

  const {
    isOpen: isOpenLogin,
    onOpen: onOpenLogin,
    onClose: onCloseLogin,
  } = useDisclosure();
  return (
    <>
      <Button onClick={onOpenSignup}>Signup</Button>
      <Signup isOpen={isOpenSignup} onClose={onCloseSignup} />

      <Button onClick={onOpenLogin}>Login</Button>
      <Login isOpen={isOpenLogin} onClose={onCloseLogin} />
    </>
  );
}

export default HomePage;
