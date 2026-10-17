namespace Ams_Web.Dto
{
    public class supplierList_Dto
    {
        public int? Id { get; set; }
        public int? Type { get; set; }
        public string? Tin { get; set; }
        public string? BranchCode { get; set; }
        public string? Lastname { get; set; }
        public string? Firstname { get; set; }
        public string? MiddleInitial { get; set; }

        public string? Suffix { get; set; }

        public DateTime? CreatedDate { get; set; }

        public string? Corporation { get; set; }

        public string? Address { get; set; }

        public int? ZipCode { get; set; }

        public string? Tradename { get; set; }

        public int? TaxReg { get; set; }
    }
}
