import { ObjectMap } from "../utils/generict.type";
import { Visualizer } from "../Visualizer/index";
import Frame from "./Frame";

type Visualization = {
  visualizer: Visualizer;
  container: HTMLElement;
};

export default class Renderer {
  frames: ObjectMap<string, Frame> = {};
  executionTracker: number = 0;

  constructor(private container: HTMLDivElement) {}

  addFrame(frame: Frame): void {
    this.frames[frame.label] = frame;
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
    this.forEachFrame((forEachFrame) => forEachFrame.visualizer.moveBackward());
  }

  private forEachFrame(cb: (frame: Frame) => void) {
    Object.values(this.frames).forEach(cb);
  }

  moveForward() {
    let hasMoved = false;
    // You may want to changed the as moved method here;

    this.forEachFrame((forEachFrame) => forEachFrame.visualizer.moveForward());

    return hasMoved;
  }

  syncVisualizersAtIndex(index: number) {
    this.forEachFrame((frame) => frame.visualizer.setIndex(index));
  }
}
