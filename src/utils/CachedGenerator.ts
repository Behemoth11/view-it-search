/**
 * Wrapper around generator that caches it's return values and allows
 * to navigate navigator values;
 */
export default class CachedGenerator<
  TGenerator extends Generator<any, any, any>,
  T = TGenerator extends Generator<infer T, any, any> ? T : any,
  D = TGenerator extends Generator<any, infer T, any> ? T : any,
  P = TGenerator extends Generator<any, any, infer T> ? T : any
> {
  generatorIndex: number = 0;
  generatorCache: IteratorResult<T, D>[] = [];
  constructor(private generator: Generator<T, D, P>) {}

  next() {
    this.generatorIndex++;

    if (!this.generatorCache[this.generatorIndex]) {
      const nextYield = this.generator.next();
      this.cache(nextYield);
    }

    return this.getIndex(this.generatorIndex);
  }

  previous() {
    return this.getIndex(--this.generatorIndex);
  }

  setStepTo(idx: number) {
    this.generatorIndex = idx;
  }

  getIndex(index: number) {

    if (this.generatorCache[index] === undefined) {
      if (index < this.generatorIndex) this.generatorIndex = 0;

      while (index > this.generatorIndex) {
        this.next();
      }
    }
    
    return this.generatorCache[index];
  }

  get current() {
    return this.getIndex(this.generatorIndex);
  }

  cache(value: IteratorResult<T, D>) {

    this.generatorCache[this.generatorIndex] = { done: true , value: undefined };


    this.current.value = Object.assign(
      {},
      this.generatorCache[this.generatorIndex - 1]?.value,
      value?.value
    );

    this.current.done = value.done;

    // could be written in one line as
    // this.generatorCache[this.generatorIndex++] = value;
    // But may be a little less readable.
  }
}
