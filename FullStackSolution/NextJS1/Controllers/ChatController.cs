using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using NextJS1.Application.Common;
using NextJS1.Infrastructure.api.ml;
using Serilog;

namespace NextJS1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        #region Fields & Constructor

        private readonly ILogger<ChatController> _logger;
        private readonly IOptions<LocalSettings> _options;

        public ChatController(IOptions<LocalSettings> options, ILogger<ChatController> logger)
        {
            _options = options;
            _logger = logger;
        }

        #endregion

        #region Chat Endpoint

        [HttpPost("chat")]
        public async Task<IActionResult> Chat([FromBody] ChatRequest req)
        {
            try
            {
                _logger.LogInformation("ChatController Chat started.");

                var llm = new LocalLlmClient(_options, _logger);

                string prompt =
                    $"You are a helpful housing assistant. Answer clearly and briefly. User: {req.Message}";

                var reply = await llm.AskAsync(prompt);

                return Ok(new ChatResponse(reply));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "ChatController Chat failed.");
                return StatusCode(500, new { error = ex.Message });
            }
        }

        #endregion

        #region DTOs

        public class ChatRequest
        {
            public string Message { get; set; }
        }

        public record ChatResponse(string Reply);

        public record ErrorResponse(string Error);

        #endregion
    }
}