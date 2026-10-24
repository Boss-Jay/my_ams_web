namespace Ams_Web.Dto
{
    public class accountreconSearch_Dto
    {
        public uint Id { get; set; }

        public int BranchId { get; set; }
        public string? BranchDesc { get; set; }

        public DateTime? Date { get; set; }

        public int Year { get; set; }

        public int Month { get; set; }

        public DateTime? InvoiceDate { get; set; }
        public string? Tin { get; set; }
        public int? SupplierId { get; set; }
        public string? SupplierName { get; set; }
        public string? AccounTitle { get; set; }
        public decimal? ExemptAmt { get; set; } 

        public decimal? GrossAmt { get; set; }

        public decimal? Total { get; set; }

        /// <summary>
        /// 1 = BoD 2 = Officer 3= PCF 
        /// </summary>
        public int? BodOffcrPcf { get; set; }

        public int? BodoffcrId { get; set; }
        public string? BodoffcrName { get; set; }
    }
}
