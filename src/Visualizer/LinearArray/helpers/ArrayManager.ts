
import { ArrayKeyDescriptor } from "../Generator";

export default class ArrayManager {
  private arrayAsHTML: HTMLElement[];

  private array: (number | string ) []
  constructor( private container: HTMLElement){}

  display( array: (number | string ) []) {
    
    if ( this.array === array) { return }
    
    else {
      this.array = array;
    }
    
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
   * Generate a DOM node to represent the given key
   */
  private createNode(node: ArrayKeyDescriptor< number | string > ): HTMLElement {
    let content = node as string | number;
    let style: Partial<CSSStyleDeclaration> = {};

    if (typeof node === "object") {
      content = node.content;
      style = node.style;
    }

    let number_div = document.createElement("div");
    number_div.classList.add("number");
    number_div.innerHTML = `${content}`;

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
