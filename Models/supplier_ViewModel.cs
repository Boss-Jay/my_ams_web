using Ams_Web.Dto;

namespace Ams_Web.Models
{
    public class supplier_ViewModel
    {
        public List<supplierList_Dto?> supplierList_Dtos { get; set; } = new List<supplierList_Dto?>();
        public supplierCreate_Dto supplierCreate_Dto { get; set; } = new supplierCreate_Dto();
        public supplierUpdate_Dto supplierUpdate_Dto { get;set; } = new supplierUpdate_Dto();
    }
}
