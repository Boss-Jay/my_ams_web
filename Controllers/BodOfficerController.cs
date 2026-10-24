using Ams_Web.Dto;
using Ams_Web.Models;
using Ams_Web.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Ams_Web.Controllers
{
    public class BodOfficerController : Controller
    {
        private readonly IApi_Services _api_Services;
        public BodOfficerController(IApi_Services api_Services)
        {
            _api_Services = api_Services;
        }
        public async Task<IActionResult> BodOfficer_Index()
        {
            var years = await _api_Services.Get_BodOfficerYear_List();
            ViewBag.vbbodofficeryear = years.Select(year => new SelectListItem
            {
                Value = year.ToString(),
                Text = year.ToString(),
                Selected = year == DateTime.Now.Year
            }).ToList();
            var bodofficer = new bodofficer_ViewModel
            {
                _bodofficerList_Dtos = await _api_Services.BodOfficer_List()
            };
            return View(bodofficer);
        }
        [HttpPost]
        public async Task<IActionResult> Create_BodOfficer(bodofficer_ViewModel _ViewModel)
        {
            var result = await _api_Services.Create_BodOfficer(_ViewModel._bodofficerCreate_Dto);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Json(result);
        }
        [HttpPost]
        public async Task<IActionResult> Update_BodOfficer([FromBody] bodofficerUpdate_Dto _Dto)
        {
            if (_Dto == null)
                return BadRequest("No Data to Update !");
            var result = await _api_Services.Update_BodOfficer(_Dto.Id, _Dto);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Json(result);
        }
        [HttpGet]
        public async Task<IActionResult> BodOfficerAllowance_List(int BodOfficerId, 
            int Year, int Month)
        {
            var amount = await _api_Services.BodOfficerAllowance_List(
                BodOfficerId, Year, Month);

            return Json(new
            {
                success = true,
                allowance = amount
            });
        }
        [HttpPost]
        public async Task<IActionResult> Add_Allowance([FromBody] bodofficerallowanceCreate_Dto create_Dto)
        {
            var result = await _api_Services.Add_Allowance(create_Dto);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Json(result);
        }
    }
}
