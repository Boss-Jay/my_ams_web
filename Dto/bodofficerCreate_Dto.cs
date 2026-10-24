using System.ComponentModel.DataAnnotations;

namespace Ams_Web.Dto
{
    public class bodofficerCreate_Dto
    {
        [Display(Name ="Name")]
        public string? Name { get; set; }
        [Display(Name ="Type")]
        public int? TypeId { get; set; }
    }
}
