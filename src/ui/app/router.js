import { ToDosPage } from "./pages/toDos/toDos.js";

const routes = {
  "/": ToDosPage
}

export class Router {
  constructor(rootElement) {
    rootElement.appendChild(new routes["/"]());
  }
}
