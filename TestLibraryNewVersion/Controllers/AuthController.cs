using Library.BLL.DTO;
using Library.BLL.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
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
        public async Task<object> Register([FromBody]UserRegisterDTO userRegister)
        {
            IdentityResult result = await _authenticationService.RegisterUser(userRegister);
            return Ok(result);
        }

        //POST: api/Auth/login
        [HttpPost]
        [Route("login")]
        public async Task<ActionResult> Login([FromBody]UserLoginDTO userLogin)
        {
            var user = await _authenticationService.FindByName(userLogin.Username);

            if (user == null)
            {
                return BadRequest(new { message = "Username or password is incorrect!" });
            }

            if (await _authenticationService.CheckPassword(user, userLogin.Password))
            {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("MySp$cialPassw0rd"));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    issuer: "https://localhost:44386",
                    audience: "https://localhost:44386",
                    claims: new List<Claim>(),
                    expires: DateTime.Now.AddMinutes(10),
                    signingCredentials: signinCredentials
                );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

                return Ok(new
                {
                    Token = tokenString,
                    ExpiresIn = token.ValidTo,
                    Username = user.UserName
                });
            }

            return Unauthorized();
        }
    }
}