using System.Net.Http;
using System.Threading.Tasks;

namespace WebApplication.Services
{
    public interface IApiService 
    {
        Task<string> GetUser (string username);
    }
}