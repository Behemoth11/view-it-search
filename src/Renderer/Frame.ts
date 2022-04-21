

export default class Frame {

  constructor(private container: HTMLElement, label: string) {}

  init(label: string) {
    const frame_container = document.createElement("div");
    frame_container.classList.add("container");

    const label_element = document.createElement("label");
    label_element.classList.add("label");
    label_element.textContent = label;

    this.container.appendChild(label_element);
    this.container.appendChild(frame_container);

    return frame_container;
  }
}
