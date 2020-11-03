/* Base class for custom components */

export class BaseComponent extends HTMLElement {

  constructor(htmlString, templateValues) {
    super();
    this.attachShadow({ mode: "open" });
    if (templateValues) { htmlString = interpolate(htmlString, templateValues) }
    this.shadowRoot.innerHTML = htmlString;
    this.reflectObservedAttributes();
    this.addEventListeners();
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

/**
 * Function replaces tokens in the htmlString surrounded by double curly braces
 * with their corresponding values from the templateValues object. It uses the
 * String.replace method with an regexp for matching the double curly braces
 * pattern, and a callback function for performing the replacement.
 * @param {string} htmlString
 * @param {object} templateValues
 */
function interpolate(htmlString, templateValues) {
  return htmlString.replace(/{{([^{}]*)}}/g, (match, key) => {
    let replacement = templateValues; // start with the templateValues object
    key.split(".").map(token => replacement = replacement[token]); // find nested keys values
    let should_replace = typeof replacement === 'string' || typeof replacement === 'number';
    return should_replace ? replacement : match;
  });
};
