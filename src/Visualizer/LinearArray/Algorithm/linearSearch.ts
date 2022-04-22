import { ArrayKeyDescriptor, LinearGeneratorCreator } from "../Generator";

export const linearSearch: LinearGeneratorCreator<number> = function* (
  sortedArray: number[],
  target: number
) {
  let display: ArrayKeyDescriptor<number>[] = sortedArray;
  display = display.map((number) => {

    if (number === target) {
      return {
        style: { color: "white" , backgroundColor: "rgb(96, 229, 96)"},
        content: number,
      };
    } else {
      return number;
    }
  });
  yield {
    boundaries: { low_bound: 0 },
    shadows: {
      left_side: { start: 0, span: 0 },
    },

    array: display,
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
};
