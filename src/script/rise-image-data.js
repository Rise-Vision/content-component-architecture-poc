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

    this.file = this.getAttribute('file');

    setInterval(() => this.toggleImage(this), 5000);
  }

  toggleImage(element) {
    element.url =
      `/content/${ element.url.endsWith( 'logo.svg' ) ? element.file : 'logo.svg' }`;

    const event = new CustomEvent('url-updated', {
      bubbles: true, composed: true, detail: { url: element.url }
    });

    this.dispatchEvent(event);
  }
}

customElements.define('rise-image-data', RiseImageData);
