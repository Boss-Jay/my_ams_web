using System.Diagnostics;
using System.Threading.Tasks;
using Ams_Web.Models;
using Ams_Web.Services;
using Microsoft.AspNetCore.Mvc;

namespace Ams_Web.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IApi_Services _api_Services;

        public HomeController(ILogger<HomeController> logger,
            IApi_Services api_Services)
        {
            _logger = logger;
            _api_Services = api_Services;
        }

        public async Task<IActionResult> Index()
        {
            var home = new home_ViewModel
            {
                branchListSidebar_Dtos = await _api_Services.Get_Branch_List_Sidebar()
            };
         
            return View(home);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
