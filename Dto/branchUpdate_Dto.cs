using System.ComponentModel.DataAnnotations;

namespace Ams_Web.Dto
{
    public class branchUpdate_Dto
    {
        public int? Branchid { get; set; }
        public int? CompanyId { get; set; }
        public string? Name { get; set; }
        public string? Address { get; set; }
        public int? Zipcode { get; set; }
        public int? ManagerId { get; set; }
        public string? Contact1 { get; set; }
        public string? Contact2 { get; set; }
        public string? Tin { get; set; }
        public string? Code { get; set; }
        public string? Ocn { get; set; }
        public string? Email1 { get; set; }
        public string? Email2 { get; set; }
        public int? Accountant { get; set; }
        public string? Rdo { get; set; }
    }
}
