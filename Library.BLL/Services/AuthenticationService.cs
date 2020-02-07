using System.Threading.Tasks;
using Library.BLL.DTO;
using Library.BLL.Interfaces;
using Library.DAL.Models;
using Microsoft.AspNetCore.Identity;

namespace Library.BLL.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        public AuthenticationService(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }
        public async Task<ApplicationUser> FindByName(string name)
        {
            var user = await _userManager.FindByNameAsync(name);
            return user;
        }
        public async Task<bool> CheckPassword(ApplicationUser user, string password)
        {
            if (!await _userManager.CheckPasswordAsync(user, password))
                return false;
            return true;
        }
        public async Task<IdentityResult> RegisterUser(UserRegisterDTO userRegister)
        {
            ApplicationUser user = new ApplicationUser()
            {
                Email = userRegister.Email,
                UserName = userRegister.Name,
                PhoneNumber = userRegister.PhoneNumber
            };

            IdentityResult result = await _userManager.CreateAsync(user, userRegister.Password);

            if (result.Succeeded)
            {
                result = await _userManager.AddToRoleAsync(user, "User");
            }

            return result;
        }
    }
}
