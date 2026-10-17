using Ams_Web.Dto;
using Ams_Web.Models;
using Ams_Web.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Ams_Web.Controllers
{
    public class TenantsController : Controller
    {
        private readonly IApi_Services _services;
        public TenantsController(IApi_Services api_Services)
        {
            _services = api_Services;
        }
        [HttpGet]
        public async Task<IActionResult> Tenants_Index()
        {
            var tenants = new tenants_ViewModel
            {
                _tenantsLists = await _services.Tenants_List()
            };
            return View(tenants);
        }
        [HttpGet]
        public async Task<IActionResult> Search_Tenants(string SearchTIN, string SearchBranchCode)
        {
            var result = await _services.Search_Tenants(SearchTIN, SearchBranchCode);
            return Json(result);
        }
        [HttpPost]
        public async Task<IActionResult> Create_Tenants(tenants_ViewModel _Dto)
        {
            _Dto._tenantsCreate!.Addedby = HttpContext?.Session.GetInt32("userid");
            var result = await _services.Create_Tenants(_Dto._tenantsCreate);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Json(result);
        }
        [HttpGet]
        public async Task<IActionResult> Get_Tenants(int? Id)
        {
            var tenants = await _services.Get_Tenants(Id);
            if (tenants == null)
                return NotFound();
            return Json(tenants);
        }
        [HttpPost]
        public async Task<IActionResult> Update_Tenants([FromBody] teantsUpdate_Dto _Dto)
        {
            var result = await _services.Update_Tenants(_Dto.Id, _Dto);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Json(result);
        }
    }
}
