import { useEffect, useState, ChangeEvent, ReactElement } from "react";
import { useRouter } from "next/router";
import {
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import RoutePath from "@/src/routes";
import { Formik, Form } from "formik";

interface SearchInputProps {
  placeholder: string;
  ariaLabel: string;
  onSubmit?: () => void;
}

function SearchInput(props: SearchInputProps): ReactElement {
  const { placeholder, ariaLabel, onSubmit } = props;
  const router = useRouter();
  const [value, setValue] = useState("");

  useEffect(() => {
    const queryValue = router.query.value;

    if (queryValue) {
      if (typeof queryValue === "string") {
        setValue(queryValue);
      } else {
        setValue(queryValue[0]);
      }
    }
  }, [router.query]);

  return (
    <Formik
      initialValues={{ value }}
      enableReinitialize
      onSubmit={() => {
        if (onSubmit) {
          onSubmit();
        } else {
          router.push({
            pathname: RoutePath.Search,
            query: { value },
          });
        }
      }}
    >
      <Form>
        <FormControl>
          <InputGroup height="48px">
            <Input
              type="search"
              value={value}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setValue(event.target.value)
              }
              paddingLeft="32px"
              paddingRight="56px"
              placeholder={placeholder}
              rounded="full"
              height="100%"
              fontSize="16px"
              background="white"
              color="text.primary"
              borderColor="common.dark"
              _hover={{}}
            />
            <InputRightElement height="100%" marginRight="8px">
              <IconButton
                type="submit"
                aria-label={ariaLabel}
                icon={<ArrowForwardIcon w={5} h={5} />}
                isRound
                backgroundColor="common.dark"
                color="white"
                size="sm"
                _hover={{
                  backgroundColor: "brand.primary_hover",
                }}
                _active={{
                  backgroundColor: "brand.primary_active",
                }}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </Form>
    </Formik>
  );
}

export default SearchInput;
