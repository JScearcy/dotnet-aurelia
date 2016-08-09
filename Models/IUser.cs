
namespace WebApplication.Models
{
    public interface IUser
    {
        string login { get; set; }
        string followers_url { get; set; }
    }
}