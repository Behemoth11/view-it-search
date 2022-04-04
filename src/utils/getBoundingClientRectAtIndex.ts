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
