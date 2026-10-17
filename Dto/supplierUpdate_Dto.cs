using System.ComponentModel.DataAnnotations;

namespace Ams_Web.Dto
{
    public class supplierUpdate_Dto
    {
        public int? Id { get; set; }
        [Display(Name = "Type")]
        public int? Type { get; set; }
        [Display(Name = "T.I.N")]
        public string? Tin { get; set; }
        [Display(Name = "CODE")]
        public string? BranchCode { get; set; }
        [Display(Name = "Last Name")]
        public string? Lastname { get; set; }
        [Display(Name = "First Name")]
        public string? Firstname { get; set; }
        [Display(Name = "M.I")]
        public string? MiddleInitial { get; set; }
        [Display(Name = "Suffix")]
        public string? Suffix { get; set; }
        [Display(Name = "Corporation")]
        public string? Corporation { get; set; }
        [Display(Name = "Address")]
        public string? Address { get; set; }
        [Display(Name = "Zip Code")]
        public int? ZipCode { get; set; }
        [Display(Name = "Trade Name")]
        public string? Tradename { get; set; }
        [Display(Name = "Tax Registered")]
        public int? TaxReg { get; set; }
        public int? EditBy { get; set; }

    }
}
