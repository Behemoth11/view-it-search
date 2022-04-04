import getBoundingClientRectAtIndex from "../utils/getBoundingClientRectAtIndex";

export default class ShadowManager {
    shadows: { [key: string]: HTMLDivElement } = {};
    constructor(private container: HTMLDivElement) {}

    getDomShadow(name: string) {
      name = "shadow_" + name;
      const shadow = this.shadows[name];

      if (!shadow) {
        const shadow = document.createElement("div");
        shadow.id = name;
        shadow.classList.add("shadow");
        this.shadows[name] = shadow;

        this.container.appendChild(shadow);

        return shadow;
      }

      return shadow;
    }



    display(
      shadows: { [key: string]: { start: number; span: number } },
      arrayAsHTML: HTMLDivElement[]
    ) {
      for (const shadowId in shadows) {
        const { start, span } = shadows[shadowId];

        let rect1 = getBoundingClientRectAtIndex(start , arrayAsHTML);
        let rect2 = getBoundingClientRectAtIndex(start + span, arrayAsHTML);



        if (!rect2 || !rect1) return;

        const shadow = this.getDomShadow(shadowId);

        let container = this.container.getBoundingClientRect();

        shadow.style.transform = `translateX(${rect1.x - container.x}px)`;
        shadow.style.width = rect2.x - rect1.x + "px";
      }
    }
  }
