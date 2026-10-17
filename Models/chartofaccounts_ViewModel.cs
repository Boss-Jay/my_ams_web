using Ams_Web.Dto;

namespace Ams_Web.Models
{
    public class chartofaccounts_ViewModel
    {
        public List<coaTree_Dto> _coaTree_Dtos {  get; set; } = new List<coaTree_Dto>();
        public coaCreate_Dto _coaCreate_Dto { get; set; } = new();
    }
}
