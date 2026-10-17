using Ams_Web.Dto;
using Ams_Web.Models;
using Ams_Web.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.CodeAnalysis.Operations;
using System.Threading.Tasks;

namespace Ams_Web.Controllers
{
    public class SupplierController : Controller
    {
        private readonly IApi_Services _api_Services;
        public SupplierController(IApi_Services api_Services)
        {
            _api_Services = api_Services;
        }
        [HttpGet]
        public async Task<IActionResult> Supplier_Index()
        {
            var supptyepe = await _api_Services.Get_SuppTypeListing();
            ViewBag.vbsupptype = new SelectList(supptyepe, "Id", "Description");

            var supplierview = new supplier_ViewModel
            {
                supplierList_Dtos = await _api_Services.Supplier_List()
            };
            return View(supplierview);
        }
        [HttpPost]
        public async Task<IActionResult> Create_Supplier(supplier_ViewModel _Dto)
        {
            _Dto.supplierCreate_Dto.Createdby = HttpContext?.Session.GetInt32("userid");
            var result = await _api_Services.Create_Supplier(_Dto.supplierCreate_Dto);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Json(result);
        }
        [HttpGet]
        public async Task<IActionResult> Get_Supplier(int? Id)
        {
            var branch = await _api_Services.Get_Supplier(Id);
            if (branch == null)
                return NotFound();
            return Json(branch);
        }
        [HttpPost]
        public async Task<IActionResult> Update_Supplier([FromBody]supplierUpdate_Dto _Dto)
        {
            _Dto.EditBy = HttpContext?.Session.GetInt32("userid");
            var result = await _api_Services.Update_Supplier(_Dto.Id, _Dto);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Json(result);
        }
        [HttpGet]
        public async Task<IActionResult> Check_TIN(string tin,string branchcode)
        {
            if (string.IsNullOrWhiteSpace(tin))
            {
                return BadRequest(new
                {
                    success = false,
                    message = "TIN is required."
                });
            }

            var result = await _api_Services.Check_TIN(tin, branchcode);

            return Json(result);
        }
        [HttpGet]
        public async Task<IActionResult> Search_Supplier(string SearchTIN, string SearchBranchCode)
        {
            var result = await _api_Services.Search_Supplier(SearchTIN, SearchBranchCode);

            return Json(result);
        }
    }
}
