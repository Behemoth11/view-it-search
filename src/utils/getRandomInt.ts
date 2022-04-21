

/**
 * 
 * Get a random integer whose value lies in the min max range
 * 
 */

export const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
