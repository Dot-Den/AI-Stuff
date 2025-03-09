using Microsoft.Graph;
using Microsoft.Identity.Client;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace AIReportingAPI.Services
{
    public class SharePointService
    {
        private readonly GraphServiceClient _graphClient;

        public SharePointService(string clientId, string tenantId, string clientSecret)
        {
            var confidentialClient = ConfidentialClientApplicationBuilder
                .Create(clientId)
                .WithTenantId(tenantId)
                .WithClientSecret(clientSecret)
                .Build();

            var authProvider = new DelegateAuthenticationProvider(async (requestMessage) =>
            {
                var authResult = await confidentialClient.AcquireTokenForClient(new[] { "https://graph.microsoft.com/.default" }).ExecuteAsync();
                requestMessage.Headers.Authorization = new AuthenticationHeaderValue("Bearer", authResult.AccessToken);
            });

            _graphClient = new GraphServiceClient(authProvider);
        }

        // Test method to fetch SharePoint data
        public async Task TestSharePointCallAsync()
        {
            var siteId = "buuk.sharepoint.com,sheq,SHEQAUDIT"; // Replace with actual site ID
            var listId = "Safety Inspection Form Archive"; // Replace with actual list ID
            
            var items = await _graphClient.Sites["{site-id}"]
                .Lists["{list-id}"]
                .Items
                .Request()
                .GetAsync();

            foreach (var item in listItems)
            {
                Console.WriteLine(item.Fields.AdditionalData["Title"]);
            }
        }
    }
}