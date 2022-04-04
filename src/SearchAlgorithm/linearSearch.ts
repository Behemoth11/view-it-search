import { SearchGenerator, SearchGeneratorCreator } from "./SearchGenerator";
export const linearSearch = function* (sortedArray: number[], target: number) {
  yield {
    boundaries: { low_bound: 0 },
    shadows: {
      left_side: { start: 0, span: 0 },
    },
  };

  for (let i = 0; i < sortedArray.length; i++) {
    yield {
      pointers: {
        middle: i,
      },
    };

    if (sortedArray[i] === target) return i;
    yield {
      boundaries: { low_bound: i + 1 },
      shadows: {
        left_side: { start: 0, span: i + 1 },
      },
    };
  }

  return -1;
} as SearchGeneratorCreator;
