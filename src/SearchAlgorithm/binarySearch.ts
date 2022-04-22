
export const binarySearch = function* (sortedArray: number[], target: number) {
    let low_bound = 0;

    
    let right_bound = sortedArray.length - 1;

    yield {
      boundaries: { low_bound, right_bound: right_bound + 1 },
      shadows: {
        left_side: { start: 0, span: 0 },
        right_side: {
          start: right_bound + 1,
          span: 0,
        },
      },
      array : [ 1, 2, 3]
    };

    while (low_bound <= right_bound) {
      let middle = Math.floor((low_bound + right_bound) / 2);

      yield {
        pointers: { middle },
      };

      if (sortedArray[middle] === target) {
        // found the key
        return middle;
      } else if (sortedArray[middle] < target) {
        // continue searching to the right
        low_bound = middle + 1;
      } else {
        // search searching to the left
        right_bound = middle - 1;
      }

      yield {
        boundaries: { low_bound, right_bound: right_bound + 1 },
        shadows: {
          left_side: { start: 0, span: low_bound },
          right_side: {
            start: right_bound + 1,
            span: sortedArray.length - 1 - right_bound,
          },
        },
      };
    }
    // key wasn't found
    return -1;
  };