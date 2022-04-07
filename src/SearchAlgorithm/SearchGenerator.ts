import KeyFrameValues from "./KeyFrames";


/**
 * Generator used for the computation of keyframes
 */
export type SearchGenerator = Generator<KeyFrameValues, number, KeyFrameValues>;

/**
 * Function used to creates search generator
 */
export type SearchGeneratorCreator = (
  array: number[],
  target: number
) => SearchGenerator;
