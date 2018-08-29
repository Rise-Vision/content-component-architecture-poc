import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class ImageData extends PolymerElement {
  static get properties () {
    return {
      url: {
        type: String,
        value: ''
      }
    };
  }

  constructor() {
    super();

    this.url = 'content.png'
  }

  static get template() {
    return html`<p>Hello World</p>`;
  }
}

customElements.define('image-data', ImageData);
