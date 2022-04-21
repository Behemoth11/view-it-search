import { create } from "domain";
import { ArrayKeyDescriptor } from "../Generator";

export default class ArrayManager<T extends string | number> {
  private arrayAsHTML: HTMLElement[];

  constructor( private container: HTMLElement){}

  display( array: ArrayKeyDescriptor<T>[]) {
    
    this.arrayAsHTML = [];
    this.container.innerHTML = ""
    
    array.forEach((key) => {
      let node = this.createNode(key)

      this.arrayAsHTML.push( node );
      this.container.appendChild( node );

    });

    return this.arrayAsHTML;
  }

  getArrayAsHTML() {
    return this.arrayAsHTML;
  }

  setContainer(container: HTMLElement) {
    this.container = container;
  }

  /**
   * Rerenders all array content
   */


  /**
   * Generate a DOM node to represent the given key
   */
  private createNode(node: ArrayKeyDescriptor<T>): HTMLDivElement {
    let content = node;
    let style: Partial<CSSStyleDeclaration> = {};

    if (typeof node === "object") {
      content = node.content;
      style = node.style;
    }

    let number_div = document.createElement("div");
    number_div.classList.add("number");
    number_div.innerHTML = `${node}`;

    let number_container = document.createElement("div");
    number_container.classList.add("number-container");
    number_container.appendChild(number_div);

    // Load configuration style into the new node styles
    Object.assign(number_container.style, style);

    let number_wrapper = document.createElement("div");
    number_wrapper.classList.add("number-wrapper");
    number_wrapper.appendChild(number_container);

    return number_wrapper;
  }
}
