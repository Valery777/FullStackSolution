using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Moq;
using NextJS1.Application.Common;
using NextJS1.Controllers;
using NextJS1.Domain.Entities;
using NextJS1.Infrastructure.Persistence;
using Xunit;

namespace NextJS1.tests.UnitTest.Controllers
{
    public class ProductsControllerTests
    {
        #region Helper Methods

        private (ProductsController controller, AppDbContext context) CreateController(string dbName)
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: dbName)
                .Options;

            var context = new AppDbContext(options);
            var logger = new Mock<ILogger<ProductsController>>();

            var controller = new ProductsController(context, logger.Object);

            return (controller, context);
        }

        #endregion

        #region GetAll Tests

        [Fact]
        public async Task GetAll_ReturnsProducts()
        {
            var (controller, context) = CreateController("GetAllDb");

            context.Products.Add(new Product { id = 1, name = "Test" });
            context.Products.Add(new Product { id = 2, name = "Test2" });
            await context.SaveChangesAsync();

            var result = await controller.GetAll();

            var ok = Assert.IsType<OkObjectResult>(result);
            var products = Assert.IsAssignableFrom<IEnumerable<ProductDto>>(ok.Value);

            Assert.Equal(2, products.Count());
        }

        #endregion

        #region Create Tests

        [Fact]
        public async Task Create_AddsProduct_ReturnsDto()
        {
            var (controller, context) = CreateController("CreateDb");

            var product = new Product
            {
                id = 1,
                name = "Sumsung",
                price = 1999,
                category = "Phone",
                type = "Galaxy",
                quantity = 10,
                description = "Manufactured in 2021",
                createDate = DateTime.UtcNow,
                updateDate = DateTime.UtcNow
            };

            var result = await controller.Create(product);

            var ok = Assert.IsType<OkObjectResult>(result);
            var dto = Assert.IsType<ProductDto>(ok.Value);

            Assert.Equal("Sumsung", dto.name);
            Assert.Equal(1, context.Products.Count());
        }

        #endregion

        #region Delete Tests

        [Fact]
        public async Task DeleteProduct_NotFound_WhenMissing()
        {
            var (controller, _) = CreateController("DeleteMissingDb");

            var result = await controller.DeleteProduct(999);

            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task DeleteProduct_RemovesProduct()
        {
            var (controller, context) = CreateController("DeleteDb");

            context.Products.Add(new Product { id = 1, name = "ToDelete" });
            await context.SaveChangesAsync();

            var result = await controller.DeleteProduct(1);

            var ok = Assert.IsType<OkObjectResult>(result);
            Assert.Empty(context.Products);
        }

        #endregion

        #region Update Tests

        [Fact]
        public async Task UpdateProduct_UpdatesFields()
        {
            var (controller, context) = CreateController("UpdateDb");

            var product = new Product
            {
                id = 1,
                name = "Apple",
                price = 2999,
                category = "Phone",
                type = "Iphone 17e",
                quantity = 10,
                description = "Manufactured in 2026",
                createDate = DateTime.UtcNow,
                updateDate = DateTime.UtcNow
            };

            context.Products.Add(product);
            await context.SaveChangesAsync();

            var updated = new Product
            {
                name = "Updated",
                price = 2000
            };

            var result = await controller.UpdateProduct(1, updated);

            var ok = Assert.IsType<OkObjectResult>(result);
            var dto = Assert.IsType<ProductDto>(ok.Value);

            Assert.Equal("Updated", dto.name);
            Assert.Equal(2000, dto.price);
        }

        #endregion
    }
}