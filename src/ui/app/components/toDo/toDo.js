import { BaseComponent } from "../base_component.js";
import htmlTemplate from "./toDo.html";

export class ToDo extends BaseComponent {

  constructor(id, status, title, details) {
    super(htmlTemplate, false);
    this.id = id;
    this.status = status;
    this.title = title;
    this.details = details;
    this.render();
  }

  static get eventListeners() {
    return [
      {
        selector: ".to-do .close-button",
        eventType: "click",
        callback: function (event) { this.emit('delete-to-do', event.target); }
      }
    ]
  }

}

customElements.define("to-do", ToDo);
