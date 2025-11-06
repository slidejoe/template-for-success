using System;
using System.Collections.Generic;
using System.Text;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Models.Entities;
using Umbraco.Cms.Core.Notifications;

namespace My.UmbracoBackofficeExtensions.Notifications
{
    public class LockedDocumentContentMovingToRecycleBinNotificationHandler : INotificationHandler<ContentMovingToRecycleBinNotification>
    {
        public static string[] LOCKED_ALIASES = ["home", "error"];
        public static Guid[] LOCKED_IDS = [ Guid.Parse("a95360e8-ff04-40b1-8f46-7aa4b5983096"), Guid.Parse("9db112c5-c2ea-441d-8bd4-6daf522aa2b6")];
        public void Handle(ContentMovingToRecycleBinNotification notification)
        {
            foreach (var item in notification.MoveInfoCollection)
            {
                if (Array.Exists(LOCKED_ALIASES, alias => alias.Equals(item.Entity.ContentType.Alias, StringComparison.OrdinalIgnoreCase)))
                {
                    notification.CancelOperation(new EventMessage($"{item.Entity.Name} cannot be trashed", $"The content item '{item.Entity.Name}' is of type '{item.Entity.ContentType.Name}' which cannot be trashed.", EventMessageType.Error));
                }
            }
        }
    }
}
