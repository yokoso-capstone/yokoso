import React, { HTMLAttributes } from 'react';
import ReactDatePicker from 'react-datepicker';

interface Props {
  isClearable?: boolean;
  onChange: (date : Date) => any;
  selectedDate: Date | undefined;
  showPopperArrow?: boolean;
  placeholderText?:string;
  startDate?: Date;
  endDate?: Date;
  maxDate?: Date;
}

const DatePicker = ({
  selectedDate,
  onChange,
  isClearable = false,
  showPopperArrow = false,
  placeholderText="DD/MM/YYYY",
  startDate,
  endDate,
  maxDate
}: Props & HTMLAttributes<HTMLElement>) => {
  return (
    <ReactDatePicker
      selected={selectedDate}
      onChange={onChange}
      isClearable={isClearable}
      showPopperArrow={showPopperArrow}
      placeholderText={placeholderText}
      startDate={startDate}
      endDate={endDate}
      maxDate={maxDate}
    />
  );
};

export default DatePicker;