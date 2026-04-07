using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NextJS1.Application.Common;
using NextJS1.Domain.Entities;
using NextJS1.Infrastructure.Persistence;
using static NextJS1.Controllers.ChatController;

namespace NextJS1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        #region Fields & Constructor

        private readonly AppDbContext _context;
        private readonly ILogger<ProductsController> _logger;

        public ProductsController(AppDbContext context, ILogger<ProductsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        #endregion

        #region Get All Products

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                _logger.LogInformation("GetAll products started.");

                var products = await _context.Products
                    .Select(p => new ProductDto(
                        p.id,
                        p.name,
                        p.price,
                        p.type,
                        p.description,
                        p.quantity,
                        p.category,
                        p.createDate,
                        p.updateDate
                    ))
                    .ToListAsync();

                return Ok(products);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "GetAll products failed.");
                return StatusCode(500, new ErrorResponse(ex.Message));
            }
        }

        #endregion

        #region Create Product

        [HttpPost]
        public async Task<IActionResult> Create(Product product)
        {
            try
            {
                _logger.LogInformation("Create product started.");

                _context.Products.Add(product);
                await _context.SaveChangesAsync();

                var dto = new ProductDto(
                    product.id,
                    product.name,
                    product.price,
                    product.type,
                    product.description,
                    product.quantity,
                    product.category,
                    product.createDate,
                    product.updateDate
                );

                return Ok(dto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Create product failed.");
                return StatusCode(500, new ErrorResponse(ex.Message));
            }
        }

        #endregion

        #region Delete Product

        [HttpDelete("{id}")]
        //[Authorize]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            try
            {
                _logger.LogInformation("Delete product started.");

                var product = await _context.Products.FindAsync(id);
                if (product == null)
                    return NotFound();

                _context.Products.Remove(product);
                await _context.SaveChangesAsync();

                return Ok(new DeleteProductResponse("Product deleted", id));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Delete product failed.");
                return StatusCode(500, new ErrorResponse(ex.Message));
            }
        }

        #endregion

        #region Update Product

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] Product updatedProduct)
        {
            try
            {
                _logger.LogInformation("Update product started.");

                var product = await _context.Products.FindAsync(id);
                if (product == null)
                    return NotFound();

                product.name = updatedProduct.name;
                product.price = updatedProduct.price;
                product.type = updatedProduct.type;
                product.description = updatedProduct.description;
                product.quantity = updatedProduct.quantity;
                product.category = updatedProduct.category;
                product.updateDate = DateTime.Now;

                await _context.SaveChangesAsync();

                var dto = new ProductDto(
                    product.id,
                    product.name,
                    product.price,
                    product.type,
                    product.description,
                    product.quantity,
                    product.category,
                    product.createDate,
                    product.updateDate
                );

                return Ok(dto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Update product failed.");
                return StatusCode(500, new ErrorResponse(ex.Message));
            }
        }

        #endregion
    }
}