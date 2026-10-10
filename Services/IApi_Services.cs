using Ams_Web.Dto;
using Ams_Web.Models;

namespace Ams_Web.Services
{
    public interface IApi_Services
    {
        Task<Api_Response<userLoginResponse_Dto>> Login(userLogin_ViewModel _userLogin_View);
        Task<List<branchList_Dto>> Get_Branch_List();
        Task<List<rolesList_Dto>> Get_Role_List();
        Task<Api_Response> CreateUser(userCreate_Dto userDto);
        Task<List<userList_Dto>> User_List_Table();
        Task<userList_Dto> Get_user(int? Id);
        Task<Api_Response> Update_User(int? Id, userUpdate_Dto _userUpdate_Dto);
    }
}
