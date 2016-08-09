using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace WebApplication.Services
{
    public class GithubApiService : IApiService
    {
        private const string baseAddress = "https://api.github.com/";
        public async Task<string> GetUser (string username)
        {
            string responseContent = null;
            using (var client = new HttpClient())
            {
                var queryString = String.Format("users/{0}", username);
                client.BaseAddress = new Uri(baseAddress);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.DefaultRequestHeaders.Add("User-Agent", "dotnet-aurelia");

                HttpResponseMessage response = await client.GetAsync(queryString);
                responseContent = await response.Content.ReadAsStringAsync();
            }
            return responseContent;
        }
    }
}