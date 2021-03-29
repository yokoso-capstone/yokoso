import React from "react";
import Select from "react-select";

const options = [
  { value: "Alberta", label: "AB" },
  { value: "British Columbia", label: "BC" },
  { value: "Manitoba", label: "MB" },
  { value: "New Brunswick", label: "NB" },
  { value: "Newfoundland and Labrador", label: "NL" },
  { value: "Northwest Territories", label: "NT" },
  { value: "Nova Scotia", label: "NS" },
  { value: "Nunavut", label: "NU" },
  { value: "Ontario", label: "ON" },
  { value: "Prince Edward Island", label: "PE" },
  { value: "Quebec", label: "QC" },
  { value: "Saskatchewan", label: "SK" },
  { value: "vanilla", label: "YT" },
];

const ProvinceSelector = () => <Select options={options} />;

export default ProvinceSelector;
