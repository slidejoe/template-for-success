import { customElement, property, state, html, css } from '@umbraco-cms/backoffice/external/lit';
import { UMB_UFM_RENDER_CONTEXT } from '@umbraco-cms/backoffice/ufm';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';

@customElement('ufm-my-tag')
// Doesn't have to extend UmbUfmElementBase, that class forces render to return a string rather than an HTML template,
// but does include some filter logic (which this element just ignores anyway)
export class UmbUfmLabelValueElement extends UmbLitElement  {
  @property()
  alias?: string;

  @property()
  display?: string;

  @property()
  color?: string;

  @property()
  look?: string;

  @state()
  show: Boolean;

  constructor() {
    super();

    this.show = false;

    this.consumeContext(UMB_UFM_RENDER_CONTEXT, (context) => {
      this.observe(
        context?.value,
        (value) => {
          if (this.alias !== undefined && value !== undefined && typeof value === 'object') {
            var obj = value as Record<string, unknown>;
            var settings = (obj["$settings"] as Record<string, unknown>) ?? {};
            this.show = !!(obj[this.alias] || settings[this.alias]);
          } else {
            this.show = !!value;
          }
        },
        'observeValue',
      );
    });
  }

  override render() {
    if (this.show) {
      return html`<uui-tag color="${this.color}" look="${this.look}">${this.display}</uui-tag>`;
    }
    return null;
  }

  static styles = css`
    uui-tag {
      margin: 0 1ex;
    }
  `;
}

export { UmbUfmLabelValueElement as element };

declare global {
  interface HTMLElementTagNameMap {
    'ufm-my-tag': UmbUfmLabelValueElement;
  }
}
