using System.ComponentModel.DataAnnotations;

namespace Ams_Web.Dto
{
    public class teantsUpdate_Dto
    {
        public int Id { get; set; }
        [Display(Name = "Type")]
        public int? Type { get; set; }
        [Display(Name = "Corporation")]
        public string? Corporation { get; set; }
        [Display(Name = "Last Name")]
        public string? Lastname { get; set; }
        [Display(Name = "First Name")]
        public string? Firstname { get; set; }
        [Display(Name = "Middle Name")]
        public string? Middlename { get; set; }
        [Display(Name = "T.I.N")]
        public string? Tin { get; set; }
        [Display(Name = "CODE")]
        public string? TinCode { get; set; }
        [Display(Name = "Address")]
        public string? AddressDetails { get; set; }
        [Display(Name = "City")]
        public string? City { get; set; }
        [Display(Name = "Zipcode")]
        public int? Zipcode { get; set; }
    }
}
