import { ReactElement } from "react";
import {
  Button,
  BlackButton,
  WhiteButton,
  TransparentButton,
  RedButton,
} from "@/components/core/Button";

import SeachInput from "@/components/core/SearchInput";

function HomePage(): ReactElement {
  return (
    <>
      <Button>hi</Button>
      <BlackButton>Get in Touch</BlackButton>
      <WhiteButton>Get in Touch</WhiteButton>
      <TransparentButton>Get in Touch</TransparentButton>
      <RedButton>Get in Touch</RedButton>
      <SeachInput />
    </>
  );
}

export default HomePage;
