using System.ComponentModel.DataAnnotations;

namespace Ams_Web.Dto
{
    public class userCreate_Dto
    {
        [Display(Name ="First Name")]
        public string? Firstname { get; set; }
        [Display(Name = "Middle Name")]
        public string? Middlename { get; set; }
        [Display(Name = "Last Name")]
        public string? Lastname { get; set; }
        [Display(Name = "Suffix")]
        public string? Suffix { get; set; }
        [Display(Name = "Branch")]
        public int? Branchid { get; set; }
        [Display(Name = "Username")]
        public string? Username { get; set; }
        [Display(Name = "Role")]
        public int? RoleId { get; set; }
    }
}
