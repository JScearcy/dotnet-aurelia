using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
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

        public async Task<JsonResult> SingleUser (string username)
        {
            var result = new JsonResult("");
            var content = await _githubService.GetUser(username);
            if (content.StatusCode == "OK") 
            {
                result.Value = content.Data;
            } 
            else 
            {
                result.Value = "Error";
                result.StatusCode = 400;
            }
            return result;

        }

        public async Task<JsonResult> Followers (string username)
        {
            var result = new JsonResult("");
            var content = await _githubService.GetFollowers(username);
            if (content.StatusCode == "OK") 
            {
                result.Value = content.Data;
            } 
            else 
            {
                result.Value = "Error";
                result.StatusCode = 400;
            }
            return result;
        }
    }
}