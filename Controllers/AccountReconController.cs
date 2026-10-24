using Ams_Web.Models;
using Ams_Web.Services;
using Microsoft.AspNetCore.Mvc;

namespace Ams_Web.Controllers
{
    public class AccountReconController : Controller
    {
        private readonly IApi_Services _services;
        public AccountReconController(IApi_Services api_Services)
        {
            _services = api_Services;
        }
        public IActionResult AccountRecon_Index()
        {
            var recon = new accountrecon_ViewModel
            {

            };
            return View();
        }
        [HttpGet]
        public async Task<IActionResult> Search_AccountRecoon( int? TransType,
            string? SearchItem,DateTime? Datefrom, DateTime? Dateto)
        {
            var branchid = HttpContext?.Session.GetInt32("branchid");
            var result = await _services.Search_AccountRecon(branchid, TransType, SearchItem, Datefrom, Dateto);

            return Json(result);
        }
    
        public async Task<IActionResult> Create_Recon_Transaction()
        {
            var recon = new accountrecon_ViewModel
            {

            };
            return View(recon);
        }
        [HttpPost]
        public async Task<IActionResult> Create_Recon_Transaction(accountrecon_ViewModel _dto)
        {
            
            return View();
        }
    }
}
