

/**
 * Utility function that find the bounding rectangle at a given position. If the position is greater than the max number of 
 * rectangle in the given array, it creates a mock dom rectangle. 
 * 
 * @param idx index or position of the triangle in the array
 * @param arrayAsHTML array of html div representing the lists
 * @returns the bounding rectangle
 */
export default function getBoundingClientRectAtIndex(
  idx: number,
  arrayAsHTML: HTMLDivElement[]
) {
  if (idx >= arrayAsHTML.length) {
    let lastRect = arrayAsHTML[arrayAsHTML.length - 1]?.getBoundingClientRect();

    return {
      x: lastRect.x + lastRect.width,
      width: lastRect.width,
    } as DOMRect;
  }

  return arrayAsHTML[idx].getBoundingClientRect();
}
