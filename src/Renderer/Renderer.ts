import { implementedAlgorithm } from "../main";
import { binarySearch } from "../SearchAlgorithm/binarySearch";
import { SearchVisualizer } from "./SearchVisualizer";

const nameMap = {
  funkySearch: "Double linear",
  linearSearch: "Linear search",
  binarySearch: "Binary search",
  justGoingForIt: "Random indexing",
  AtLeastIamTrying: "Random indexing + caching",
};



export default class Renderer {
  activeVisualizers: { [key: string]: SearchVisualizer } = {};
  labels: { [keys: string]: HTMLElement } = {};

  executionTracker: number = 0;

  constructor(private container: HTMLDivElement) {}

  getSearchVisualizer(name: keyof typeof nameMap): SearchVisualizer {
    let visualizer = this.activeVisualizers[name];

    if (!visualizer) {
      const container = document.createElement("div");
      container.id = "container_" + name;
      container.classList.add("container");

      const label = document.createElement("label");
      label.classList.add("algorithm-label");
      label.textContent = nameMap[name];

      this.container.appendChild(label);
      this.container.appendChild(container);

      let searchVisualizer = new SearchVisualizer(
        [5, 12, 45, 56],
        12,
        "container_" + name,
        binarySearch
      );

      searchVisualizer.init();

      this.labels[name] = label;
      this.activeVisualizers[name] = searchVisualizer;
    }

    return this.activeVisualizers[name];
  }

  render(array: number[], target: number, algorithms: (keyof typeof nameMap)[], ) {
    const preserved: { [key: string]: boolean } = {};

    algorithms.forEach((name) => {
      preserved[name] = true;
      const visualizer = this.getSearchVisualizer(name);

      visualizer.setArray(array);
      visualizer.setTarget(target);
      visualizer.setSearchAlgorithm(implementedAlgorithm[name]);
    });

    this.clean(preserved);
  }

  clean(preserve: { [key: string]: boolean }) {
    Object.keys(this.activeVisualizers).forEach((algorithm) => {
      if (!preserve[algorithm]) {
        this.activeVisualizers[algorithm].terminate();
        delete this.activeVisualizers[algorithm];

        this.labels[algorithm].remove();
      }
    });
  }

  moveBackward() {
    Object.keys(this.activeVisualizers).forEach((algorithm) => {
      this.activeVisualizers[algorithm].moveBackward();
    });
  }

  moveForward() {
    let hasMoved = false;
    Object.keys(this.activeVisualizers).forEach((algorithm) => {
      if (this.activeVisualizers[algorithm].moveForward()) hasMoved = true;
    });

    return hasMoved;
  }

  syncVisualizersAtIndex(index: number) {
    Object.keys(this.activeVisualizers).forEach((algorithm) => {
      this.activeVisualizers[algorithm].setIndex(index);
    });
  }
}
