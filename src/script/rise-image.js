import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class RiseImage extends PolymerElement {
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

    const element = this;

    this.addEventListener('url-updated', event => {
      console.log('here:' + event.detail.url);
      element.url = event.detail.url;
    });
  }

  static get template() {
    return html`<p>Bye [[url]]</p>`;
  }
}

customElements.define('rise-image', RiseImage);
