import { BaseComponent } from "../base_component.js";
import htmlString from "./navbar.html";

export class Navbar extends BaseComponent {
  constructor() {
    super(htmlString);
  }
}

customElements.define('cc-navbar', Navbar);
