using Umbraco.Cms.Core;
using Umbraco.Cms.Api.Management.Services.Flags;
using Umbraco.Cms.Api.Management.ViewModels;
using Umbraco.Cms.Api.Management.ViewModels.Document.Collection;
using Umbraco.Cms.Api.Management.ViewModels.Document.Item;
using Umbraco.Cms.Api.Management.ViewModels.Tree;
using My.UmbracoBackofficeExtensions.Notifications;

namespace My.UmbracoBackofficeExtensions
{
    public class LockedDocumentFlagProvider : IFlagProvider
    {
        private const string Alias = Constants.Conventions.Flags.Prefix + "My.Locked";

        // Indicate that this flag provider only provides flags for documents.
        public bool CanProvideFlags<TItem>()
            where TItem : IHasFlags =>
            typeof(TItem) == typeof(DocumentTreeItemResponseModel) ||
            typeof(TItem) == typeof(DocumentCollectionResponseModel) ||
            typeof(TItem) == typeof(DocumentItemResponseModel);

        public Task PopulateFlagsAsync<TItem>(IEnumerable<TItem> itemViewModels)
            where TItem : IHasFlags
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
                default:
                    return false;
            }

            return LockedDocumentContentMovingToRecycleBinNotificationHandler.LOCKED_IDS.Contains(id);
        }
    }
}
