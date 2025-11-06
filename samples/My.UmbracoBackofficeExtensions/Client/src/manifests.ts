import { UMB_DOCUMENT_ENTITY_TYPE } from '@umbraco-cms/backoffice/document';

export const manifests: Array<UmbExtensionManifest | any> = [
  //TODO: Add your extension manifests here
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
  },
  {
    type: 'blockEditorCustomView',
    alias: 'My.HiddenBlockEditorView',
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
    },
  }
];