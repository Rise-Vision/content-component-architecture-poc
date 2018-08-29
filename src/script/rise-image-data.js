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
    this.url = `/content/${ this.file }`;

    setInterval(() => this.toggleImage(this), 5000);
  }

  toggleImage(element) {
    element.url =
      `/content/${ element.url.endsWith( 'logo.svg' ) ? element.file : 'logo.svg' }`;

    console.log( element.url );
  }

  static get template() {
    return html`<p>Hello [[file]] [[url]]</p>`;
  }
}

customElements.define('rise-image-data', RiseImageData);
