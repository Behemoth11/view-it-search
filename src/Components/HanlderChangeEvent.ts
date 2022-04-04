export default class HandlerChangeEvent {
    changeCallback: ((e?: Event) => void)[] = [];
    constructor() {}

    set onChange(arg: (e?: Event) => void) {
      this.changeCallback.push(arg);
    }

    executeChangeCallback(e?: Event) {
      this.changeCallback.forEach((cb) => cb(e));
    }
  }