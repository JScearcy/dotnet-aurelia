using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using WebApplication.Models;

namespace WebApplication.Services
{
    public class GithubApiService : IApiService
    {
        private const string baseAddress = "https://api.github.com/";
        public async Task<ApiResponseModel> GetUser (string username)
        {
            string responseContent = null;
            string statusCode = "";
            using (var client = CreateClientObject())
            {
                var queryString = $"users/{username}";

                HttpResponseMessage response = await client.GetAsync(queryString);
                statusCode = response.StatusCode.ToString();
                responseContent = await response.Content.ReadAsStringAsync();
            }
            return new ApiResponseModel(true, statusCode, responseContent);
        }

        public async Task<ApiResponseModel> GetFollowers (string username)
        {
            string responseContent = null;
            string statusCode = "";
            using (var client = CreateClientObject())
            {
                var queryString = $"users/{username}/followers";

                HttpResponseMessage response = await client.GetAsync(queryString);
                statusCode = response.StatusCode.ToString();
                responseContent = await response.Content.ReadAsStringAsync();
            }
            return new ApiResponseModel(true, statusCode, responseContent);
        }

        private HttpClient CreateClientObject()
        {
            var client = new HttpClient();

            client.BaseAddress = new Uri(baseAddress);
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.Add("User-Agent", "dotnet-aurelia");

            return client;
        }
    }
}