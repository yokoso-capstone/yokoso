import React from "react";
import ReactDatePicker from "react-datepicker";
import { Input } from "@chakra-ui/react";

interface Props {
  isClearable?: boolean;
  onChange: (date: Date) => any;
  selectedDate: Date | undefined;
  showPopperArrow?: boolean;
  placeholderText?: string;
  startDate?: Date;
  endDate?: Date;
  maxDate?: Date;
  minDate?: Date;
  name?: string;
  isDisabled?: boolean;
}

const DatePicker = ({
  selectedDate,
  onChange,
  isClearable = false,
  showPopperArrow = false,
  placeholderText = "DD/MM/YYYY",
  isDisabled = false,
  startDate,
  endDate,
  maxDate,
  minDate,
  name,
}: Props) => (
  <ReactDatePicker
    selected={selectedDate}
    onChange={onChange}
    isClearable={isClearable}
    showPopperArrow={showPopperArrow}
    placeholderText={placeholderText}
    startDate={startDate}
    endDate={endDate}
    maxDate={maxDate}
    minDate={minDate}
    customInput={<Input isDisabled={isDisabled} />}
    name={name}
  />
);

export default DatePicker;
