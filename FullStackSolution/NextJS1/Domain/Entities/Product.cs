using NextJS1.Application.Common;

namespace NextJS1.Domain.Entities
{
    public class Product
    {
        public int id { get; set; }
        public string name { get; set; } = String.Empty;
        public decimal price { get; set; }
        public string category { get; set; } = String.Empty;
        public string type { get; set; }= String.Empty; 
        public int quantity { get; set; }  
        public string description { get; set; } = String.Empty;
        public DateTime createDate { get; set; } 
        public DateTime updateDate { get; set; }    

    }
    public class ProductTest
    {
        public int id { get; set; }
        public string name { get; set; } = String.Empty;
        public decimal price { get; set; }
        public string category { get; set; } = String.Empty;
        public string type { get; set; } = String.Empty;
        public int quantity { get; set; }
        public string description { get; set; } = String.Empty;
        public string createDate { get; set; }
        public string updateDate { get; set; }

    }
}

