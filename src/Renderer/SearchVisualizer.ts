import { SearchGenerator, SearchGeneratorCreator } from "../SearchAlgorithm/SearchGenerator";
import CachedSearchGenerator from "../utils/CachedGenerator";
import ArrayBoundariesManager from "./ArrayBoundariesManager";
import PointerManager from "./PointerManager";
import ShadowManager from "./ShadowManager";

export class SearchVisualizer {
  arrayAsHTML: HTMLDivElement[];
  searchAlgorithm: CachedSearchGenerator<SearchGenerator>;

  container: HTMLDivElement;
  shadowManager: ShadowManager;
  pointerManager: PointerManager;
  arrayBoundariesManager: ArrayBoundariesManager;

  constructor(
    private array: number[],
    private target: number,
    private containerId: string,
    private searchAlgorithmGenerator: SearchGeneratorCreator
  ) {
    this.arrayAsHTML = array.map((idx) => this.createNodeForIndex(idx));

    this.searchAlgorithm = new CachedSearchGenerator(
      searchAlgorithmGenerator(array, target)
    );

    this.container = document.getElementById(containerId) as HTMLDivElement;

    this.shadowManager = new ShadowManager(this.container);
    this.pointerManager = new PointerManager(this.container);
    this.arrayBoundariesManager = new ArrayBoundariesManager(this.container);

    //
  }

  setArray(array: number[]) {
    this.array = array;

    this.syncDomArray();

    this.refresh();
  }

  setTarget(target: number) {
    this.target = target;

    this.syncDomArray();
    this.refresh();
  }

  setSearchAlgorithm(searchAlgorithmGenerator: SearchGeneratorCreator) {
    this.searchAlgorithm = new CachedSearchGenerator(
      searchAlgorithmGenerator(this.array, this.target)
    );

    this.refresh();
  }

  terminate() {
    this.container.remove();
  }

  init() {
    this.syncDomArray();
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
    if (!value || typeof value !== "object") return;

    this.render(value);
  }

  setIndex(index: number) {
    this.searchAlgorithm.setStepTo(index);
    this.refresh();
  }

  syncDomArray() {
    this.arrayAsHTML.forEach((node) => node.remove());

    this.arrayAsHTML = this.array.map((idx) => this.createNodeForIndex(idx));

    this.arrayAsHTML.forEach((node) => this.container.appendChild(node));
  }

  private render({ pointers, boundaries, shadows }: any) {
    if (shadows) this.shadowManager.display(shadows, this.arrayAsHTML);
    if (pointers) this.pointerManager.display(pointers, this.arrayAsHTML);
    if (boundaries)
      this.arrayBoundariesManager.display(boundaries, this.arrayAsHTML);
  }

  private createNodeForIndex(idx: number): HTMLDivElement {
    let number_div = document.createElement("div");
    number_div.classList.add("number");
    number_div.innerHTML = `${idx}`;

    let number_container = document.createElement("div");
    number_container.classList.add("number-container");
    number_container.appendChild(number_div);

    if (idx === this.target) {
      number_container.style.backgroundColor = "#60e560";
      number_container.style.color = "#fff";
    }

    let number_wrapper = document.createElement("div");
    number_wrapper.classList.add("number-wrapper");
    number_wrapper.appendChild(number_container);

    return number_wrapper;
  }
}

