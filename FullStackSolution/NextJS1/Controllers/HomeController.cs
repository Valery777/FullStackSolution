using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using NextJS1.Application.Common;
using Serilog;
using static NextJS1.Controllers.ChatController;

namespace NextJS1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        #region Fields & Constructor

        private readonly ILogger<ProductsController> _logger;

        public HomeController(ILogger<ProductsController> logger)
        {
            _logger = logger;
        }

        #endregion

        #region Get Products (Test Endpoint)

        [HttpGet]
        public IActionResult GetProducts()
        {
            try
            {
                _logger.LogInformation("GetProducts test started.");

                var products = new GetProductsWebApiTest().GetProducts();

                return Ok(products);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "GetProducts test failed.");
                return StatusCode(500, new ErrorResponse(ex.Message));
            }
        }

        #endregion
    }
}