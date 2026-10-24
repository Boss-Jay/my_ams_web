using Ams_Web.Dto;

namespace Ams_Web.Models
{
    public class bodofficer_ViewModel
    {
        public List<bodofficerallowanceList_Dto> _bodofficerallowanceList_Dtos { get; set; } = new List<bodofficerallowanceList_Dto>();
        public List<bodofficerList_Dto> _bodofficerList_Dtos { get; set; } = new List<bodofficerList_Dto>();
        public bodofficerCreate_Dto _bodofficerCreate_Dto { get; set; } = new();
        public bodofficerUpdate_Dto _bodofficerUpdate_Dto { get;set; } = new();
    }
}
