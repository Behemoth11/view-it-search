

/**
 * 
 * Get a random integer whose value lies in the min max range
 * 
 * @param min 
 * @param max 
 * @returns 
 */

export const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
