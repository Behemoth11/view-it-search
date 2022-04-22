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

  constructor(private container: HTMLElement) {}

  addVisualization(label: string, frame: any) {
    throw new Error("Method not implemented.");
  }

  addFrame(frame: Frame): void {
    this.frames[frame.label] = frame;
  }

  /**
   * Create and returns a safe subspace for visualization rendering
   */
  createFrame(label: string) {
    if (this.getFrame(label))
      throw new Error("Trying to create an already existing frame");

    const frame_container = document.createElement("div");
    frame_container.classList.add("frame");

    this.container.appendChild(frame_container);

    const frame = new Frame(frame_container, label);
    this.frames[label] = frame;

    return frame;
  }

  getFrame(label: string) {
    return this.frames[label] || null;
  }

  removeFrame(label: string) {
    let frame = this.frames[label];
    frame.destroy();
  }

  moveBackward() {
    let hasMoved = false;
    // You may want to changed the as moved method here;

    this.forEachFrame((forEachFrame) => {
      if (forEachFrame.getVisualizer().moveBackward()) {
        hasMoved = true;
      }
    });

    return hasMoved;
  }

  moveForward() {
    let hasMoved = false;
    // You may want to changed the as moved method here;

    this.forEachFrame((forEachFrame) => {
      if (forEachFrame.getVisualizer().moveForward()) {
        hasMoved = true;
      }
    });

    return hasMoved;
  }

  rerender(): void {
    this.forEachFrame((forEachFrame) => {
      forEachFrame.getVisualizer().rerender();
    });
  }

  moveToIndex(index: number) {
    this.forEachFrame((frame) => frame.getVisualizer().setIndex(index));
  }

  private forEachFrame(cb: (frame: Frame) => void) {
    Object.values(this.frames).forEach(cb);
  }
}
