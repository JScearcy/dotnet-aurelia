
using System.Net.Http;

namespace WebApplication.Models
{
    public class ApiResponseModel
    {
        public string Data { get; }
        public bool Success { get; }

        public string StatusCode { get; }

        public ApiResponseModel (bool success, string statusCode, string data)
        {
          Data = data;
          StatusCode = statusCode;
          Success = success;
        }
    }
}