import { html, customElement, LitElement, property, css, when } from '@umbraco-cms/backoffice/external/lit';
import { UmbElementMixin } from '@umbraco-cms/backoffice/element-api';
import type { UmbBlockDataType } from '@umbraco-cms/backoffice/block';
import type { UmbBlockEditorCustomViewElement, UmbBlockEditorCustomViewConfiguration } from '@umbraco-cms/backoffice/block-custom-view';

// UmbRefListBlockElement is not exposed, so we have to copy a lot of it in to replace it

@customElement('hidden-block-custom-view')
export class HiddenBlockCustomView extends UmbElementMixin(LitElement) implements UmbBlockEditorCustomViewElement {
	
	@property({ type: String, reflect: false })
	label?: string;

	@property({ type: String, reflect: false })
	icon?: string;

	@property({ type: Number, attribute: false })
	index?: number;

	@property({ type: Boolean, reflect: true })
	unpublished?: boolean;

	@property({ attribute: false })
	content?: UmbBlockDataType;

	@property({ attribute: false })
	settings?: UmbBlockDataType;

	@property({ attribute: false })
	config?: UmbBlockEditorCustomViewConfiguration;

	override render() {
		const blockValue = { ...this.content, $settings: this.settings, $index: this.index };
		return html`
			<uui-ref-node standalone href=${(this.config?.showContentEdit ? this.config?.editContentPath : undefined) ?? ''} class="${this.settings?.hide ? 'hidden' : ''}">
			${when(
				this.settings?.hide,
				() =>
					html`<umb-icon slot="icon" name="icon-checkbox-dotted"></umb-icon>`,
				() =>
					html`<umb-icon slot="icon" .name=${this.icon}></umb-icon>`
			)}
				<umb-ufm-render slot="name" inline .markdown=${this.label} .value=${blockValue}></umb-ufm-render>
				${when(
					this.unpublished,
					() =>
						html`<uui-tag slot="name" look="secondary" title=${this.localize.term('blockEditor_notExposedDescription')}
									><umb-localize key="blockEditor_notExposedLabel"></umb-localize
								></uui-tag>`,
				)}
				${when(
					this.settings?.hide,
					() =>
						html`<uui-tag slot="name" look="secondary" title="Hidden"
								>Hidden</umb-localize
							></uui-tag>`
				)}
			</uui-ref-node>
		`;
	}

	static override styles = [
		css`
			uui-ref-node {
				min-height: var(--uui-size-16);
			}
			uui-tag {
				margin-left: 0.5em;
				margin-bottom: -0.3em;
				margin-top: -0.3em;
				vertical-align: text-top;
			}
			:host([unpublished]) umb-icon,
			.hidden umb-icon,
			:host([unpublished]) umb-ufm-render,
			.hidden umb-ufm-render {
				opacity: 0.6;
			}
		`,
	];
}
export default HiddenBlockCustomView;

declare global {
	interface HTMLElementTagNameMap {
		'hidden-block-custom-view': HiddenBlockCustomView;
	}
}

