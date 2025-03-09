using ClosedXML.Excel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Graph;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Threading.Tasks;

namespace AIReportingAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SHEQAuditController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly SharePointService _sharePointService;

        public SHEQAuditController(HttpClient httpClient, SharePointService sharePointService)
        {
            _httpClient = httpClient;
            _sharePointService = sharePointService;
        }

        [HttpPost("process")]
        public async Task<IActionResult> ProcessFile()
        {
            // Fetch SharePoint data
            var siteId = "buuk.sharepoint.com,sheq,SHEQAUDIT"; // Replace with actual site ID
            var listId = "Safety Inspection Form Archive"; // Replace with actual list ID
            var listItems = await _sharePointService.GetSharePointListItemsAsync(siteId, listId);

            // Prepare data for AI processing
            var inputData = string.Join("\n", listItems.Select(item => item.Fields.AdditionalData["Title"].ToString()));

            // Call Hugging Face API for NLP and data extraction
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "YOUR_HUGGING_FACE_API_KEY");
            var nlpResponse = await _httpClient.PostAsJsonAsync("https://api-inference.huggingface.co/models/YOUR_MODEL", new { inputs = inputData });
            var nlpResult = await nlpResponse.Content.ReadFromJsonAsync<object>();

            // Generate Excel file
            using var workbook = new XLWorkbook();
            var worksheet = workbook.Worksheets.Add("Report");
            worksheet.Cell(1, 1).Value = "NLP Result";
            worksheet.Cell(2, 1).Value = nlpResult.ToString();

            using var stream = new MemoryStream();
            workbook.SaveAs(stream);
            stream.Position = 0;

            return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "report.xlsx");
        }
    }
}