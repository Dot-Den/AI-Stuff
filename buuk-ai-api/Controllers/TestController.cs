using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace AIReportingAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController : ControllerBase
    {
        private readonly SharePointService _sharePointService;

        public TestController(SharePointService sharePointService)
        {
            _sharePointService = sharePointService;
        }

        [HttpGet("test-sharepoint")]
        public async Task<IActionResult> TestSharePointCall()
        {
            await _sharePointService.TestSharePointCallAsync();
            return Ok("SharePoint call successful. Check the console for output.");
        }
    }
}