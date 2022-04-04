
export const funkySearch: any = function* (sortedArray: number[], target: number) {
    let low_bound = 0;
    let high_bound = sortedArray.length - 1;

    let change = 1;


    yield {
      boundaries: { low_bound, high_bound: high_bound + 1 },
      shadows: {
        left_side: { start: 0, span: 0 },
        right_side: {
          start: high_bound + 1,
          span: 0,
        },
      },
    };


    while (low_bound <= high_bound) {
      if (change === 1) {
        yield {
          pointers: {
            middle_left: low_bound,
          },
        };

        if (sortedArray[low_bound] === target) return low_bound;

        yield {
          boundaries: { low_bound: low_bound + 1 },
          shadows: {
            left_side: { start: 0, span: low_bound + 1 },
          },
        };
        low_bound += 1;
        change = -1;
      } else {
        yield {
          pointers: {
            middle_right: high_bound,
          },
        };

        if (sortedArray[high_bound] === target) return high_bound;
        yield {
          boundaries: { high_bound: high_bound },
          shadows: {
            right_side: {
              start: high_bound,
              span: sortedArray.length - high_bound,
            },
          },
        };
        high_bound -= 1;
        change = 1;
      }
    }

    return -1;
  };