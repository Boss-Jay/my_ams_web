using Ams_Web.Dto;
using Ams_Web.Models;
using Ams_Web.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Threading.Tasks;

namespace Ams_Web.Controllers
{
    public class BranchController : Controller
    {
        private readonly IApi_Services _api_Services;

        public BranchController(IApi_Services api_Services)
        {
            _api_Services = api_Services;
        }
        public async Task<IActionResult> Branch_Index()
        {
            var company = await _api_Services.Get_Company_Listing();
            ViewBag.vbcompany = new SelectList(company, "Id", "Description");
            var user = await _api_Services.Get_user_Listing();
            ViewBag.vbuserlisting = new SelectList(user, "Id", "Fullname");
            var branch = new branch_ViewModel{
                branchList_Dtos = await _api_Services.Branch_List()
            };
            return View(branch);
        }
        [HttpPost]
        public async Task<IActionResult> Create_Branch(branch_ViewModel _branch_ViewModel)
        {
            var result = await _api_Services.Create_Branch(_branch_ViewModel._branchCreate_Dto);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Json(result);
        }
        [HttpGet]
        public async Task<IActionResult> Get_Branch(int? Branchid)
        {
            var branch = await _api_Services.Get_Branch(Branchid);
            if (branch == null)
                return NotFound();
            return Json(branch);
        }
        [HttpPost]
        public async Task<IActionResult> Update_Branch([FromBody]branchUpdate_Dto _branchUpdate_Dto)
        {
            if (_branchUpdate_Dto == null)
                return BadRequest("No Data to Update !");
            var result = await _api_Services.Update_Branch(_branchUpdate_Dto.Branchid,_branchUpdate_Dto);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Json(result);
        }
        [HttpPost]
        public async Task<IActionResult> Update_Last_Branch([FromBody] int branchId)
        {
            var userId = HttpContext.Session.GetInt32("userid");

            if (userId == null)
            {
                return Unauthorized(new
                {
                    success = false,
                    message = "Your session has expired. Please log in again."
                });
            }

            var dto = new branchUpdateLastUserBranch_Dto
            {
                UserId = userId.Value,
                BranchId = branchId
            };

            var result = await _api_Services.Update_Last_Branch(dto);

            if (!result)
            {
                return BadRequest(new
                {
                    success = false,
                    message = "Unable to update the selected branch."
                });
            }

            // Update session only after the API succeeds.
            HttpContext.Session.SetInt32("lastbranchidaccess", branchId);

            return Ok(new
            {
                success = true,
                message = "Last selected branch updated successfully."
            });
        }
    }
}
