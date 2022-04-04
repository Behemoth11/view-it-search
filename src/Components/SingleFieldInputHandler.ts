import HandlerChangeEvent from "./HanlderChangeEvent";

export class SingleFieldInputHandler extends HandlerChangeEvent {
  inputElement: HTMLInputElement;
  _value: string;

  constructor(private inputId: string, initialValue?: string) {
    super();
    this.inputElement = document.getElementById(inputId) as HTMLInputElement;

    this._value = initialValue ?? "";

    this.inputElement.addEventListener("change", this.onInputChange.bind(this));

    this.syncDomInput();
  }

  syncDomInput() {
    this.inputElement.value = this._value;
  }

  onInputChange(e: Event) {
    // @ts-ignore
    this.value = e.target.value;

    this.executeChangeCallback(e);
    this.syncDomInput();
  }

  set value(newValue: string) {
    this._value = newValue;
    this.syncDomInput();
  }

  get value() {
    return this._value;
  }
}
