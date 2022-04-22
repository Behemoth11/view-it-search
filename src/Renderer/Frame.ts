import { Visualizer } from "../Visualizer/index";

export default class Frame {
  private visualizer!: Visualizer;
  canvas: HTMLElement;
  constructor(private container: HTMLElement, public label: string) {}

  init() {
    const frame_canvas = document.createElement("div");
    frame_canvas.classList.add("canvas");

    const label_element = document.createElement("label");
    label_element.classList.add("label");
    label_element.textContent = this.label;

    this.container.appendChild(label_element);
    this.container.appendChild(frame_canvas);

    this.canvas = frame_canvas;

    return this;
  }

  setVisualizer(creator: (container: HTMLElement) => Visualizer) {
    this.visualizer = creator(this.canvas);
    this.visualizer.init();
    return this;
  }

  getVisualizer() {
    return this.visualizer;
  }

  /**
   * Destroys a frame by executing all required cleaning
   */
  destroy() {
    this.container.remove();
  }
}
