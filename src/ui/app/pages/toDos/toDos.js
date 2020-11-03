import { BaseComponent } from "../../components/base_component.js";
import htmlString from "./toDos.html";

export class ToDosPage extends BaseComponent {

  constructor() {
    super(htmlString);
    this.toDoContainer = this.shadowRoot.querySelector("cc-to-do-container");
  }

  // static get eventListeners() {
  //   return [
  //     {
  //       selector: "cc-to-do-container",
  //       eventType: "click",
  //       callback: function (event) { console.log(event.target) }
  //     }
  //   ]
  // }

  connectedCallback() {
    this.toDoContainer.items = this.downloadToDos();
  }

  downloadToDos() {
    // TODO: add actual downloading implementation
    return [
      {
        id: "1",
        status: "active",
        title: "to-do #1",
        details: "Clean the house"
      },
      {
        id: "2",
        status: "active",
        title: "to-do #2",
        details: "Wash the car"
      },
      {
        id: "3",
        status: "active",
        title: "to-do #3",
        details: "Buy some groceries"
      }
    ]
  }

}

customElements.define("cc-to-dos-page", ToDosPage);
