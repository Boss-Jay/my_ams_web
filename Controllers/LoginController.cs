using Ams_Web.Models;
using Ams_Web.Services;
using Microsoft.AspNetCore.Mvc;

namespace Ams_Web.Controllers
{
    public class LoginController : Controller
    {
        private readonly IApi_Services _api_Services;
        public LoginController(IApi_Services api_Services)
        {
            _api_Services = api_Services;
        }
        [HttpGet]
        public IActionResult UserLogin()
        {
            if (HttpContext.Session.GetInt32("userid") != null)
            {
                return RedirectToAction("Index", "Home");
            }

            return View();
        }
        [HttpPost]
        public async Task<IActionResult> UserLogin
            (userLogin_ViewModel userLogin_View)
        {
            var result = await _api_Services.Login(userLogin_View);
            if (!result.Success || result.Data == null)
            {
                return Json(new
                {
                    success = false,
                    message = result.Message
                });
            }
            HttpContext.Session.SetInt32("userid", result.Data?.userid ?? 0);
            HttpContext.Session.SetString("lastname", result.Data?.lastname ?? "");
            HttpContext.Session.SetString("firstname", result.Data?.firstname ?? "");
            HttpContext.Session.SetString("middlename", result.Data?.middlename ?? "");
            HttpContext.Session.SetInt32("branchid", result.Data?.branchid ?? 0);
            HttpContext.Session.SetInt32("ismanager", result.Data?.ismanager ?? 0);
            HttpContext.Session.SetInt32("roleid", result.Data?.roleid ?? 0);
            HttpContext.Session.SetInt32("lastbranchidaccess", result.Data?.lastbranchidaccess ?? 0);
            HttpContext.Session.SetString("token", result.Data?.token ?? "");
            HttpContext.Session.SetInt32("tokenValidity", result.Data?.tokenValidity ?? 0);
            return Json(new
            {
                success = true,
                redirectUrl = Url.Action("Index", "Home")
            });
        }
    }
}
