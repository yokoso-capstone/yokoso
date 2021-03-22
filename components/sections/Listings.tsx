import { Box, Image } from "@chakra-ui/react";
import { Caption, Body1 } from "@/components/core/Text";

interface DescriptionProps {
  location: string;
  title: string;
  numBeds: string;
  numBaths: string;
}

interface TextProps {
  bold: string;
  normal: string;
}

interface ImageProps {
  image: string;
  size?: string;
}

export function PropertyImage(props: ImageProps) {
  const { image, size } = props;
  return (
    <Box w="100%" h="100%" maxWidth={size}>
      <Image src={image} borderRadius="lg" />
    </Box>
  );
}

export function MultiWeightText(props: TextProps) {
  const { bold, normal } = props;
  return (
    <Box>
      <Body1 display="inline" fontWeight="800">
        {bold}
      </Body1>
      <Body1 display="inline">&nbsp;{normal}</Body1>
    </Box>
  );
}

export function PropertyDes(props: DescriptionProps) {
  const { location, title, numBeds, numBaths } = props;
  return (
    <Box>
      <Box>
        <Caption fontSize="14px">{location}</Caption>
        <Body1 fontSize="18px">{title}</Body1>
      </Box>
      <Box>
        <Caption fontSize="14px">
          {numBeds} Bedrooms · {numBaths} Bathrooms
        </Caption>
      </Box>
    </Box>
  );
}
