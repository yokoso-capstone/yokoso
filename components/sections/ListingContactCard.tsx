import { useState, ChangeEvent, ReactElement } from "react";
import { ButtonPrimary } from "@/components/core/Button";
import { Card } from "@/components/core/Layout";
import { Body1, Heading4, Heading5, TextBase } from "@/components/core/Text";
import {
  Box,
  Divider,
  HStack,
  Icon,
  Image,
  SkeletonCircle,
  Stack,
  Textarea,
  Tooltip,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { getUTCMonthString } from "@/src/utils";

interface ListingCardProps {
  price: number;
  firstName: string;
  lastName: string;
  profilePicture: string;
  joined: number;
  disabled?: boolean;
}

function ListingCard(props: ListingCardProps): ReactElement {
  const {
    price,
    firstName,
    lastName,
    profilePicture,
    joined,
    disabled,
  } = props;
  const joinedDate = new Date(joined);
  const [value, setValue] = useState("");
  const placeholderText = `Hi ${firstName}, I am interested in your listing. Is it still available? When would be a good time to view it?`;

  const handleFocus = () => {
    if (!value) {
      setValue(placeholderText);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target?.value;
    setValue(inputValue);
  };

  return (
    <Card
      width="100%"
      padding={["3rem 2rem", "5rem 3rem", "5rem 4rem", "4rem 3rem"]}
    >
      <Stack spacing="24px">
        <HStack align="baseline">
          <Heading4>${price.toLocaleString("en")} </Heading4>{" "}
          <TextBase fontSize="20px">/month</TextBase>
        </HStack>
        <Divider />
        <HStack spacing="24px">
          <Image
            src={profilePicture}
            rounded="full"
            boxSize="48px"
            objectFit="cover"
            fallback={<SkeletonCircle size="48px" />}
          />
          <Stack spacing="4px">
            <HStack>
              <Body1>
                {firstName} {lastName}
              </Body1>
              <Icon
                as={FaCheckCircle}
                color="text.primary"
                width="16px"
                height="16px"
              />
            </HStack>
            <Body1 color="text.variant">
              Joined {getUTCMonthString(joinedDate)}{" "}
              {joinedDate.getUTCFullYear()}
            </Body1>
          </Stack>
        </HStack>
        <Divider />
        <Stack spacing="16px">
          <Heading5>Contact</Heading5>
          <Textarea
            disabled={disabled}
            placeholder={placeholderText}
            size="sm"
            borderRadius="4px"
            padding="16px"
            lineHeight="1.5"
            height="100px"
            value={value}
            onChange={handleInputChange}
            onFocus={handleFocus}
          />
          <Tooltip
            isDisabled={Boolean(value)}
            hasArrow
            label={
              disabled
                ? "Create an account or log in to get started"
                : "Enter a message to send"
            }
          >
            <Box>
              <ButtonPrimary isDisabled={!value} isFullWidth>
                Send
              </ButtonPrimary>
            </Box>
          </Tooltip>
        </Stack>
      </Stack>
    </Card>
  );
}

export default ListingCard;
