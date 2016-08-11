using System.Threading.Tasks;
using WebApplication.Models;

namespace WebApplication.Services
{
    public interface IApiService 
    {
        Task<ApiResponseModel> GetUser (string username);
        Task<ApiResponseModel> GetFollowers (string username);
        Task<ApiResponseModel> GetFollowing (string username);
        Task<ApiResponseModel> GetGists (string username);
    }
}