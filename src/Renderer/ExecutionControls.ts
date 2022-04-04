import Renderer from "./Renderer";

export class ExecutionControl {
    isExecuting: boolean = false;
    containers: HTMLDivElement[] = [];
    executionInterval?: NodeJS.Timer;

    constructor(private renderer: Renderer) {}

    bindTo(container: HTMLDivElement) {
      container.addEventListener("click", this.toggle.bind(this));
      container.innerHTML = `
      <svg   viewBox="0 0 16 16" fill="#41cd41" class="bi bi-triangle-fill" style="transform: rotate(30deg) translateY(-2px)">
            <path  fill="#41cd41" fill-rule="evenodd" d="M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767L7.022 1.566z"/>
        </svg>
        `;
      this.containers.push(container);
      return this;
    }

    toggle() {
      this.isExecuting ? this.stopExecution() : this.execute();
    }

    execute() {
      this.stopExecution();

      this.executionInterval = setInterval(() => {
        if (!this.renderer.moveForward()) this.stopExecution();
      }, 750);

      this.containers.forEach((container) => {
        container.innerHTML = `
        <svg x="0px" y="0px"   viewBox="0 0 332.145 332.146" style="enable-background:new 0 0 332.145 332.146;" xml:space="preserve" >
      <path fill="#41cd41" d="M121.114,0H25.558c-8.017,0-14.517,6.5-14.517,14.515v303.114c0,8.017,6.5,14.517,14.517,14.517h95.556    c8.017,0,14.517-6.5,14.517-14.517V14.515C135.631,6.499,129.131,0,121.114,0z M106.6,303.113H40.072V29.031H106.6V303.113z"/>
      <path fill="#41cd41" d="M306.586,0h-95.541c-8.018,0-14.518,6.5-14.518,14.515v303.114c0,8.017,6.5,14.517,14.518,14.517h95.541    c8.016,0,14.518-6.5,14.518-14.517V14.515C321.102,6.499,314.602,0,306.586,0z M292.073,303.113h-66.514V29.031h66.514V303.113z"/>
          </svg>`;
      });

      this.isExecuting = true;
    }


    stopExecution() {
      if (this.executionInterval) clearInterval(this.executionInterval);

      this.containers.forEach((container) => {
        container.innerHTML = `
        <svg   viewBox="0 0 16 16" fill="currentColor" class="bi bi-triangle-fill" style="transform: rotate(30deg) translateY(-2px)">
            <path fill="#41cd41" fill-rule="evenodd" d="M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767L7.022 1.566z"/>
        </svg>`;
      });

      this.isExecuting = false;
    }
  }