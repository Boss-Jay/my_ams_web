using Ams_Web.Dto;
using Ams_Web.Models;

namespace Ams_Web.Services
{
    public interface IApi_Services
    {
        Task<Api_Response<userLoginResponse_Dto>> Login(userLogin_ViewModel _userLogin_View);
    }
}
