const addressBuilder = (
  unitNumber: string,
  street: string,
  city: string,
  province: string,
  postalCode: string,
  country: string
) => {
  return `${unitNumber} ${street}, ${city}, ${province} ${postalCode}, ${country}`;
};

export default addressBuilder;
