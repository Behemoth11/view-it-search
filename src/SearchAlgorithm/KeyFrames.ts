type KeyFrameValues = {
  pointers?: { [key: string]: number };
  boundaries?: { [key: string]: number };
  shadows?: { [key: string]: { start: number; span: number; end: number } };
  skip?: boolean;
};

export default KeyFrameValues;