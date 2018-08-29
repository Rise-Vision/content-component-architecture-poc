import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class RiseImageData extends PolymerElement {
  static get properties () {
    return {
      file: {
        type: String,
        value: ''
      },
      url: {
        type: String,
        value: ''
      }
    };
  }

  constructor() {
    super();

    this.file = this.hasAttribute('file') ? this.getAttribute('file') : 'logo.svg';
    this.url = `/content/${ this.file }`;
  }

  static get template() {
    return html`<p>Hello [[file]] [[url]]</p>`;
  }
}

customElements.define('rise-image-data', RiseImageData);
