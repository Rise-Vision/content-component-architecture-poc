import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-if.js';

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
    const targetId = this.getAttribute('for');
    const target = targetId ? document.querySelector(`#${targetId}`) : this;

    target.addEventListener('url-updated', event => {
      console.log(event.detail.url);
      element.url = event.detail.url;
    });
  }

  static get template() {
    return html`
      <style>
        img {
          height: var(--image-height, 50px);
          width: var(--image-width, 50px);
          @apply --rise-image;
        }
      </style>
      <template is="dom-if" if="[[url]]">
        <img src=[[url]]>
      </template>
      <template is="dom-if" if="[[!url]]">
        <p>Downloading image, please wait...</p>
      </template>
    `;
  }
}

customElements.define('rise-image', RiseImage);
