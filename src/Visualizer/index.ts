
/**
 * Search visualizer synchronizes to a container to create 
 * new search visualization
 */
export interface Visualizer {
  init(): void;
  terminate(): void;
  moveForward(): boolean;
  moveBackward(): boolean;
  setIndex(index: number): void;
}
