import { ReactElement } from "react";
import { Center, CircularProgress } from "@chakra-ui/react";

function LoadingScreen(): ReactElement {
  return (
    <Center height="100vh">
      <CircularProgress isIndeterminate color="gray.400" />
    </Center>
  );
}

export default LoadingScreen;
