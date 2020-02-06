using Library.BLL.DTO;
using Library.BLL.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace TestLibraryNewVersion.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;
        public AuthController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        // POST: api/Auth/register
        [HttpPost]
        [Route("register")]
        public async Task<object> PostUser([FromBody]UserRegisterDTO userRegister)
        {
            IdentityResult result = await _authenticationService.RegisterUser(userRegister);
            return Ok(result);
        }
    }
}