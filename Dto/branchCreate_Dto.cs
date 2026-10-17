using System.ComponentModel.DataAnnotations;

namespace Ams_Web.Dto
{
    public class branchCreate_Dto
    {
        [Display(Name = "Company")]
        public int? CompanyId { get; set; }
        [Display(Name = "Branch Name")]
        public string? Name { get; set; }
        [Display(Name = "Address")]
        public string? Address { get; set; }
        [Display(Name = "Zipcode")]
        public int? Zipcode { get; set; }
        [Display(Name = "Manager")]
        public int? ManagerId { get; set; }
        [Display(Name = "Contact #1")]
        public string? Contact1 { get; set; }
        [Display(Name = "Contact #2")]
        public string? Contact2 { get; set; }
        [Display(Name = "T.I.N")]
        public string? Tin { get; set; }
        [Display(Name = "CODE")]
        public string? Code { get; set; }
        [Display(Name = "OCN")]
        public string? Ocn { get; set; }
        [Display(Name = "Email #1")]
        public string? Email1 { get; set; }
        [Display(Name = "Email #2")]
        public string? Email2 { get; set; }
        [Display(Name = "Accountant")]
        public int? Accountant { get; set; }
        [Display(Name = "RDO")]
        public string? Rdo { get; set; }
    }
}
