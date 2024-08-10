import { LitElement, html } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './jokes-dm.css.js';
import '@bbva-web-components/bbva-core-generic-dp/bbva-core-generic-dp.js';

/**
 * ![LitElement component](https://img.shields.io/badge/litElement-component-blue.svg)
 *
 * This component ...
 *
 * Example:
 *
 * ```html
 *   <jokes-dm></jokes-dm>
 * ```
 */
export class JokesDm extends LitElement {
  static get properties() {
    return {
      /**
       * Description for property
       */
      //api main endpoint chain
      host: {
        type: String,
      },
      //path endpoint string property
      path: {
        type: String,
      },
      //number of jokes to get
      amount: {type: Number},
    };
  }

  constructor() {
    super();
    this.host = '';
    this.path = '';
    this.amount = 5;
  }

  static get styles() {
    return [styles, getComponentSharedStyles('jokes-dm-shared-styles')];
  }

  _normalizeResponse(response) {
    return response.jokes.map((joke) => {
      return {
        id: joke.id,
        category: joke.category,
        type: joke.type,
        setup: (joke.type === "single")? joke.joke : joke.setup + ' ' + joke.delivery,
      };
    });
  }

  firstUpdated() {
    // 1. Obtener el DP (Data Provider)
    const jokesDP = this.shadowRoot.querySelector('#jokes-dp');
    // 2. Lanzar un evento, para avisar que el request ha iniciado

    /**
     * Fired when request starts:
     *
     * @event jokes-dm-request-start
     * @type {object}
     * @property {boolean} jokes
     */

    this.dispatchEvent(
      new CustomEvent('jokes-dm-request-start', {
        bubbles: true,
        composed: true,
        detail: true,
      }),
    );
    // 3. Ejecutar el DM

    jokesDP
      .generateRequest()
      .then(({ response }) => {
        // 4-B. Invocar la función de normalización
        const normalizedResponse = this._normalizeResponse(response);
        // 5-A. Reaccionar a la respuesta exitosa

        /**
         * Fired when request succeeds
         *
         * @event jokes-dm-request-success
         * @type {object}
         * @property {Array<{category:String, id:Number, Setup: String, type: String}>} jokes
         */

        this.dispatchEvent(
          new CustomEvent('jokes-dm-request-success', {
            bubbles: true,
            composed: true,
            detail: normalizedResponse,
          }),
        );
      })
      .catch((err) => {
        // 5-B. Reaccionar a la respuesta fallida

        /**
         * Fired when request fails
         *
         * @event jokes-dm-request-error
         * @type {Error}
         */

        this.dispatchEvent(
          new CustomEvent('jokes-dm-request-error', {
            bubbles: true,
            composed: true,
            detail: err,
          }),
        );
      });
  }

  render() {
    return html`
      <bbva-core-generic-dp
        id="jokes-dp"
        host="https://v2.jokeapi.dev"
        path="/joke/Programming,Miscellaneous?amount=${this.amount}"
        method="GET"
      >
      </bbva-core-generic-dp>
    `;
  }
}
