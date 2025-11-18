// #region snippet-1
export const manifests: Array<UmbExtensionManifest> = [
  {
    type: 'ufmFilter',
    alias: 'My.UfmFilter.DateFormat',
    name: 'Date Format UFM Filter',
    api: () => import('./date-format.filter'),
    meta: {
      alias: 'dateFormat'
    }
  }
];
// #endregion snippet-1

// #region snippet-2
export const manifests: Array<UmbExtensionManifest> = [
  {
    type: 'ufmFilter',
    alias: 'My.UfmFilter.DateFormat',
    name: 'Date Format UFM Filter',
    api: () => import('./date-format.filter'),
    meta: {
      alias: 'dateFormat'
    }
  },
  {
    type: 'ufmComponent',
    alias: 'My.UfmComponent.Tag',
    name: 'Tag UFM Component',
    api: () => import('./tag.component'),
    meta: {
      alias: 'tag'
    }
  }
];
// #endregion snippet-2

// #region snippet-3
import { Tokens } from '@umbraco-cms/backoffice/external/marked';
import { UmbUfmComponentBase } from '@umbraco-cms/backoffice/ufm';

import './tag.element';

export class TagUfmComponentApi extends UmbUfmComponentBase {
  render(token: Tokens.Generic) {
    if (!token.text) return;

    const attributes = super.getAttributes(token.text);
    return `<ufm-my-tag ${attributes}></ufm-my-tag>`;
  }
}

export { TagUfmComponentApi as api };
// #endregion snippet-3

// #region snippet-4
//...
export class TagUfmComponentApi extends UmbUfmComponentBase {
  constructor() { ... }
  render(token: Tokens.Generic) {
    if (!token.text) return;

    const attributes = this.getAttributes(token.text);
    return `<ufm-my-tag ${attributes}></ufm-my-tag>`;
  }
  protected override getAttributes(text: string): string | null {
    if (!text) return null;

    const pipeIndex = text.indexOf('|');
    const left = text.substring(0, pipeIndex == -1 ? undefined: pipeIndex).trim();
    const filters = pipeIndex === -1 ? null : text.substring(pipeIndex + 1).trim();
    const parts = left.split(':'), alias = parts[0].trim(), display = parts[1]?.trim(), color = parts[2]?.trim(), look = parts[3]?.trim();

    return Object.entries({ alias, filters, display, color, look })
      .map(([key, value]) => (value ? `${key}="${value.trim()}"` : null))
      .join(' ');
  }
}
//...
// #endregion snippet-4

// #region snippet-5
import { customElement, property, state, html, css } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';

@customElement('ufm-my-tag')
export class UmbUfmLabelValueElement extends UmbUfmElementBase  {
  constructor() { ... }
  static styles = css`...`;
}

export { UmbUfmLabelValueElement as element };

declare global {
  interface HTMLElementTagNameMap {
    'ufm-my-tag': UmbUfmLabelValueElement;
  }
}
// #endregion snippet-5

// #region snippet-6
//...
export class UmbUfmLabelValueElement extends UmbUfmElementBase  {
  constructor() {
    this.consumeContext(UMB_UFM_RENDER_CONTEXT, (context) => {
      this.observe(
        context?.value,
        (value) => {
          if (this.alias !== undefined && value !== undefined && typeof value === 'object') {
            this.value = (value as Record<string, unknown>)[this.alias];
          } else {
            this.value = value;
          }
          //TODO: manipulate the value here, or look up other values, etc
        },
        'observeValue',
      );
    });
  }
//...
// #endregion snippet-6
