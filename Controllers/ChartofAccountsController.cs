using Ams_Web.Dto;
using Ams_Web.Models;
using Ams_Web.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Ams_Web.Controllers
{
    public class ChartofAccountsController : Controller
    {
        private readonly IApi_Services _api_Services;

        public ChartofAccountsController(IApi_Services api_Services)
        {
            _api_Services = api_Services;
        }

        public async Task<IActionResult> ChartofAccounts_Index()
        {
            var chartofaccounts = new chartofaccounts_ViewModel
            {
                _coaTree_Dtos = await _api_Services.Coa_Tree()
            };
            return View(chartofaccounts);
        }
        [HttpGet]
        public async Task<IActionResult> Get_Max_Accnt_Code(int coaid, int level)
        {
            var maxaccnt = await _api_Services.Get_Max_Accnt_Code(coaid,level);
            if (maxaccnt == null)
                return NotFound();
            return Json(maxaccnt);
        }
        [HttpPost]
        public async Task<IActionResult> Create_Account(chartofaccounts_ViewModel _Dto)
        {
            var userId = HttpContext.Session.GetInt32("userid");
            _Dto._coaCreate_Dto.AddedBy = userId;
            var result = await _api_Services.Create_Account(_Dto._coaCreate_Dto);
            if (!result.Success)
                return BadRequest(result);
            return Json(result);
        }
        [HttpPost]
        public async Task<IActionResult> Update_Account([FromBody] coaUpdate_Dto _Dto)
        {
            var userId = HttpContext.Session.GetInt32("userid");
            _Dto.EditBy = userId;
             if (_Dto == null)
                return BadRequest("No Data to Update !");
            var result = await _api_Services.Update_Account(_Dto.CoaId, _Dto);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Json(result);
        }
    }
}
