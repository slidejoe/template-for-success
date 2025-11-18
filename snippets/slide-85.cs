// #region snippet-1
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
// #endregion snippet-1

// #region snippet-2
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
// #endregion snippet-2
