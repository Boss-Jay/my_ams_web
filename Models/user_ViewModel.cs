using Ams_Web.Dto;

namespace Ams_Web.Models
{
    public class user_ViewModel
    {
        public List<userList_Dto> _userTableList_Dto { get; set; } = new List<userList_Dto>();
        public userCreate_Dto _userCreate_Dto { get; set; } = new();
        public userUpdate_Dto? _userUpdate_Dto { get; set; } = new();
        public userDashboard_Dto? _userDashboard_Dto { get; set; } = new();
        public List<accessModule_Dto?> _accessModule_Dtos { get; set; } = new List<accessModule_Dto?>();
    }
}
