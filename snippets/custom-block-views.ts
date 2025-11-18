// #region snippet-1
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
// #endregion snippet-1

// #region snippet-2
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
// #endregion snippet-2
