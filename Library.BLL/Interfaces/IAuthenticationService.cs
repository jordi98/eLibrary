using Library.BLL.DTO;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace Library.BLL.Interfaces
{
    public interface IAuthenticationService
    {
        Task<IdentityResult> RegisterUser(UserRegisterDTO userRegister);
    }
}
