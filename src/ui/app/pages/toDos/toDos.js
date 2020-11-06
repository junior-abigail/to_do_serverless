import { BaseComponent } from "../../components/base_component.js";
import htmlString from "./toDos.html";

export class ToDosPage extends BaseComponent {

  constructor() {
    super(htmlString);
    this.toDoContainer = this.shadowRoot.querySelector("cc-to-do-container");
  }

  async connectedCallback() {
    this.toDoContainer.items = await this.downloadToDos();
  }

  async downloadToDos() {
    // TODO: add actual downloading implementation
    let response = await fetch(`${API_URL}/todos`);
    return await response.json();
  }

}

customElements.define("cc-to-dos-page", ToDosPage);
