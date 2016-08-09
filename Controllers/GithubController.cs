using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApplication.Services;

namespace WebApplication.Controllers
{
    [Route("api/[controller]/[action]")]
    public class GithubController : Controller
    {
        private IApiService _githubService;
        public GithubController (IApiService githubSvc)
        {
            _githubService = githubSvc;
        }

        public async Task<string> SingleUser (string username)
        {
            var content = await _githubService.GetUser(username);

            return content;
        }

        public async Task<string> Followers (string username)
        {
            var content = await _githubService.GetFollowers(username);

            return content;
        }
    }
}