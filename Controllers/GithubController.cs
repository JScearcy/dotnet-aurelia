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
        public async Task<string> Get (string username)
        {
            var content = await _githubService.GetUser(username);

            return content;
        }
    }
}