using Microsoft.AspNetCore.Mvc;
using NextJS1.Application.Common.Interfaces;
using NextJS1.Infrastructure.Auth;

namespace NextJS1.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        #region Fields & Constructor

        private readonly IJwtTokenGenerator _tokenGenerator;

        public AuthController(IJwtTokenGenerator tokenGenerator)
        {
            _tokenGenerator = tokenGenerator;
        }

        #endregion

        #region Login Endpoint

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            // TODO: Replace with real DB validation
            if (request.Username != "admin" || request.Password != "password")
                return Unauthorized();

            var token = _tokenGenerator.GenerateToken("1", request.Username);

            return Ok(new { token });
        }

        #endregion
    }
}