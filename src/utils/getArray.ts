
/**
 * Creates an array of integers from a space separated list of integers as string
 * @param arrayInput input 
 * @returns 
 */
export const getArray = (arrayAsString: string) => {
  return arrayAsString
    .split(" ")
    .map((string_int) => parseInt(string_int))
    .filter((numberMayBe) => !isNaN(numberMayBe));
};
