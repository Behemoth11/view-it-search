import { Visualizer } from "../Visualizer/index";

export default class Frame {
  visualizer!: Visualizer;
  constructor(public container: HTMLElement, public label: string) {}

  init() {
    const frame_container = document.createElement("div");
    frame_container.classList.add("container");

    const label_element = document.createElement("label");
    label_element.classList.add("label");
    label_element.textContent = this.label;

    this.container.appendChild(label_element);
    this.container.appendChild(frame_container);

    return frame_container;
  }
}
