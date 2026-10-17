using Ams_Web.Dto;
using Ams_Web.Models;
using Ams_Web.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Threading.Tasks;

namespace Ams_Web.Controllers
{
    public class UserController : Controller
    {
        private readonly IApi_Services _api_Services;
        public UserController(IApi_Services api_Services)
        {
            _api_Services = api_Services;
        }
        [HttpGet]
        public async Task<IActionResult> User_Index()
        {
            var role = await _api_Services.Get_Role_List();
            ViewBag.vbrole = new SelectList(role, "Id", "Description");
            var branch = await _api_Services.Get_Branch_List();
            ViewBag.vbbranch = new SelectList(branch, "Branchid", "Name");
            var user = new user_ViewModel
            {
                _userTableList_Dto = await _api_Services.User_List_Table(),
                _userDashboard_Dto = await _api_Services.Dashboard_Count(),
                _accessModule_Dtos = await _api_Services.User_Module()
            };
            return View(user);
        }
        
        [HttpPost]
        public async Task<IActionResult> Create_User(user_ViewModel user_ViewModel)
        {
            var result = await _api_Services.CreateUser(user_ViewModel._userCreate_Dto);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Json(result);
        }
        [HttpGet]
        public async Task<IActionResult> Get_User(int? Id)
        {
            var user = await _api_Services.Get_user(Id);
            if (user == null)
                return NotFound();
            return Json(user);
        }
        [HttpPost]
        public async Task<IActionResult> Update_User([FromBody]userUpdate_Dto _userUpdate_Dto)
        {
            if (_userUpdate_Dto == null)
            {
                return BadRequest("No data received.");
            }
            var result = await _api_Services.Update_User(_userUpdate_Dto?.Id, _userUpdate_Dto!);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Json(result);
        }
        [HttpPost]
        public async Task<IActionResult> Update_User_Status(int Id, int StatusId)
        {
         
            var result = await _api_Services.Update_User_Status(Id, StatusId);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Json(result);
        }
        [HttpPost]
        public async Task<IActionResult> Change_Password(userChange_Password _userChange_Password)
        {
            var result = await _api_Services.Change_Password(_userChange_Password);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Json(result);
        }
        [HttpPost]
        public async Task<IActionResult> SaveModuleAccess([FromBody] accessUserAccess_Dto accessUserAccess_Dto)
        {
            var result = await _api_Services.Create_Access(accessUserAccess_Dto);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Json(result);
        }
        [HttpGet]
        public async Task<IActionResult> GetModuleAccessStatus(int userId, int moduleId)
        {
            var access = await _api_Services.GetModuleAccessStatus(
                userId, moduleId);

            return Json(new
            {
                success = true,
                hasAccess = access
            });
        }
    }
}
