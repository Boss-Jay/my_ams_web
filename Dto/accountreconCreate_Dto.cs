namespace Ams_Web.Dto
{
    public class accountreconCreate_Dto
    {
        public int BranchId { get; set; }

        public DateTime? Date { get; set; }

        public int Year { get; set; }

        public int Month { get; set; }

        public uint SrcDoc { get; set; }

        public string? SrcNum { get; set; }

        public uint SupprtDoc { get; set; }

        public string? SupprtNum { get; set; }

        public DateTime? InvoiceDate { get; set; }

        public uint PayMode { get; set; }

        public string? Tin { get; set; }

        public int? SupplierId { get; set; }

        public int CoaId { get; set; }

        public string? TranspoMode { get; set; }

        public string? GoodService { get; set; }

        public int? Atcid { get; set; }

        public decimal? TaxRate { get; set; }

        public int? WtaxPassOn { get; set; }

        public int? NoTaxWithHeld { get; set; }

        public int? Advice { get; set; }

        public int? Amortized { get; set; }

        public decimal? ExemptAmt { get; set; }

        public decimal? GrossAmt { get; set; }

        public decimal? VatClaim { get; set; }

        public decimal? VatOthersAmt { get; set; }

        public decimal? VatAmt { get; set; }

        public decimal? PassOnAmt { get; set; }

        public decimal? TaxableAmt { get; set; }

        public decimal? TaxHeld { get; set; }

        public decimal? Total { get; set; }

        public decimal? BranchShareAmt { get; set; }

        public uint AttachId { get; set; }

        public string? Remarks { get; set; }

        public int UserId { get; set; }

        public int UserBranchId { get; set; }

        /// <summary>
        /// 1 = BoD 2 = Officer 3= PCF 
        /// </summary>
        public int? BodOffcrPcf { get; set; }

        public int? BodoffcrId { get; set; }
    }
}
