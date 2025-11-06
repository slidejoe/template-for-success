import { Tokens } from '@umbraco-cms/backoffice/external/marked';
import { UmbUfmComponentBase } from '@umbraco-cms/backoffice/ufm';

import './tag.element';

/// Example usage: `{tag: hide:Hidden:warning:secondary}` where
/// `hide` is the name of a boolean property or setting property
/// `Hidden` is the text to display when true (or truthy)
/// `warning` is the UUI Tag color property (default, positive, warning, danger)
/// `secondary` is the UUI Tag look property (default, primary, secondary, outline, placeholder)
export class TagUfmComponentApi extends UmbUfmComponentBase {
	constructor() {
		super();

		this.render = this.render.bind(this);
	}

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

		const parts = left.split(':');
		const alias = parts[0].trim();
		const display = parts[1]?.trim();
		const color = parts[2]?.trim();
		const look = parts[3]?.trim();

		return Object.entries({ alias, filters, display, color, look })
			.map(([key, value]) => (value ? `${key}="${value.trim()}"` : null))
			.join(' ');
	}
}

export { TagUfmComponentApi as api };