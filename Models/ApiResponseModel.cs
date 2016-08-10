namespace WebApplication.Models
{
    public class ApiResponseModel
    {
        public dynamic Data { get; }
        public bool Success { get; }

        public string StatusCode { get; }

        public ApiResponseModel (bool success, string statusCode, dynamic data)
        {
          Data = data;
          StatusCode = statusCode;
          Success = success;
        }
    }
}