using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApplication.Models;
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
            var content = await _githubService.GetUser(username);

            return GetJsonResult(content);

        }

        public async Task<JsonResult> Followers (string username)
        {
            var content = await _githubService.GetFollowers(username);

            return GetJsonResult(content);
        }

        public async Task<JsonResult> Following (string username) 
        {
            var content = await _githubService.GetFollowing(username);

            return GetJsonResult(content);
        }

        private JsonResult GetJsonResult(ApiResponseModel response)
        {
            var result = new JsonResult("");

            if (response.StatusCode == "OK") 
            {
                result.Value = response.Data;
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