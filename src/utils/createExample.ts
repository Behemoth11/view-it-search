import { getRandomInt } from "./getRandomInt";

const createExample = (length: number) => {
    let example = [];
    example.push(getRandomInt(0, 4));

    for (let i = 0; i < length; i++) {
      example.push(example[example.length - 1] + getRandomInt(3, 8));
    }

    return example;
  };