import { useState, ReactElement, Dispatch, SetStateAction } from "react";
import {
  Stack,
  Box,
  Tooltip,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import DatePicker from "@/components/core/DatePicker";
import { handleTenantRequest } from "@/src/utils/tenantRequest";
import { Listing } from "@/src/api/types";
import { ButtonPrimary, ButtonSecondary } from "@/components/core/Button";

interface TenantRequestModalProps {
  isOpen: boolean;
  onClose: () => any;
  availableDate: string;
  listing: Listing;
  userUid: string;
  onSuccess?: () => void;
  onError?: () => void;
  setLoading?: Dispatch<SetStateAction<boolean>>;
  isLoading?: boolean;
  isDisabled?: boolean;
  requestTooltip?: string;
}

function TenantRequestModal(props: TenantRequestModalProps): ReactElement {
  const {
    isOpen,
    availableDate,
    onClose,
    listing,
    userUid,
    onSuccess,
    onError,
    setLoading,
    isLoading = false,
    isDisabled = false,
    requestTooltip,
  } = props;
  const [requestLeaseStartDate, setRequestLeaseStartDate] = useState(
    new Date(availableDate) >= new Date() ? new Date(availableDate) : new Date()
  );

  const onTenantRequest = () => {
    handleTenantRequest(
      listing,
      userUid,
      listing.owner.uid,
      requestLeaseStartDate,
      onSuccess,
      onError,
      setLoading
    );
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Tenant Request</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing="20px">
            <Text>Please select your desired lease start date:</Text>
            <Tooltip
              isDisabled={isDisabled}
              hasArrow
              label="Select your desired lease start date."
            >
              <Box>
                <DatePicker
                  isDisabled={isDisabled}
                  selectedDate={requestLeaseStartDate}
                  onChange={(d: Date) => {
                    setRequestLeaseStartDate(d);
                  }}
                  showPopperArrow={false}
                  placeholderText="MM/DD/YYYY"
                  minDate={
                    new Date(availableDate) >= new Date()
                      ? new Date(availableDate)
                      : new Date()
                  }
                />
              </Box>
            </Tooltip>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Tooltip
            isDisabled={!isDisabled || !requestTooltip}
            hasArrow
            label={requestTooltip}
          >
            <Box>
              <ButtonPrimary
                mr={3}
                isDisabled={isDisabled}
                isLoading={isLoading}
                onClick={onTenantRequest}
              >
                Send Tenant Request
              </ButtonPrimary>
            </Box>
          </Tooltip>
          <ButtonSecondary onClick={onClose}>Close</ButtonSecondary>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default TenantRequestModal;
