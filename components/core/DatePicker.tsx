import React, { HTMLAttributes } from "react";
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
  value?: string;
}

const DatePicker = ({
  selectedDate,
  onChange,
  isClearable = false,
  showPopperArrow = false,
  placeholderText = "DD/MM/YYYY",
  startDate,
  endDate,
  maxDate,
  minDate,
  name,
  onBlur,
}: Props & HTMLAttributes<HTMLElement>) => (
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
    customInput={<Input />}
    name={name}
    onBlur={onBlur}
  />
);

export default DatePicker;
