import {
  SearchGenerator,
  SearchGeneratorCreator,
} from "../../SearchAlgorithm/SearchGenerator";
import CachedSearchGenerator from "../../utils/CachedGenerator";
import { IndexType, LinearGenerator, RenderConfig } from "./Generator";
import ArrayManager from "./helpers/ArrayManager";
import { Visualizer } from "../index";
import ShadowManager from "./helpers/ShadowManager";
import PointerManager from "./helpers/PointerManager";
import ArrayBoundariesManager from "./helpers/ArrayBoundariesManager";

export class LinearVisualizer<T extends number | string> implements Visualizer {
  searchAlgorithm: CachedSearchGenerator<LinearGenerator<T>>;

  arrayManager: ArrayManager;
  shadowManager: ShadowManager;
  pointerManager: PointerManager;
  arrayBoundariesManager: ArrayBoundariesManager;

  constructor(private container: HTMLElement, generator: LinearGenerator<T>) {
    this.searchAlgorithm = new CachedSearchGenerator(generator);

    this.arrayManager = new ArrayManager(this.container);
    this.shadowManager = new ShadowManager(this.container);
    this.pointerManager = new PointerManager(this.container);
    this.arrayBoundariesManager = new ArrayBoundariesManager(this.container);
  }

  setGenerator(generator: SearchGenerator<IndexType<T>>) {
    this.searchAlgorithm = new CachedSearchGenerator(generator);

    this.refresh();
  }

  terminate() {
    this.container.remove();
  }

  init() {
    this.moveForward();
  }

  moveForward() {
    const { value } = this.searchAlgorithm.next();
    if (!value || typeof value !== "object") return false;

    this.render(value);

    return true;
  }

  moveBackward() {
    const { value } = this.searchAlgorithm.previous();
    if (!value || typeof value !== "object") return false;

    this.render(value);

    return true;
  }

  refresh() {
    const value = this.searchAlgorithm.current?.value;
    console.log ( " the value", value)
    if (!value || typeof value !== "object") return;

    this.render(value);
  }

  setIndex(index: number) {
    this.searchAlgorithm.setStepTo(index);
    this.refresh();
  }

  private render({ pointers, boundaries, shadows, array }: any) {
    
    if (array) 
      this.arrayManager.display(array);

    if (shadows)
      this.shadowManager.display(shadows, this.arrayManager.getArrayAsHTML());

    if (pointers)
      this.pointerManager.display(pointers, this.arrayManager.getArrayAsHTML());

    if (boundaries)
      this.arrayBoundariesManager.display(boundaries,this.arrayManager.getArrayAsHTML());
  }

  rerender(){
    this.refresh();
  }
}
