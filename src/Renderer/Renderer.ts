import { ObjectMap } from "../utils/generict.type";
import { Visualizer } from "../Visualizer/index";
import Frame from "./Frame";

type Visualization = {
  visualizer: Visualizer;
  container: HTMLElement;
};

export default class Renderer {
  visualizations: ObjectMap<string, Visualization> = {};
  executionTracker: number = 0;

  constructor(private container: HTMLDivElement) {}

  getVisualizer(name: string): Visualizer {
    let visualizer = this.visualizers[name];

    return visualizer || null;
  }

  addVisualization(label: HTMLElement, visualizer: Visualizer) {
    this.visualizations[label] = {};
  }

  /**
   * Create and returns a safe subspace for visualization rendering
   */
  getFrame(label: string) {
    const frame = document.createElement("div");
    frame.classList.add("frame");

    return new Frame(frame, label);
  }

  // clean(preserve: { [key: string]: boolean }) {
  //   Object.keys(this.visualizers).forEach((algorithm) => {
  //     if (!preserve[algorithm]) {
  //       this.visualizers[algorithm].terminate();
  //       delete this.visualizers[algorithm];

  //       this.labels[algorithm].remove();
  //     }
  //   });
  // }

  moveBackward() {
    this.forEachVisualization((visualization) =>
      visualization.visualizer.moveBackward()
    );
  }

  private forEachVisualization(cb: (visualizers: Visualization) => void) {
    Object.values(this.visualizations).forEach(cb);
  }

  moveForward() {
    let hasMoved = false;
    // You may want to changed the as moved method here;

    this.forEachVisualization((visualization) =>
      visualization.visualizer.moveForward()
    );

    return hasMoved;
  }

  syncVisualizersAtIndex(index: number) {
    this.forEachVisualization((visualization) =>
      visualization.visualizer.setIndex(index)
    );
  }
}
