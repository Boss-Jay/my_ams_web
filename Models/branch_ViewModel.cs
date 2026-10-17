using Ams_Web.Dto;

namespace Ams_Web.Models
{
    public class branch_ViewModel
    {
        public List<branchList_Dto?> branchList_Dtos { get; set; } = new List<branchList_Dto?>();
        public branchCreate_Dto _branchCreate_Dto { get; set; } = new();
        public branchUpdate_Dto _branchUpdate_Dto { get; set; } = new();
    }
}
