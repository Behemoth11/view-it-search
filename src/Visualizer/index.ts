
/**
 * Search visualizer synchronizes to a container to create 
 * new search visualization
 */
export interface Visualizer {
  init(): void;
  terminate(): void;
  moveForward(): void;
  moveBackward(): void;
  setIndex(index: number): void;
}
