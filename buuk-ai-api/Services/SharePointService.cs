using System.Net;
using System.Net.Http;
using AIReportingAPI.Models.SharePointData;

namespace AIReportingAPI.Services
{
    public class SharePointService
    {
    public async Task<List<SharePointList>> GetSHEQAuditSharePointList()
    {
        using var client = httpClientFactory.CreateClient(SharePointApiAppSettings.SharePointApiHttpClientName);

        var url = "http://bukwlptstv05:50049/api/Lists/SHEQ%20Audit";

        var log = new ClientResponseLog("SharePoint Lists for SHEQ Audit");
        log.Url = url;

        try
        {
            var httpResponse = await client.GetAsync(url);

            log.StatusCode = httpResponse.StatusCode.ToString();
            log.ReasonPhrase = httpResponse.ReasonPhrase ?? "[unknown]";
            if (httpResponse.StatusCode != HttpStatusCode.OK)
                throw new Exception($"Failed to load lists from {request.SiteName} ({httpResponse.ReasonPhrase ?? httpResponse.StatusCode.ToString()}).", new { url });

            var stringResponse = await httpResponse.Content.ReadAsStringAsync();
            if (stringResponse == "")
                throw new Exception("SharePoint lists API returned empty result.", new { url });

            var lists = JsonSerializer.Deserialize<List<SharePointList>>(stringResponse)!;
            return lists;
        }
        catch
        {
            clientResponseLogger.LogResponse(log);
            log = null;
            throw;
        }
        finally
        {
            // Doesn't log all requests as, if configured correctly will be OK with results or empty results
            //if (log != null)
            //{
            //    clientResponseLogger.LogResponse(log);
            //}
        }
    }
    }
}