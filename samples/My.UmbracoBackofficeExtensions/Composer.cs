using My.UmbracoBackofficeExtensions.Notifications;
using System;
using System.Collections.Generic;
using System.Text;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.Notifications;

namespace My.UmbracoBackofficeExtensions
{
    public class Composer : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {
            builder.SignProviders()
                .Append<LockedDocumentFlagProvider>();

            builder.AddNotificationHandler<ContentMovingToRecycleBinNotification, LockedDocumentContentMovingToRecycleBinNotificationHandler>();
        }
    }
}
