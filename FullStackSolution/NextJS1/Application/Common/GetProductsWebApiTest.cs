using NextJS1.Domain.Entities;
namespace NextJS1.Application.Common
{
    public class GetProductsWebApiTest
    {
        public List<ProductTest> GetProducts()
        {
            List<ProductTest> lstProducts = new List<ProductTest>
            {

                new ProductTest{ id = 1, name = "Dell", price = 1200,category="Laptop", type="Vostro 3530", quantity=14, description="Manufactured in 2024",createDate=DateTime.Now.ToUsFormat(),updateDate=DateTime.Now.ToUsFormat()},
                new ProductTest{ id = 2, name = "Apple",  price = 1800, category="Tablet", type="iPhone 17", quantity=16, description="Manufactured in 2025" ,createDate=DateTime.Now.ToUsFormat(),updateDate=DateTime.Now.ToUsFormat()},
                new ProductTest{ id = 3, name = "HP", price = 1780, category="Computer",type="Omnibook 5 AI", quantity= 22, description="Manufactured in 2026", createDate=DateTime.Now.ToUsFormat(),updateDate=DateTime.Now.ToUsFormat()},
                new ProductTest{ id = 4, name = "Dell", price = 1200,category="Laptop", type="Pro 14 Premium", quantity=27, description="Manufactured in 2023",createDate=DateTime.Now.ToUsFormat(),updateDate=DateTime.Now.ToUsFormat()},
                new ProductTest{ id = 5, name = "LG",  price = 950, category="Tablet", type="G Pad 5", quantity=15, description="Manufactured in 2022" ,createDate=DateTime.Now.ToUsFormat(),updateDate=DateTime.Now.ToUsFormat()},
                new ProductTest{ id = 6, name = "HP", price = 1550, category="Computer",type="Probook 4", quantity= 28, description="Manufactured in 2021", createDate=DateTime.Now.ToUsFormat(),updateDate=DateTime.Now.ToUsFormat()},
                new ProductTest{ id = 7, name = "Samsung", price = 1200,category="Laptop", type="Galaxy Book 4", quantity=13, description="Manufactured in 2020",createDate=DateTime.Now.ToUsFormat(),updateDate=DateTime.Now.ToUsFormat()},
                new ProductTest{ id = 8, name = "Apple",  price = 1500, category="Tablet", type="iPhone 17e", quantity=5, description="Manufactured in 2025" ,createDate=DateTime.Now.ToUsFormat(),updateDate=DateTime.Now.ToUsFormat()},
                new ProductTest{ id = 9, name = "HP", price = 1400, category="Computer",type="Pavilion", quantity= 9, description="Manufactured in 2024", createDate=DateTime.Now.ToUsFormat(),updateDate=DateTime.Now.ToUsFormat()},
                new ProductTest{ id = 10, name = "Dell", price = 1200,category="Laptop", type="Pro 16", quantity=12, description="Manufactured in 2023",createDate=DateTime.Now.ToUsFormat(),updateDate=DateTime.Now.ToUsFormat()},
                new ProductTest{ id = 11, name = "Lenovo",  price = 1690, category="Tablet", type="Legion 9", quantity=25, description="Manufactured in 2026" ,createDate=DateTime.Now.ToUsFormat(),updateDate=DateTime.Now.ToUsFormat()},
                new ProductTest{ id = 12, name = "HP", price = 1850, category="Computer",type="Envy *360", quantity= 31, description="Manufactured in 2020", createDate=DateTime.Now.ToUsFormat(),updateDate=DateTime.Now.ToUsFormat()},
                new ProductTest{ id = 13, name = "Pixcel", price = 1200,category="Phone", type="google pixcel 10", quantity=16, description="Manufactured in 2019",createDate=DateTime.Now.ToUsFormat(),updateDate=DateTime.Now.ToUsFormat()},
                new ProductTest{ id = 14, name = "Apple",  price = 2500, category="Phone", type="iPhone 16", quantity=41, description="Manufactured in 2024" ,createDate=DateTime.Now.ToUsFormat(),updateDate=DateTime.Now.ToUsFormat()},
                new ProductTest{ id = 15, name = "HP", price = 1900, category="Computer",type="240R G9", quantity= 35, description="Manufactured in 2023", createDate=DateTime.Now.ToUsFormat(),updateDate=DateTime.Now.ToUsFormat()},
                new ProductTest{ id = 16, name = "Dell", price = 1270,category="Laptop", type="Latitude 3420", quantity=18, description="Manufactured in 2022",createDate=DateTime.Now.ToUsFormat(),updateDate=DateTime.Now.ToUsFormat()},
                new ProductTest{ id = 17, name = "Apple",  price = 2550, category="Tablet", type="iPhone 17 Pro", quantity=27, description="Manufactured in 2025" ,createDate=DateTime.Now.ToUsFormat(),updateDate=DateTime.Now.ToUsFormat()},
                new ProductTest{ id = 18, name = "HP", price = 1750, category="Computer",type="G10 17", quantity= 34, description="Manufactured in 2022", createDate=DateTime.Now.ToUsFormat(),updateDate=DateTime.Now.ToUsFormat()},
                new ProductTest{ id = 19, name = "Dell", price = 2200,category="Laptop", type="Pro 14 Plus", quantity=55, description="Manufactured in 2023",createDate=DateTime.Now.ToUsFormat(),updateDate=DateTime.Now.ToUsFormat()},
                new ProductTest{ id = 20, name = "LG",  price = 800, category="Phone", type="V60", quantity=36, description="Manufactured in 2022" ,createDate=DateTime.Now.ToUsFormat(),updateDate=DateTime.Now.ToUsFormat()},
                new ProductTest{ id = 21, name = "HP", price = 1450, category="Computer",type="250 G9", quantity= 14, description="Manufactured in 2021", createDate=DateTime.Now.ToUsFormat(),updateDate=DateTime.Now.ToUsFormat()},
                new ProductTest{ id = 22, name = "Sumsung", price = 1200,category="Phone", type="Galaxy S26", quantity=15, description="Manufactured in 2025",createDate=DateTime.Now.ToUsFormat(),updateDate=DateTime.Now.ToUsFormat()},
                new ProductTest{ id = 23, name = "Apple",  price = 1350, category="Tablet", type="iPhone 16 Pro", quantity=17, description="Manufactured in 2026" ,createDate=DateTime.Now.ToUsFormat(),updateDate=DateTime.Now.ToUsFormat()},
                new ProductTest{ id = 24, name = "HP", price = 870, category="Computer",type="Probook 440", quantity= 19, description="Manufactured in 2024", createDate=DateTime.Now.ToUsFormat(),updateDate=DateTime.Now.ToUsFormat()},
                new ProductTest{ id = 25, name = "Lenovo", price = 1695, category="Computer",type="Think Book 14", quantity= 25, description="Manufactured in 2023", createDate=DateTime.Now.ToUsFormat(),updateDate=DateTime.Now.ToUsFormat()},
                new ProductTest{ id = 26, name = "Dell", price = 1200,category="Laptop", type="Pro 16 Max", quantity=38, description="Manufactured in 2022",createDate=DateTime.Now.ToUsFormat(),updateDate=DateTime.Now.ToUsFormat()},
                new ProductTest{ id = 27, name = "Apple",  price = 3265, category="Tablet", type="iPhone 17 Pro Max", quantity=22, description="Manufactured in 2021" ,createDate=DateTime.Now.ToUsFormat(),updateDate=DateTime.Now.ToUsFormat()},
                new ProductTest{ id = 28, name = "HP", price = 2850, category="Computer",type="Spectr3 *360", quantity= 34, description="Manufactured in 2023", createDate=DateTime.Now.ToUsFormat(),updateDate=DateTime.Now.ToUsFormat()},
                new ProductTest{ id = 29, name = "Dell", price = 1200,category="Laptop", type="Pro Max 18", quantity=54, description="New",createDate=DateTime.Now.ToUsFormat(),updateDate=DateTime.Now.ToUsFormat()},
                new ProductTest{ id = 30, name = "Lenovo",  price = 1255, category="Tablet", type="K10", quantity=65, description="New" ,createDate=DateTime.Now.ToUsFormat(),updateDate=DateTime.Now.ToUsFormat()},
                new ProductTest{ id = 31, name = "HP", price = 1500, category="Computer",type="Victus", quantity= 25, description="New", createDate=DateTime.Now.ToUsFormat(),updateDate=DateTime.Now.ToUsFormat()},
                
            };

            return lstProducts;
        }


    }
}
