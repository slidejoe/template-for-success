---
theme: rockdove
# some information about your slides (markdown enabled)
title: 'v17 Editor experience: A \{$template\} for success'
info: |
  Editor experience isn’t just a nice-to-have — it’s what makes or breaks your build. With the arrival of the first LTS using the new backoffice, we're seeing fresh possibilities to shape more intuitive and delightful editing environments. But with great innovation (hello Bellissima!) comes the loss of old comforts (farewell AngularJS).

  We'll explore how developers can craft richer editor experiences using blocks, templated labels, and the newly-minted Umbraco Flavored Markdown (UFM) as well as some custom views and project-specific extensions.

  Whether you're wrangling complex content models or just tired of grumpy editors, this session will help you build backoffices that are thoughtful and elegant without sacrificing structure or sanity.
# https://sli.dev/features/drawing
drawings:
  persist: false
# slide transition: https://sli.dev/guide/animations.html#slide-transitions
transition: view-transition
# enable MDC Syntax: https://sli.dev/features/mdc
mdc: true
# duration of the presentation
duration: 30min
addons:
  - slidev-addon-demotime
---
<style>
.slidev-vclick-hidden {
  display:none;
}
.loading {
  font-family: var(--font-family-code);
}
</style>

# v17 Editor experience:<br /> <v-click hide>`A ${template} for success`</v-click><span v-click="[1,2]" class="loading"><solar-traffic-line-duotone class="animate-spin" /> Compiling template...</span><v-click at="2">A template for success</v-click>


---
layout: bio
image: /images/Unicorn-transparent.png
tagline: Senior Developer at Bump Digital
---

- <solar-medal-ribbons-star-bold-duotone /> 5&times; Umbraco MVP
- <solar-pen-new-square-bold-duotone />  [AngularJS filter cheat sheet](https://joe.gl/ombek/blog/umbraco-angularjs-filter-cheat-sheet/)

<br/>

- <logos-mastodon-icon /> [@joe@umbraco&#8239;community.social](https://umbracocommunity.social/joe)
- <logos-bluesky />  [@joe.gl](https://bsky.app/profile/joe.gl)

---
layout: quote
---

<style>
  ins {
      position: absolute;
      transform: translate(-50%, -200%) rotate(-2deg);
      text-decoration: none;
      font-size: 0.8em;
      font-family: "Gamja Flower", cursive;
      color: var(--color-mandarin);
      overflow: visible;
      
  white-space: nowrap;
  }
  ins::after {
    font-size: 1.5em;
    content: "^";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, 0.5em) translate(-0.2em, 0) rotate(-3deg);
  }
</style>
<link href="https://fonts.googleapis.com/css2?family=Gamja+Flower&display=swap" rel="stylesheet">

We don't really like <v-click><ins>the way our last agency built</ins></v-click> Umbraco

::cite::
Prospective clients?

---
layout: quote
---

I don't get the new Umbraco backoffice

::cite::
Me, until very recently

---
layout: icons-header
---

## <solar-text-circle-line-duotone/> Property descriptions
Useful to explain a property when a name won't do it.

::icons::

<v-clicks>

- <logos-markdown /> Markdown!
- <solar-code-line-duotone /> HTML!
- <simple-icons-umbraco /> UUI!

</v-clicks>

---
layout: two-cols-header
---

### <solar-text-circle-line-duotone/> Property Descriptions: Read more

::left::

The old way:

```md
Short description

---

Descriptions below a `---` were rendered behind a "Read More" link in v9-13.
```

::right::

Verses in modern Umbraco:

```md
Short description

---

Three dashes renders a horizontal rule.

<details>
<summary>Read more</summary>

We have to use the native HTML `details` element for modern Umbraco.

</details>
```


---
layout: center
---

```md {all|7|2,3,5,9|4}
Should search engines and other crawlers index this page and serve them up as search results?
<details>
<summary>
  <uui-icon name="icon-help-alt" label="More details"></uui-icon> 
</summary>

This sets the *index* aspect of the [`robots` meta tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/robots)

</details>
```

---
layout: image
image: /images/prop-a.png
backgroundSize: auto
---

---
layout: image
image: /images/prop-description.apng
backgroundSize: contain
---

---

## <solar-full-screen-square-bold-duotone/> RTE Blocks

![](/images/rte-toolbar-settings.png){style="height:200px"}
![](/images/rte-blocks-settings.png){style="height:200px"}

---

### <solar-full-screen-square-bold-duotone/> RTE Block views

```razor[TemplateForSuccess.Web\Views\Partials\RichText\Components\PhoneNumberRteBlock.cshtml ~i-vscode-icons:file-type-razor~]
@inherits Umbraco.Cms.Web.Common.Views.UmbracoViewPage<Umbraco.Cms.Core.Models.Blocks.RichTextBlockItem<ContentModels.PhoneNumberRteBlock>>
@using ContentModels = Umbraco.Cms.Web.Common.PublishedModels;
@using System.Text.RegularExpressions
@{
	var contactPage = Model.Content.ContactUsPage as ContentModels.Contact;

	if(contactPage is null || string.IsNullOrWhiteSpace(contactPage.PhoneNumber))
	{
		return;
	}
}

<a href="tel:@contactPage.PhoneNumber.Replace(" ", "")">
	@Regex.Replace(contactPage.PhoneNumber, @"\+44\s*", "0")
</a>
```

---
layout: image
image: /images/rte-block.apng
backgroundSize: contain
---

---
layout: image
image: /images/rte-blocks-rendered.png
backgroundSize: contain
---

---
layout: image
image: /images/blocks-no-templates.png
backgroundSize: contain
---

---

## Block labels

We used to be able to achieve this using [AngularJS templates](https://joe.gl/ombek/blog/umbraco-angularjs-filter-cheat-sheet/) where we could do things like:

`Call to Action: {{ page | ncNodeName }}`

`Text module: {{ bodyText.markup | ncRichText | truncate:true:35 }}`

---
layout: icons-header
---

### Umbraco Flavored Markdown (UFM)

There are several syntaxes for using UFM:

::icons::

- <solar-circle-top-up-bold-duotone />
  Components
  `{componentAlias:value}`
- <solar-dollar-bold-duotone />
  Expressions
  `${ jsLikeSyntax }`
- <solar-filters-bold-duotone />
  Filters
  `| filterAlias:parameters`
  appended to components _or_ expressions

---

#### <solar-circle-top-up-bold-duotone /> UFM Components

Components are the original UFM syntax and offer some shortcuts for some common use-cases for rendering labels. These include:

- `umbValue` for rendering the value of a property, e.g. `{umbValue: heading}`
- `umbContentName` for getting the name(s) of picked content, e.g. ` {umbContentName: blogCategory}`
- `umbLink` to get the title of a picked link, e.g. `{umbLink: callToAction}`
- `umbLocalize` for localizing a dictionary string, e.g. `{umbLocalize: contact_us}`

These are more limited than Expressions, but currently these are the only methods of obtaining content names and localization keys. Also [filters with parameters currently only work for components](https://github.com/umbraco/Umbraco-CMS/issues/20744).

---

#### <solar-dollar-bold-duotone /> UFM Expressions

Expressions are a closer parallel to the AngularJS templates we had previously. You can run simple, safe JS-like expressions to obtain values. The expressions have access to all property values as well as any block settings on a `$settings` variable and the block’s index in `$index` (0-based unlike in Angular where it was 1-based). Native, non-global JS functions are also allowed.

`${ $index+1 }. Rich Text: ${ content } ${ $settings.hide == '1' ? '[HIDDEN]' : '' }`

---

#### <solar-filters-bold-duotone /> UFM Filters

Another parallel to AngularJS is the concept of Filters. These are piped onto the end of an existing component or expression to further modify the value.

The currently available filters are:

- `wordLimit`* taking a parameter for the number of words
- `truncate`* taking a parameter for number of characters and a string to indicate truncation (`…`)
- `stripHtml` removes HTML markup leaving only the text, useful for rendering a preview of rich text content
- `uppercase`
- `lowercase`
- `titleCase`
- `fallback`* taking a string parameter to show if the value would otherwise be null
- `bytes` formats a number of bytes as human-readable text in, for example, GB

---

#### <solar-filters-bold-duotone /> UFM Filters

The filters allow us to tidy up our example from earlier by stripping the HTML, truncating and providing a fallback.

`${ $index+1 }. Rich Text: {umbValue: content | stripHtml | truncate:30 | fallback:[Empty] } ${ $settings.hide == '1' ? '[HIDDEN]' : '' }`

[Filters with parameters don’t currently work for expressions](https://github.com/umbraco/Umbraco-CMS/issues/20744)

---

```md
Rich Text: ${ content.markup | stripHtml } ${ $settings.hide == '1' ? '[HIDDEN]' : '' }
Image: ${ caption } ${ $settings.hide == '1' ? '[HIDDEN]' : '' }
Video: ${ caption != '' ? caption : videoUrl } ${ $settings.hide == '1' ? '[HIDDEN]' : '' }
Code Snippet: ${ title } ${ $settings.hide == '1' ? '[HIDDEN]' : '' }
Image Carousel ${ $settings.hide == '1' ? '[HIDDEN]' : '' }
{umbContentName:articleList} Articles ${ $settings.hide == '1' ? '[HIDDEN]' : '' }
```

![](/images/blocks-basic-templates.png)

---

### Extending UFM

The difficulty with replacing something as complex as AngularJS templates is that they were so flexible it’s hard for Umbraco to know what people were doing with it, and thus what to replicate. But where features are missing, they’ve been responsive to feature requests and have also provided multiple mechanisms to extend UFM.

We’re provided with the option to create custom components or custom filters.



Custom filters are synchronous functions that are best used for basic string manipulation and cannot render HTML.

---

## <solar-box-bold-duotone/> Extending the Umbraco Backoffice

- Changed significantly with v14+

- Geared up for packages!

- Harder for one-off tweaks to sites

---

### <solar-box-bold-duotone/> Creating an extension

<v-clicks every="2">

- [Vite Package Setup - Umbraco Docs](https://docs.umbraco.com/umbraco-cms/customizing/development-flow/vite-package-setup)
- [Lotte's Opinionated Umbraco Package Starter Template](https://github.com/LottePitcher/opinionated-package-starter)
- [Bump's Umbraco Backoffice Extension Starter](https://github.com/bumpdigital/umbraco-backoffice-extension-starter)

</v-clicks>

---
layout: default
---
### <solar-filters-bold-duotone/> Creating a custom UFM Filter

````md magic-move[My.UmbracoBackofficeExtensions\Client\src\manifests.ts]
```ts
export const manifests: Array<UmbExtensionManifest> = [
  //TODO: Add your extension manifests here
];
```
```ts{all|3|4|5|6|7-9|6}
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
```
````

[Extension types - Umbraco Docs](https://docs.umbraco.com/umbraco-cms/customizing/extending-overview/extension-types){v-click="[2,3]"}
<code v-click="[6,7]">\{dateFormat: datePropertyAlias\}</code>
---
layout: default
---
### <solar-filters-bold-duotone/> Creating a custom UFM Filter


````md magic-move[My.UmbracoBackofficeExtensions\Client\src\date-format.filter.ts]
```ts{all|3|4-6}
import { UmbUfmFilterBase } from '@umbraco-cms/backoffice/ufm';

class UmbUfmDateFormatFilterApi extends UmbUfmFilterBase {
  filter(value) {
    // TODO: Manipulate the value here
    return value;
  }
}
export { UmbUfmDateFormatFilterApi as api };
```
```ts{4}
import { UmbUfmFilterBase } from '@umbraco-cms/backoffice/ufm';

class UmbUfmDateFormatFilterApi extends UmbUfmFilterBase {
  filter(value, format) {
    // TODO: Manipulate the value here
    return value;
  }
}
export { UmbUfmDateFormatFilterApi as api };
```
```ts{6-10}
import { UmbUfmFilterBase } from '@umbraco-cms/backoffice/ufm';
import { DateTime } from 'luxon';

class UmbUfmDateFormatFilterApi extends UmbUfmFilterBase {
  filter(value, format) {
    if (!value) return value;

    const date = DateTime.fromISO(value.date, { zone: value.timeZone });

    return date.toFormat(format || "yyyy-MM-dd HH:mm");
  }
}
export { UmbUfmDateFormatFilterApi as api };
```
```ts{6-14}
import { UmbUfmFilterBase } from '@umbraco-cms/backoffice/ufm';
import { DateTime } from 'luxon';

class UmbUfmDateFormatFilterApi extends UmbUfmFilterBase {
  filter(value, format) {
    if (!value) return value;

    const date = value instanceof Date ?
      DateTime.fromJSDate(value) :
      typeof value === 'string' ?
        DateTime.fromISO(value) :
        DateTime.fromISO(value.date, { zone: value.timeZone || undefined });

    return date.toFormat(format || "yyyy-MM-dd HH:mm");
  }
}
export { UmbUfmDateFormatFilterApi as api };
```
```ts
import { UmbUfmFilterBase } from '@umbraco-cms/backoffice/ufm';
import { DateTime } from 'luxon';

class UmbUfmDateFormatFilterApi extends UmbUfmFilterBase {
  filter(value?: Date | string | { date: string, timeZone: string | undefined | null } | undefined | null, format?: string) {
    if (!value) return value;

    const date = value instanceof Date ?
      DateTime.fromJSDate(value) :
      typeof value === 'string' ?
        DateTime.fromISO(value) :
        DateTime.fromISO(value.date, { zone: value.timeZone || undefined });

    if (date.invalidReason) {
      console.error(`Invalid date passed to dateFormat filter: ${date.invalidReason}\r\n${date.invalidExplanation}`);
      return '';
    }

    // Allowed formats: https:// moment.github.io/luxon/#/formatting?id=table-of-tokens
    return date.toFormat(format || "yyyy-MM-dd HH:mm");
  }
}
export { UmbUfmDateFormatFilterApi as api };
```
````

---
layout: center
---

```md
{umbContentName:articleList} Articles${ dateFrom ? ' since ' : '' }{umbValue: dateFrom|dateFormat:MMMM yyyy} ${$settings.hide == '1' ? '[HIDDEN]' : ''}
```

![](/images/block-date-filter.png)

---

![](/images/blocks-basic-templates.png)
![](/images/blocks-component-mockup.png)


---
layout: default
---
### <solar-circle-top-up-bold-duotone /> Creating a custom UFM Component

````md magic-move[My.UmbracoBackofficeExtensions\Client\src\manifests.ts]
```ts
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
```
```ts{11-19|15}
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
```
````

---
layout: default
---
### <solar-circle-top-up-bold-duotone /> Creating a custom UFM Component

````md magic-move[My.UmbracoBackofficeExtensions\Client\src\tag.component.ts]
```ts{all|6|7-12|10|11|11,4}
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
```
```ts{3,10-21}
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
```
````
---
layout: default
---
### <solar-circle-top-up-bold-duotone /> Creating a custom UFM Component

````md magic-move[My.UmbracoBackofficeExtensions\Client\src\tag.element.ts]
```ts{*|5|4,9,9-16|7|6}
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
```
```ts{all|4-5|8-13}
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
```
````

---
layout: none
---
<style>
  div:has(> .slidev-monaco-container),
  .slidev-monaco-container {
    height: 100%;
  }
  .slidev-monaco-container-inner {
    max-height: 100%;
  }
</style>

```ts{monaco}
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
```

---

```
${ $settings.hide == '1' ? '[HIDDEN]' : '' }
```
replaced with
```
{tag: hide:Hidden:warning:secondary}
```

Also added
```
{tag: showPagination:Paginated:default:outline}
```

![](/images/block-tag-component.png)

---
layout: cover
---

## <solar-align-vertical-spacing-bold-duotone/> Custom block views

Let's take that "Hidden" example further...

![](/images/blocks-component-mockup.png)

What if we could avoid adding anything to the label template at all?

---

## <solar-align-vertical-spacing-bold-duotone/> Custom block views

````md magic-move[My.UmbracoBackofficeExtensions\Client\src\manifests.ts]
```ts
export const manifests: Array<UmbExtensionManifest> = [
  // ...
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
```
```ts{12-18|16}
export const manifests: Array<UmbExtensionManifest> = [
  // ...
  {
    type: 'ufmComponent',
    alias: 'My.UfmComponent.Tag',
    name: 'Tag UFM Component',
    api: () => import('./tag.component'),
    meta: {
      alias: 'tag'
    }
  },
  {
    type: 'blockEditorCustomView',
    alias: 'My.HiddenBlockEditorView',
    name: 'Hidden Block Editor View',
    element: () => import('./hidden-block.element'),
    forBlockEditor: 'block-list'
  }
];
```
````

---
layout: none
---

```ts{monaco}
import { html, customElement, LitElement, property, css, when } from '@umbraco-cms/backoffice/external/lit';
import { UmbElementMixin } from '@umbraco-cms/backoffice/element-api';
import type { UmbBlockDataType } from '@umbraco-cms/backoffice/block';
import type { UmbBlockEditorCustomViewElement, UmbBlockEditorCustomViewConfiguration } from '@umbraco-cms/backoffice/block-custom-view';

@customElement('hidden-block-custom-view')
// UmbRefListBlockElement is not exposed to extend it, so we have to copy a lot of it in to replace it
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
			<uui-ref-node standalone
        href=${(this.config?.showContentEdit ? this.config?.editContentPath : undefined) ?? ''}
        class="${this.settings?.hide ? 'hidden' : ''}">
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
```
---
layout: image
image: /images/block-custom-view-with-template.png
backgroundSize: contain
---

---
layout: image
image: /images/block-custom-view-no-template.png
backgroundSize: contain
---


---

## <solar-notification-unread-bold-duotone/> Custom entity signs

A brand new extension point!
Allows for custom signs on entities, just like the "pending changes" sign

![](/images/unpublished-changes-sign.png)

---

## <solar-notification-unread-bold-duotone/> Custom entity signs

<!-- You might have seen code like this, that blocks certain types from being deleted -->

```csharp[My.UmbracoBackofficeExtensions\Notifications\LockedDocumentContentMovingToRecycleBinNotificationHandler.cs ~i-vscode-icons:file-type-csharp~]
/// A common use case: prevent certain document types being deleted
public class LockedDocumentContentMovingToRecycleBinNotificationHandler : INotificationHandler<ContentMovingToRecycleBinNotification>
{
    public static string[] LOCKED_ALIASES = ["home", "error"];
    public static Guid[] LOCKED_IDS = [
      Guid.Parse("a95360e8-ff04-40b1-8f46-7aa4b5983096"),
      Guid.Parse("9db112c5-c2ea-441d-8bd4-6daf522aa2b6")
    ];
    public void Handle(ContentMovingToRecycleBinNotification notification)
    {
        foreach (var item in notification.MoveInfoCollection)
        {
            if (Array.Exists(LOCKED_ALIASES, alias => alias.Equals(item.Entity.ContentType.Alias, StringComparison.OrdinalIgnoreCase)))
            {
                notification.CancelOperation(new EventMessage(
                  $"{item.Entity.Name} cannot be trashed",
                  $"The content item '{item.Entity.Name}' is of type '{item.Entity.ContentType.Name}' which cannot be trashed.",
                  EventMessageType.Error));
            }
        }
    }
}
```

---

## <solar-notification-unread-bold-duotone/> Custom entity signs

````md magic-move[My.UmbracoBackofficeExtensions\Client\src\manifests.ts]
```ts
export const manifests: Array<UmbExtensionManifest> = [
  // ...
    name: 'Hidden Block Editor View',
    element: () => import('./hidden-block.element'),
    forBlockEditor: 'block-list'
  }
];
```
```ts{9-23|10-11|12-13|14|16|17-21|15}
import { UMB_DOCUMENT_ENTITY_TYPE } from '@umbraco-cms/backoffice/document';

export const manifests: Array<UmbExtensionManifest> = [
  // ...
    name: 'Hidden Block Editor View',
    element: () => import('./hidden-block.element'),
    forBlockEditor: 'block-list'
  },
  {
    type: 'entitySign',
    kind: 'icon',
    alias: 'Umb.EntitySign.Document.My.Locked',
    name: 'Is Locked Document Entity Sign',
    forEntityTypes: [UMB_DOCUMENT_ENTITY_TYPE],
    forEntityFlags: ['Umb.My.Locked'],
    weight: -1000,
    meta: {
      iconName: 'icon-lock',
      label: 'Locked',
      iconColorAlias: 'red',
    }
  }
];
```
````

---

````md magic-move[My.UmbracoBackofficeExtensions\LockedDocumentFlagProvider.cs ~i-vscode-icons:file-type-csharp~]
```csharp{*|3|4-7|9-19|21-24}
public class LockedDocumentFlagProvider : IFlagProvider
{
    private const string Alias = Constants.Conventions.Flags.Prefix + "My.Locked";
    // Indicate that this flag provider only provides flags for documents.
    public bool CanProvideFlags<TItem>()
        where TItem : IHasFlags => typeof(TItem) == typeof(DocumentTreeItemResponseModel) ||
        typeof(TItem) == typeof(DocumentCollectionResponseModel) || typeof(TItem) == typeof(DocumentItemResponseModel);

    public Task PopulateFlagsAsync<TItem>(IEnumerable<TItem> itemViewModels) where TItem : IHasFlags
    {
        foreach (TItem item in itemViewModels)
        {
            if (ShouldAddFlag(item))
            {
                item.AddFlag(Alias);
            }
        }
        return Task.CompletedTask;
    }

    private bool ShouldAddFlag<TItem>(TItem item)
    {
      //...
    }
}
```
```csharp{6-23|22}
public class LockedDocumentFlagProvider : IFlagProvider
{
  private const string Alias = Constants.Conventions.Flags.Prefix + "My.Locked";
  public bool CanProvideFlags<TItem>() where TItem : IHasFlags { ... }
  public Task PopulateFlagsAsync<TItem>(IEnumerable<TItem> itemViewModels) where TItem : IHasFlags { ... }
  private bool ShouldAddFlag<TItem>(TItem item)
  {
      Guid id;
      switch (item)
      {
          case DocumentTreeItemResponseModel dti:
              id = dti.DocumentType.Id;
              break;
          case DocumentCollectionResponseModel dc:
              id = dc.DocumentType.Id;
              break;
          case DocumentItemResponseModel di:
              id = di.DocumentType.Id;
              break;
          default: return false;
      }
      return LockedDocumentContentMovingToRecycleBinNotificationHandler.LOCKED_IDS.Contains(id);
  }
}
```
````
---
layout: image
image: /images/locked-signs.png
backgroundSize: contain
---


---
layout: icons-header
---

## Your new customisation options...

::icons::

- <solar-text-circle-line-duotone/> Property descriptions
- <solar-full-screen-square-bold-duotone/> RTE Blocks
- <solar-circle-top-up-bold-duotone /> UFM Components + custom
- <solar-dollar-bold-duotone /> UFM Expressions
- <solar-filters-bold-duotone/> UFM Filters + custom
- <solar-box-bold-duotone/> Extending the Backoffice
- <solar-align-vertical-spacing-bold-duotone/> Custom block views
- <solar-notification-unread-bold-duotone/> Custom entity signs

---
layout: icons-header
---

## ...as well as the old ones...

::icons::

- <solar-rounded-magnifer-bold-duotone/> Icons
- <solar-verified-check-bold-duotone/> Property validation ([regex!](https://joe.gl/ombek/blog/eg-regex))
- <solar-repeat-one-minimalistic-bold-duotone/> Avoid repeating content
- <solar-inbox-archive-bold-duotone/> Semantic content modelling
- <solar-server-minimalistic-bold-duotone/> List views
- <solar-test-tube-minimalistic-bold-duotone/> User testing & feedback loops


---
layout: bio
image: /images/Unicorn-transparent.png
name: Thank you
---

- <logos-mastodon-icon /> [@joe@umbraco&#8239;community.social](https://umbracocommunity.social/joe)
- <logos-bluesky /> [@joe.gl](https://bsky.app/profile/joe.gl)
- <logos-linkedin-icon /> https://www.linkedin.com/in/glombek/

<br/>

- <solar-global-bold-duotone /> https://joe.gl/ombek
- <solar-presentation-graph-bold-duotone /> https://slides.joe.gl/template-for-success

---