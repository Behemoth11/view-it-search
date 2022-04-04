import KeyFrameValues from "./KeyFrames";

export type SearchGenerator = Generator<KeyFrameValues, number, KeyFrameValues>;

export type SearchGeneratorCreator = (
  array: number[],
  target: number
) => SearchGenerator;
