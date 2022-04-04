export const getArray = (arrayInput: string) => {
  return arrayInput
    .split(" ")
    .map((string_int) => parseInt(string_int))
    .filter((numberMayBe) => !isNaN(numberMayBe));
};
