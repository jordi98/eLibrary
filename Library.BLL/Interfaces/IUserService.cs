using Library.DAL.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Library.BLL.Interfaces
{
    public interface IUserService
    {
        Task<List<ApplicationUser>> GetUsers();
        Task<List<ApplicationUser>> GetUser(string name);
        Task<ApplicationUser> GetUserById(string id);
        Task UpdateUser(ApplicationUser user);
        Task<ApplicationUser> CreateUser(ApplicationUser user);
        Task DeleteUser(ApplicationUser user);
    }
}
