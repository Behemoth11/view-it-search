import { getRandomInt } from "../utils/getRandomInt";

const AtLeastIamTrying: any = function* (
    sortedArray: any[],
    target: any
  ) {
    let len = sortedArray.length;
    let triedIndex: { [key: number]: true } = {};
    let trials = 0;
    while (true) {
      let trial = getRandomInt(0, len);
      if (triedIndex[trial]) continue;
      yield {
        pointers: {
          middle: trial,
        },
      };

      triedIndex[trial] = true;
      trials++;

      if (sortedArray[trial] === target) return trial;
      yield {
        shadows: {
          [trial]: { start: trial, span: 1 },
        },
      };

      if (trials >= len) return -1;
    }
  };
