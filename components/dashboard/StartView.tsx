import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { ButtonPrimary } from "@/components/core/Button";
import { Body1, Heading5 } from "@/components/core/Text";
import RoutePath, { RoutePathDashboard } from "@/src/routes";
import { UserType } from "@/src/enum";
import { getUserType } from "@/src/localStorage";
import { useStore } from "@/src/store";

function StartView(): ReactElement {
  const userTypeLS = getUserType();
  const userTypeStore = useStore((state) => state.userType);
  const setUserTypeStore = useStore((state) => state.setUserType);
  const [userTypeRadio, setUserTypeRadio] = useState(UserType.Tenant);
  const router = useRouter();

  const isModalOpened = !userTypeLS;

  const handleGoToDashboard = () => {
    setUserTypeStore(userTypeRadio);
  };

  useEffect(() => {
    if (userTypeLS) {
      setUserTypeStore(userTypeLS);
    }
  }, [userTypeLS, setUserTypeStore]);

  useEffect(() => {
    if (userTypeStore) {
      // Tabs to bring the user to when initially loading the dashboard
      const defaultRoute =
        userTypeStore === UserType.Tenant
          ? RoutePathDashboard.Rentals
          : RoutePathDashboard.Listings;

      router.push(`${RoutePath.Dashboard}/${defaultRoute}`);
    }
  }, [userTypeStore, router]);

  return (
    <Modal
      // no-op function that makes the linter happy :)
      onClose={Function.prototype()}
      isOpen={isModalOpened}
      isCentered
      size="xs"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading5>
            Hello!{" "}
            <span role="img" aria-label="waving hand">
              👋
            </span>
          </Heading5>
        </ModalHeader>
        <ModalBody>
          <Body1>
            Are you interested as a tenant or as a landlord? Choosing helps show
            you the most relevant content and you can always switch it later in
            the sidebar.
          </Body1>
          <RadioGroup
            onChange={(nextValue) => setUserTypeRadio(nextValue as UserType)}
            value={userTypeRadio}
            my={4}
          >
            <HStack spacing={4}>
              <Radio value={UserType.Tenant}>Tenant</Radio>
              <Radio value={UserType.Landlord}>Landlord</Radio>
            </HStack>
          </RadioGroup>
        </ModalBody>
        <ModalFooter>
          <ButtonPrimary onClick={handleGoToDashboard} isFullWidth>
            Go to dashboard
          </ButtonPrimary>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default StartView;
