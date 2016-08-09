using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApplication.Services;

namespace WebApplication.Controllers
{
    [Route("api/[controller]")]
    public class GithubController : Controller
    {
        private IApiService _githubService;
        public GithubController (IApiService githubSvc)
        {
            _githubService = githubSvc;
        }

        [HttpGet("{username}")]
        public async Task<JsonResult> Get (string username)
        {
            var serviceResults = await _githubService.GetUser(username);
            var finalResults = new Dictionary<string, string>();
            finalResults.Add("data", username);
            finalResults.Add("results", serviceResults);

            return new JsonResult(finalResults);
        }
    }
}