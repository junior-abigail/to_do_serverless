import { BaseComponent } from "../base_component.js";
import htmlString from "./toDoContainer.html";
import { ToDo } from "../toDo/toDo.js";

export class ToDoContainer extends BaseComponent {

  constructor() {
    super(htmlString);
    this.el = this.shadowRoot.querySelector("#to-do-container");
    this.toDos = [];
  }

  static get observedAttributes() {
    return ["items", "filter"]
  }

  static get eventListeners() {
    return [
      {
        selector: "#search",
        eventType: "input",
        callback: function (event) { this.setAttribute("filter", event.target.value.toLowerCase()) }
      }
    ]
  }

  attributeChangedCallback(name, oldVal, newVal) {
    switch (name) {
      case "filter": this.filterVisibleItems(); break;
      case "items": this.updateItems(); break;
    }
  }

  updateItems() {
    this.el.innerHTML = ""; // clear contents of the container
    for (let item of this.items) {
      let { id, status, title, details } = item;
      let toDo = new ToDo(id, status, title, details);
      toDo.addEventListener("delete-to-do", (event) => this.deleteItem(event.target));
      this.toDos.push(toDo);
      this.el.appendChild(toDo);
    }
  }

  filterVisibleItems() {
    for (let toDo of this.toDos) {
      let match_title = toDo.title.toLowerCase().includes(this.filter);
      let match_description = toDo.details.toLowerCase().includes(this.filter);
      if (match_title || match_description) { toDo.classList.remove("hidden"); }
      else { toDo.classList.add("hidden"); }
    }
  }

  deleteItem(item) {
    item.setAttribute("id", +item.id + 1);
    console.log("deleteItem", item, item.id);
  }

}

customElements.define("cc-to-do-container", ToDoContainer);
