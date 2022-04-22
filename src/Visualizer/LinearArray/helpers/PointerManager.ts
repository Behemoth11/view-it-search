export default class PointerManager {
    pointers: { [key: string]: HTMLElement } = {};
    arrayPointer: HTMLElement;

    constructor(private container: HTMLElement) {
      this.arrayPointer = document.getElementById(
        "array-pointer"
      ) as HTMLElement;
    }

    getDomPointer(name: string) {
      name = "pointer_" + name;
      const pointer = this.pointers[name];

      if (!pointer) {
        const pointer_svg = this.arrayPointer.cloneNode(true);

        const pointer = document.createElement("div");
        pointer.appendChild(pointer_svg);

        pointer.classList.add("pointer");
        pointer.id = name;

        this.pointers[name] = pointer;
        this.container.appendChild(pointer);

        return pointer;
      }

      return pointer;
    }

    display(pointers: { [key: string]: number }, arrayAsHTML: HTMLElement[]) {
      for (const pointer_id in pointers) {
        let pointer_location = pointers[pointer_id];
        let pointer = this.getDomPointer(pointer_id);

        let targetNode = arrayAsHTML[pointer_location];
        if (targetNode === undefined) throw new Error(`Index out of bound`);

        let { width, height, x, y } = targetNode.getBoundingClientRect();

        x = x + width / 2 - pointer.clientWidth / 2;

        pointer.style.transform = `translate(${x}px, ${y}px )`;
      }
    }
  }
