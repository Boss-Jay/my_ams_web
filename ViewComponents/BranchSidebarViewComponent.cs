using Ams_Web.Services;
using Microsoft.AspNetCore.Mvc;

namespace Ams_Web.ViewsComponent
{
    public class BranchSidebarViewComponent : ViewComponent
    {
        private readonly IApi_Services _api_Services;

        public BranchSidebarViewComponent(
            IApi_Services api_Services)
        {
            _api_Services = api_Services;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            var branches =
                await _api_Services.Get_Branch_List_Sidebar();
            ViewBag.LastBranchId =HttpContext.Session.GetInt32("lastbranchidaccess");
            return View(branches);
        }
    }
}
