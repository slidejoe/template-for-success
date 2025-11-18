// #region snippet-1
export const manifests: Array<UmbExtensionManifest> = [
  // ...
    name: 'Hidden Block Editor View',
    element: () => import('./hidden-block.element'),
    forBlockEditor: 'block-list'
  }
];
// #endregion snippet-1

// #region snippet-2
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
// #endregion snippet-2
