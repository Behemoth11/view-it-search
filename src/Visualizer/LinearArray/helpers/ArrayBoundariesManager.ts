import getBoundingClientRectAtIndex from "../../../utils/getBoundingClientRectAtIndex";

/**
 * This inner class takes care of rendering the boundaries ( search range limitation )
 * for the arrayVisualizer
 */
 export default class ArrayBoundariesManager {
    boundaries: { [key: string]: HTMLDivElement } = {};
    constructor(private container: HTMLDivElement) {}

    /**
     * Returns the bound with specified name that should be used for boundaries update;
     *
     * @param name name ( id ) of the bound
     */
    getDomBound(name: string) {
      name = "boundary_" + name;
      const bound = this.boundaries[name];

      if (!bound) {
        const bound = document.createElement("div");
        bound.id = name;
        bound.classList.add("bound");
        this.boundaries[name] = bound;

        this.container.appendChild(bound);

        return bound;
      }

      return bound;
    }

    /**
     * Update the dom with the given instructions. Each keys of the boundaries object maps to a
     * unique div in the DOM. This bound is then moved according to the number ( which server as index)
     * passed has it's associated value. The bound place itself at the beginning of the KeyDiv that corresponds to it's index.
     *
     * @param boundaries Object with keys the name ( id ) of the bound.
     * @param arrayAsHTML Array of Divs used to render the array.
     */
    display(
      boundaries: { [key: string]: number },
      arrayAsHTML: HTMLDivElement[]
    ) {
      for (const key in boundaries) {
        const idx = boundaries[key];

        let rect = getBoundingClientRectAtIndex(idx, arrayAsHTML);
        let container = this.container.getBoundingClientRect();
        if (!rect) return;
        const bound = this.getDomBound(key);

        bound.style.transform = `translateX(${rect.x - container.x}px)`;
      }
    }
  }
