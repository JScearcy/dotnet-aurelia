using System;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Newtonsoft.Json;
using WebApplication.Models;

namespace WebApplication.Services
{
    public class GithubApiService : IApiService
    {
        private const string baseAddress = "https://api.github.com/";
        public async Task<ApiResponseModel> GetUser (string username)
        {
            ApiResponseModel responseModel;
            using (var client = CreateClientObject())
            {
                var queryString = $"users/{username}";

                HttpResponseMessage response = await client.GetAsync(queryString);
                responseModel = await TransformResponse(response);
            }
            return responseModel;
        }

        public async Task<ApiResponseModel> GetFollowers (string username)
        {
            ApiResponseModel responseModel;
            using (var client = CreateClientObject())
            {
                var queryString = $"users/{username}/followers";

                HttpResponseMessage response = await client.GetAsync(queryString);
                responseModel = await TransformResponse(response);
            }
            return responseModel;
        }

        public async Task<ApiResponseModel> GetFollowing (string username)
        {
            ApiResponseModel responseModel;
            using (var client = CreateClientObject())
            {
                var queryString = $"users/{username}/following";

                HttpResponseMessage response = await client.GetAsync(queryString);
                responseModel = await TransformResponse(response);
            }
            return responseModel;
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

        private async Task<ApiResponseModel> TransformResponse(HttpResponseMessage response)
        {       
            Stream resStream = await response.Content.ReadAsStreamAsync();
            string statusCode = response.StatusCode.ToString();
            bool success = statusCode == "OK";
            dynamic responseContent = DeserializeFromStream(resStream);

            return new ApiResponseModel(success, statusCode, responseContent);
        }

        private dynamic DeserializeFromStream(Stream stream)
        {
            var serializer = new JsonSerializer();

            using (var sr = new StreamReader(stream))
            using (var jsonTextReader = new JsonTextReader(sr))
            {
                return serializer.Deserialize<dynamic>(jsonTextReader);
            }
        }
    }
}