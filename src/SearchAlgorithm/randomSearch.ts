import { getRandomInt } from "./../utils/getRandomInt";
const justGoingForIt: any = function* (sortedArray: any[], target: any) {
  let len = sortedArray.length;

  while (true) {
    let trial = getRandomInt(0, len);
    yield {
      pointers: { trial },
    };

    yield {};
    if (sortedArray[trial] === target) return trial;
  }
};

export default justGoingForIt;
