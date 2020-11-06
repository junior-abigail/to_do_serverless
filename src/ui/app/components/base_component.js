/* Base class for custom components */

export class BaseComponent extends HTMLElement {

  constructor(htmlString, renderOnInit = true) {
    super();
    this.htmlString = htmlString;
    this.attachShadow({ mode: "open" });
    this.reflectObservedAttributes();
    if (renderOnInit) { this.render(); }
  }

  reflectObservedAttributes() {
    let observedAttributes = this.constructor.observedAttributes || [];
    observedAttributes.map(attribute => {
      Object.defineProperty(this, attribute, {
        get() {
          try { return JSON.parse(this.getAttribute(attribute)) }
          catch { return this.getAttribute(attribute); }
        },
        set(value) {
          if (value) {
            try { this.setAttribute(attribute, JSON.stringify(value)); }
            catch { this.setAttribute(attribute, value); }
          }
          else this.removeAttribute(attribute);
        }
      });
    });
  }

  render() {
    function replacer(templateExpression, expressionKey) {
      let replacement = this;
      expressionKey.split(".").map(token => replacement = replacement[token]);
      let should_replace = typeof replacement === 'string' || typeof replacement === 'number';
      return should_replace ? replacement : templateExpression;
    }
    this.shadowRoot.innerHTML = this.htmlString.replace(/{{([^{}]*)}}/g, replacer.bind(this));
    this.addEventListeners();
  }

  addEventListeners() {
    let eventListeners = this.constructor.eventListeners || [];
    eventListeners.map(e => {
      this.shadowRoot.querySelector(e.selector)
        .addEventListener(e.eventType, e.callback.bind(this));
    });
  }

  emit(type, data) {
    this.dispatchEvent(new CustomEvent(type, { bubbles: true, detail: data }));
  }

}
