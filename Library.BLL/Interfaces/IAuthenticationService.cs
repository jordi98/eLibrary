using Library.BLL.DTO;
using Library.DAL.Models;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace Library.BLL.Interfaces
{
    public interface IAuthenticationService
    {
        Task<IdentityResult> RegisterUser(UserRegisterDTO userRegister);
        Task<ApplicationUser> FindByName(string name);
        Task<bool> CheckPassword(ApplicationUser user, string password);
    }
}
