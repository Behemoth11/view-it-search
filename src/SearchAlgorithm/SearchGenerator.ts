import KeyFrameValues from "./KeyFrames";


/**
 * Generator used for the computation of keyframes
 */
export type SearchGenerator< T extends  number | string >  = Generator<KeyFrameValues, T, KeyFrameValues>;

/**
 * Function used to creates search generator
 */
export type SearchGeneratorCreator<T extends number | string > = (
  array: number[],
  target: number
) => SearchGenerator<T>;
