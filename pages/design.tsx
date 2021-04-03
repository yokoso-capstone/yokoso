import { ReactElement } from "react";
import Head from "next/head";
import { Box } from "@chakra-ui/react";
import { LogoBlack, LogoWhite } from "@/components/core/Branding";
import { LgSearchResult, SmSearchResult } from "@/components/SearchResult";
import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonSecondaryVariant,
  RedButton,
} from "@/components/core/Button";
import SearchInput from "@/components/core/SearchInput";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Body1,
  Body2,
  Caption,
} from "@/components/core/Text";

function DesignPage(): ReactElement {
  return (
    <>
      <Head>
        <title>Yōkoso - Design</title>
        <meta name="description" content="Yōkoso design system." />
      </Head>

      <Box>
        <ButtonPrimary>Button Primary</ButtonPrimary>
        <ButtonSecondary>Button Secondary</ButtonSecondary>
        <ButtonSecondaryVariant>
          Button Secondary Variant
        </ButtonSecondaryVariant>
        <RedButton>Red Button</RedButton>
        <SearchInput
          placeholder="Where are you staying?"
          ariaLabel="Search for homes based on location"
          onSubmit={() => undefined}
        />
        <LogoBlack width="150px" />
        <LogoWhite width="150px" background="black" />
        <Heading1>Heading1</Heading1>
        <Heading2>Heading2</Heading2>
        <Heading3>Heading3</Heading3>
        <Heading4>Heading4</Heading4>
        <Heading5>Heading5</Heading5>
        <Heading6>Heading6</Heading6>
        <Body1>Body1</Body1>
        <Body2>Body2</Body2>
        <Caption>Caption</Caption>
      </Box>

      <LgSearchResult
        key="1"
        imageUrl="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        location="Kanata"
        price="$680"
        numBaths="2"
        numBeds="4"
        id="1"
        title="Beautiful apartment with great view"
      />

      <SmSearchResult
        key="2"
        imageUrl="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        location="Kanata"
        price="$680"
        numBaths="2"
        numBeds="4"
        id="1"
        title="Beautiful apartment with great view"
      />
    </>
  );
}

export default DesignPage;
