---
theme: rockdove
# some information about your slides (markdown enabled)
title: 'v17 Editor experience: A $\{template\} for success'
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
monacoRunUseStrict: false
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


<!--
 - Practical non-contrived examples
 - things that have changed in recent versions

 - That's embarrassing, talking about templates but my templates didn't compile! [Click][Click]
 - Fixed it!
-->

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

<!--
 - AngularJS cheat sheet is _still_ one of my most popular blog posts
-->

---
layout: intro
---

# <solar-question-circle-bold-duotone/><br/>Why does backoffice UX matter?

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

<!--
Have heard this sort of thing in the past

but what they really mean is[click] they don't like the way their last agency built Umbraco.

This is what's at stake

and why it matters that we consider backoffice UX

but...
-->

---
layout: quote
---

I don't get the new Umbraco backoffice

::cite::
Me, until very recently

<!--
...with all the recent changes

not sure how to do it!

Today we're going to look at some features that have changed in recent releases.
-->

---
layout: intro
---

# <solar-text-circle-line-duotone/><br />Property descriptions

<!--
I'm sure you're already aware of property descriptions!

Useful to explain a property when a name doesn't give enough detail.
-->
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

<!--

[Click]

Have been Markdown for a long time

Although allowed features have changed

But because it's markdown, we can use...

[Click]

HTML!

And because it's HTML, we can also use

[Click]

web components, like UUI.



-->

---
layout: two-cols-header
---

### <solar-text-circle-line-duotone/> Property Descriptions: Read more

::left::

The old way:

<<< @/snippets/property-descriptions-read-more.md md


::right::

Verses in modern Umbraco:

<<< @/snippets/property-descriptions-read-more-new.md md


<!--
One of the features that's changed in recent versions is the "read more" functionality.

In earlier versions of Umbraco, `---` rendered a read more link.

This is no longer the case, `---` renders a horizontal rule element (as it should!)

But we can recreate the read more functionality with modern HTML.

We can even take that a step further...
-->

---
layout: center
---

<<< @/snippets/property-descriptions-read-more-new-eg.md md {all|7|2,3,5,9|4}


<!--

  We can even take that a step further... in this example
  [Click]

  - Markdown [Click]
  - HTML to render a `<details>` element to recreate the read more functionality[Click]
  - Because IIU uses web components, which are HTML, we can bring UUI elements into the descriptions too.
  - UUI to render the Umbraco help icon

Which means we can turn this...
-->

---
layout: image
image: /images/prop-a.png
backgroundSize: auto
---

<!--
Which means we can turn this... basic description into...
-->

---
layout: image
image: /images/prop-description.apng
backgroundSize: contain
---

<!--
This much richer and detailed description with an expanding section with hyperlinks for those who require additional help.
-->


---
layout: intro
---
# <solar-full-screen-square-bold-duotone/><br />Rich Text Editor Blocks

<!--
Another feature new to recent Umbraco versions is rich text editor blocks.

Work just like blocks in block list and block grid.

-->

---

## <solar-full-screen-square-bold-duotone/> RTE Blocks Setup

![](/images/rte-toolbar-settings.png){style="height:200px"}
![](/images/rte-blocks-settings.png){style="height:200px"}


<!--

To configure element types for use in the RTE, we need to:
- add the blocks toolbar button
- configure the blocks, just like other block editors
  - can have settings and content
  - rendered inline or as a block.

The main difference is in how the blocks are rendered...
-->

---

### <solar-full-screen-square-bold-duotone/> RTE Block views

<<< @/snippets/rte-block-views.razor razor


<!--
  Simply needs a view matching the alias in the Views\Partials\RichText\Components folder

  In this example I'm rendering a phone number from the selected contact page
  Applying all the logic I want to format the phone number
  And adding the `tel:` link

The journey for adding this block via the backoffice looks like this:

-->

---
layout: image
image: /images/rte-block.apng
backgroundSize: contain
---

<!--
- Click the insert block button
- Pick my phone number block
- Complete the content for the block, a content picker for the contact page in my case
- Save
- And a placeholder appears inline in the RTE

-->

---
layout: image
image: /images/rte-blocks-rendered.png
backgroundSize: contain
---

<!-- 
 Which renders like this on the frontend.
-->

---
layout: image
image: /images/blocks-no-templates.png
backgroundSize: contain
---

<!-- All blocks, including those inline in the RTE or, as shown here, in the block list will by default the name of the block

Which is not the most helpful if you're trying to find a specific block in a list of 5 of the same type...
 -->

---
layout: intro
---

# <solar-tag-bold-duotone/><br/>Block label templates

---

## <solar-tag-bold-duotone/> Block label templates

We used to be able to achieve this using [AngularJS templates](https://joe.gl/ombek/blog/umbraco-angularjs-filter-cheat-sheet/) where we could do things like:

`Call to Action: {{ page | ncNodeName }}`

`Text module: {{ bodyText | ncRichText | truncate:true:35 }}`

<!--
We used to be able customise this by providing label templates for our blocks using AngularJS templates

(for which I wrote a cheat sheet!)

We could do things like these

Rendering the name of a page using the `ncNodeName` filter

Or strip markup from an RTE, and truncate it to fit the label.

But with the removal of AngularJS, came the removal of AngularJS templates...
-->

---
layout: icons-header
---

### <solar-square-arrow-down-bold-duotone/> Umbraco Flavored Markdown (UFM)

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

<!--
So we've been presented with UFM - Umbraco Flavored Markdown


(Although the "Markdown" bit is largely irrelevant for labels!
But UFM is what's used in property descriptions too!)

UFM has 3 syntaxes useful for label templates:
- Components
- Expressions
- Filters

Let's explore each of these...
-->

---

#### <solar-circle-top-up-bold-duotone /> UFM Components

| Component        | Use                                   | Example                          |
| ---------------- | ------------------------------------- | -------------------------------- |
| `umbValue`       | rendering the value of a property     | `{umbValue: heading}`            |
| `umbContentName` | getting the name(s) of picked content | `{umbContentName: blogCategory}` |
| `umbLink`        | gets the title of a picked link       | `{umbLink: callToAction}`        |
| `umbLocalize`    | localizing a dictionary string        | `{umbLocalize: contact_us}`      |

- More limited than Expressions

- Only method of obtaining content names and localization keys (currently)

- [Filters with parameters currently only work for components](https://github.com/umbraco/Umbraco-CMS/issues/20744) (bug)

  <!--
  Components are the original UFM syntax and offer some shortcuts for some common use-cases for rendering labels.
  These are more limited than Expressions, but currently these are the only methods of obtaining content names and localization keys.
   Also [filters with parameters currently only work for components](https://github.com/umbraco/Umbraco-CMS/issues/20744).
  -->

---

#### <solar-dollar-bold-duotone /> UFM Expressions

- More like AngularJS templates
- Simple, safe JS-like expressions
- Access to content properties, `$settings`, `$index` (0-based)
- Native non-global JS functions

`${ $index+1 }. Rich Text: ${ content } ${ $settings.hide == '1' ? '[HIDDEN]' : '' }`


<!--
Expressions are a closer parallel to the AngularJS templates we had previously.
You can run simple, safe JS-like expressions to obtain values.
The expressions have access to all property values as well as any block settings on a `$settings` variable and the block’s index in `$index` (0-based unlike in Angular where it was 1-based).
Native, non-global JS functions are also allowed.
-->

---

#### <solar-filters-bold-duotone /> UFM Filters

| Filter      | Parameters      | Use                                                          |
| ----------- | --------------- | ------------------------------------------------------------ |
| `wordLimit` | number of words | limits to a number of words                                  |
| `truncate`  | length, suffix  | limits to a number of characters and appends a suffix (`…`) if trunctated |
| `stripHtml` |                 | removes HTML markup leaving only the text                    |
| `uppercase` |                 | converts text to UPPER CASE                                  |
| `lowercase` |                 | converts text to lower case                                  |
| `titleCase` |                 | converts text to Title Case                                  |
| `fallback`  | fallback value  | taking a string parameter to show if the value would otherwise be null |
| `bytes`     |                 | formats a number of bytes as human-readable text in KB, MB, GB, etc. |

<!--

Another parallel to AngularJS is the concept of Filters. These are piped onto the end of an existing component or expression to further modify the value.

`wordLimit` and `truncate` truncate a string to the specified number of words or characters

`stripHtml` useful for rendering a preview of rich text content

`uppercase`, `lowercase`, `titleCase` changes the casing

`fallback`  allows you to specify a fallback value if the right hand side of the filter is falsey

`bytes` converts a filesize in bytes to human-readable KB, MB or GB

[Filters with parameters don’t currently work for expressions](https://github.com/umbraco/Umbraco-CMS/issues/20744)

-->

---

#### <solar-filters-bold-duotone /> UFM Filters

The filters allow us to tidy up our example from earlier by stripping the HTML, truncating and providing a fallback.

`${ $index+1 }. Rich Text: {umbValue: content | stripHtml | truncate:30 | fallback:[Empty] } ${ $settings.hide == '1' ? '[HIDDEN]' : '' }`

[Filters with parameters don’t currently work for expressions](https://github.com/umbraco/Umbraco-CMS/issues/20744)

<!--
The filters allow us to tidy up our example from earlier by stripping the HTML, truncating and providing a fallback.
-->

---

<<< @/snippets/block-labels-clean.md md


![](/images/blocks-basic-templates.png)

<!--
These are the templates I recently PR'd to the Clean Starter Kit, which take advantage of a lot of the features we talked about
-->

---

### Extending UFM

<v-clicks>

- AngularJS templates were so flexible it’s hard for Umbraco to know what people were doing with it!
- Not every use case has been replicated
- Features are being added quickly when requested
- Mechanisms to extend UFM:

  - custom components
  
  - custom filters
    synchronous functions that are best used for basic string manipulation and cannot render HTML

</v-clicks>

<!--
The difficulty with replacing something as complex as AngularJS templates [Click] is that they were so flexible it’s hard for Umbraco to know what people were doing with it,

[Click] and thus what to replicate.

[Click] But where features are missing, they’ve been responsive to feature requests and

[Click] have also provided multiple mechanisms to extend UFM.

We’re provided with the option to create custom components or custom filters.

-->

---
layout: intro
---

# <solar-box-bold-duotone/><br />Extending the Umbraco Backoffice


<!--

But first, we need to know how to extend the backoffice

-->
---

## <solar-box-bold-duotone/> Extending the Umbraco Backoffice

- Changed significantly with v14+

- Geared up for packages!

- Harder for one-off tweaks to sites

<!--

Changed significantly in recent versions

And it's geared up for packages and less for one-off tweaks to individual sites
-->

---

### <solar-box-bold-duotone/> Creating an extension

<v-clicks every="4">

- [Vite Package Setup - Umbraco Docs](https://docs.umbraco.com/umbraco-cms/customizing/development-flow/vite-package-setup)
- [Umbraco Extension Template - Umbraco Docs](https://docs.umbraco.com/umbraco-cms/customizing/development-flow/umbraco-extension-template)
- [Lotte's Opinionated Umbraco Package Starter Template](https://github.com/LottePitcher/opinionated-package-starter)
- Vanilla JS ([No, you don’t need Lit, Vite, or TypeScript to Extend the Umbraco Backoffice - Luuk Peters](https://dev.to/luukpeters/no-you-dont-need-lit-vite-or-typescript-to-extend-the-umbraco-backoffice-2mg6))
- [Bump's Umbraco Backoffice Extension Starter](https://github.com/bumpdigital/umbraco-backoffice-extension-starter)

</v-clicks>

<!--
Several options for starting out creating an extension

[Click]

- Umbraco docs guide to creating a Vite-based package
- The Umbraco Extension Template
- Lotte's opinionated starter template
- Vanilla JS, as highlighted by Luuk Peters

But these didn't suit us at Bump.

The docs Vite guide involved a lot of steps and deleting sample code, we wanted something quicker!

The official extension dotnet template is almost what I want!
But creates a lot of files we rarely need.

Lotte's template uses the dotnet template under the covers
adding features fantastic for creating versioned, distributed packages but is overkill for our use case

Although Vanilla JS is simple and works really well for smaller extensions, I prefer the full TypeScript, Lit and Vite setup so its easier to add larger extensions to a project without a second bottleneck.

And as we know in software development, when there are too many options, [Click] make another one!

- Should be a dotnet or npm template
- for now just a zip file
- creates razor class library
- with vite, typescript and lit
- just the basic config, no samples to delete

-->

---
layout: intro
---

# <solar-filters-bold-duotone/><br />Creating a custom UFM Filter

---
layout: default
---

### <solar-filters-bold-duotone/> Creating a custom UFM Filter

````md magic-move[My.UmbracoBackofficeExtensions\Client\src\manifests.ts]
<<< @/snippets/creating-a-custom-ufm-filter.ts#snippet-1 ts

<<< @/snippets/creating-a-custom-ufm-filter.ts#snippet-2 ts{all|3|4|5|6|7-9|6}

````

[Extension types - Umbraco Docs](https://docs.umbraco.com/umbraco-cms/customizing/extending-overview/extension-types){v-click="[2,3]"}
<code v-click="[6,7]">\{umbValue:dateProperty | dateFormat \}</code>

<!--
This starter gives us a `manifests.ts` file where we can register our extensions.

- [Click] Let's create a custom UFM filter.
- [Click] Specify the type from the list of options on the docs, `ufmFilter`
- [Click] Give *the extension* a unique alias
- [Click] and a name
- [Click] tell it what code to run
- [Click] and give *the filter* an alias for use in the markdown
  - `dateFormat` here is the keyword to the right of the pipe

[Click]
So what does the code look like?
-->

---
layout: default
---
### <solar-filters-bold-duotone/> Creating a custom UFM Filter


````md magic-move[My.UmbracoBackofficeExtensions\Client\src\date-format.filter.ts]
<<< @/snippets/creating-a-custom-ufm-filter.ts#snippet-3 ts{all|3|4-6}

<<< @/snippets/creating-a-custom-ufm-filter.ts#snippet-4 ts{4}

<<< @/snippets/creating-a-custom-ufm-filter.ts#snippet-5 ts{6-10}

<<< @/snippets/creating-a-custom-ufm-filter.ts#snippet-6 ts{6-14}

<<< @/snippets/creating-a-custom-ufm-filter.ts#snippet-7 ts

````

<!--


- [Click] create a TS class extending UmbFilterBase
- [Click] with a `filter` function taking the value as a parameter, where we can transform the value
- [Click] we also want our filter to accept a parameter for the format string, so we add that
- [Click] then implement our date-formatting logic
- [Click] allowing multiple different formats of date
- [Click] adding TS type descriptors and some validation

Which allows us to...
-->

---
layout: center
---

<<< @/snippets/creating-a-custom-ufm-filter-eg.md md


![](/images/block-date-filter.png)

<!--

Which allows us to... render templates like this 

Perhaps:
- I have a block that allows me to filter articles newer than a picked date
- I can then format the picked date as human-readable

-->

---

![](/images/blocks-basic-templates.png)
![](/images/blocks-component-mockup.png)

<!--

Might have noticed the word `[HIDDEN]` in all these templates.

Concept taken from Clean

Wouldn't it be nice if we could make this feel more like a part of the UI with little tags?

(Mockup in Paint!)

-->

---
layout: intro
---

# <solar-circle-top-up-bold-duotone /><br />Creating a custom UFM Component


<!--
And to do that we're going to need a UFM Component.
UFM filters can't return HTML.

But also we've made a UFM filter so its only right we make a UFM Component too!
 -->

---
layout: default
---
### <solar-circle-top-up-bold-duotone /> Creating a custom UFM Component

````md magic-move[My.UmbracoBackofficeExtensions\Client\src\manifests.ts]
<<< @/snippets/creating-a-custom-ufm-component.ts#snippet-1 ts

<<< @/snippets/creating-a-custom-ufm-component.ts#snippet-2 ts{11-19|17|15}

````

<code v-click="[2,3]">\{tag: booleanProperty \}</code>

<!--
Here's our manifests file again.

[Click] and now we're adding a new manifest for a ufmComponent, everything here looks very similar

[Click] it's got an alias of `tag`

[Click] and this custom code looks like...
-->

---
layout: default
---
### <solar-circle-top-up-bold-duotone /> Creating a custom UFM Component

````md magic-move[My.UmbracoBackofficeExtensions\Client\src\tag.component.ts]
<<< @/snippets/creating-a-custom-ufm-component.ts#snippet-3 ts{all|6|7-12|10|11|11,4}

<<< @/snippets/creating-a-custom-ufm-component.ts#snippet-4 ts{3,10-21}

````

<!--
...this!

- [Click] New TS class extending `UmbUfmComponentBase`
- [Click] with a `render` function that takes the Markdown token and returns some HTML.
- [Click] `UmbUfmComponentBase` gives us the `getAttributes` function which
  - parses the markdown token
  - turns it into HTML attributes for an element
- [Click] return the markup for a custom web component (async!) using the attributes
- [Click] we import the web component code, look at in a minute
- [Click] I actually override the `getAttributes` function in this case
  - I want my UFM Component to have additional parameters
  - not natively supported

  But what's in that custom web component code?
-->

---
layout: default
---
### <solar-circle-top-up-bold-duotone /> Creating a custom UFM Component

````md magic-move[My.UmbracoBackofficeExtensions\Client\src\tag.element.ts]
<<< @/snippets/creating-a-custom-ufm-component.ts#snippet-5 ts{*|5|4,9,9-16|7|6}

<<< @/snippets/creating-a-custom-ufm-component.ts#snippet-6 ts{all|4-5|8-13}

````

<!--

- [Click] A TS class extending `UmbUfmElementBase` (for now!)
- [Click] Some Lit and JS to expose the class as a web component, including the HTML tag name
- [Click] Some styles
- [Click] and a constructor [Click] which we can expand
- [Click] observe the render context, so when values change our value updates
- [Click] pull out the value of the referenced property from the context
- Manipulate that value to render whatever we need it to

The final class looks like this.

-->
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

<<< @/snippets/creating-a-custom-ufm-component-full.ts ts{monaco}

<!--
- Changed my base class so I can return HTML (bug?)
- Which means I've had to:
  - add all the properties that were in the base class
  - a few of my own for the custom parameters
  - override the render method to show or hide the tag based on a value
- observe the context to read the boolean value from the defined property
-->

---

<<< @/snippets/creating-a-custom-ufm-component-eg.md#snippet-1 md

replaced with
<<< @/snippets/creating-a-custom-ufm-component-eg.md#snippet-2 md


Also added
<<< @/snippets/creating-a-custom-ufm-component-eg.md#snippet-3 md


![](/images/block-tag-component.png)

<!--
- Which means we can replace this `[HIDDEN]` logic with our new component:
- `{tag}` takes 4 parameters (sorry Lee!)
  - the boolean property alias
  - the text to display if true
  - the tag colour
  - the tag style
- I've replaced the `[HIDDEN]` logic as well as a flag that shows if we have pagination enabled for our blog posts
-->

---
layout: center
---

Let's take that "Hidden" example further...

![](/images/blocks-component-mockup.png)

We add the hidden logic to every block label. What if we could avoid adding anything to the label template at all?

---
layout: intro
---

# <solar-align-vertical-spacing-bold-duotone/> <br /> Custom block views

<!--
Custom block views have changed with recent versions too, so let's take a look at how we might do this.
-->
---

## <solar-align-vertical-spacing-bold-duotone/> Custom block views

````md magic-move[My.UmbracoBackofficeExtensions\Client\src\manifests.ts]
<<< @/snippets/custom-block-views.ts#snippet-1 ts

<<< @/snippets/custom-block-views.ts#snippet-2 ts{12-18|13|17|16}

````

<!--
We're back in our manifests file

- [Click] adding a new manifest
- [Click] of type `blockEditorCustomView`
- [Click] specifying which block editor we're replacing the view for
- [Click] and referencing a TS file
-->

---
layout: none
---

<<< @/snippets/custom-block-views-full.ts ts{monaco}


<!--
- We're extending the `UmbElementMixin` and implementing `UmbBlockEditorCustomViewElement`.
- `UmbRefListBlockElement` is not exposed to extend it, so we have to copy a lot of it in to replace it (feature request?)
- List of properties (copied)
- a render method (mostly copied)
- added logic for hidden blocks
- copied styles
- added styles for hidden blocks
-->

---
layout: image
image: /images/block-custom-view-with-template.png
backgroundSize: contain
---

<!-- 
Which now renders this!

We can remove the original label template logic...
-->

---
layout: image
image: /images/block-custom-view-no-template.png
backgroundSize: contain
---

<!--
- But the hidden tags from the view still show
- along with the other changes I made:
  - being faded out
  - icon changed to a dotted square
-->

---
layout: intro
---

# <solar-notification-unread-bold-duotone/> <br /> Custom entity signs

<!-- Finally we have a brand new feature for 17, Custom entity signs! -->

---

## <solar-notification-unread-bold-duotone/> Custom entity signs

A brand new extension point!
Allows for custom signs on entities, just like the "pending changes" sign

![](/images/unpublished-changes-sign.png)

<!--
You might recognise "entity signs" from the "pending changes" sign in older versions of Umbraco.

Now we can add our own!
-->

---

## <solar-notification-unread-bold-duotone/> Custom entity signs

<<< @/snippets/custom-entity-signs-delete-locking.cs csharp


<!-- 

- You might have seen code like this, that blocks certain document types from being deleted
- Nice to show this in the backoffice before trying to delete an item

 -->


---

## <solar-notification-unread-bold-duotone/> Custom entity signs

````md magic-move[My.UmbracoBackofficeExtensions\Client\src\manifests.ts]
<<< @/snippets/custom-entity-signs.ts#snippet-1 ts

<<< @/snippets/custom-entity-signs.ts#snippet-2 ts{9-23|10-11|12-13|14|16|17-21|15|9-23}

````

<!--
- Back in the manifests file
- [Click] Adding a new manifest [Click] of type `enitiySign` and kind `icon`
- [Click] Giving it a name and alias
- [Click] Specifying which enties can show this sign, documents
- [Click] Can only show 2 icons at once, so the weighting matters. `-1000` means this one is really unimportant!
- [Click] Specifying what the sign looks like
- [Click] Finally we specify what entities should be "flagged" with to make the sign show
- [Click] You'll notice we don't link to a TS file!
- No JS, just C# for the first time in this presentation! 🤯
-->

---

````md magic-move[My.UmbracoBackofficeExtensions\LockedDocumentFlagProvider.cs ~i-vscode-icons:file-type-csharp~]
<<< @/snippets/custom-entity-signs-full.cs#snippet-1 csharp{*|1|3|4-7|9-19|21-24}

<<< @/snippets/custom-entity-signs-full.cs#snippet-2 csharp{6-23|22}

````

<!--
- [Click] Created a C# class that implements `IFlagProvider`
- Also have to register this in a composer
- [Click] Created an alias for out flag (as in the manifest)
- [Click] Specified which entity types can be flagged - documents in our case
- [Click] Then implemented the `PopulateFlags` method
- Just looping through each item and checking it in the `ShouldAddFlag` method.
- [Click] Lets look at the `ShouldAddFlag` method
- [Click] We just get the ID of the document type
- [Click] and check it against our list of IDs we don't allow being deleted
-->

---
layout: image
image: /images/locked-signs.png
backgroundSize: contain
---

<!--
- Can see Home and Error are locked
- Features and Error have unpublished changes
- Error has both, sorted by priority
-->

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

<!--
Now we can add all these tools to our backoffice-customisation toolkit!
-->

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

<!--
- Along with the tools we already have
- largely unchanged in recent versions.
-->

---
layout: bio
image: /images/Unicorn-transparent.png
name: Thank you
---

- <logos-mastodon-icon /> [@joe@umbraco&#8239;community.social](https://umbracocommunity.social/joe)
- <logos-bluesky /> [@joe.gl](https://bsky.app/profile/joe.gl)
- <logos-linkedin-icon /> https://linkedin.com/in/glombek/

<br/>

- <solar-global-bold-duotone /> https://joe.gl/ombek
- <solar-link-square-bold-duotone/> https://joe.gl/ombek/links/t4s
-  🔜 [24days.in/umbraco-cms](https://24days.in/umbraco-cms/2025/template-for-success/) <!--<solar-calendar-bold-duotone/>-->