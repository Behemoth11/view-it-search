import HandlerChangeEvent from "./HanlderChangeEvent";

export class CheckboxInputHandler extends HandlerChangeEvent {
  checkboxInputs: HTMLInputElement[];

  choices: { [key: string]: boolean } = {};

  constructor(name: string, defaultValue: { [key: string]: boolean } = {}) {
    super();

    let checkboxes = document.querySelectorAll(
      `input[type="checkbox"][name=${name}]`
    );
    this.checkboxInputs = Array.from(checkboxes) as HTMLInputElement[];

    this.checkboxInputs.forEach((checkbox) => {
      checkbox.addEventListener("change", this.onInputChange.bind(this));
    });

    this.choices = defaultValue;

    this.syncDomInput();

    const evt = document.createEvent("HTMLEvents");
    evt.initEvent("change", false, true);
    this.checkboxInputs[0].dispatchEvent(evt);
  }

  onInputChange(e: Event) {
    const target = e.target as HTMLInputElement;
    let name = target.getAttribute("value") as string;

    this.choices[name] = target.checked;
  }

  addEventListener(name: any, handler: any) {
    this.checkboxInputs.forEach((checkbox) =>
      checkbox.addEventListener(name, handler)
    );
  }

  syncDomInput() {
    this.checkboxInputs.forEach((input: HTMLInputElement) => {
      input.checked = this.choices[input.getAttribute("value") as string];
    });
  }
}

