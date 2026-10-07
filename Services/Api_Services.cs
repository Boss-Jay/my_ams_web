using Ams_Web.Dto;
using Ams_Web.Models;

namespace Ams_Web.Services
{
    public class Api_Services : IApi_Services
    {
        private readonly HttpClient _httpClient;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public Api_Services(HttpClient httpClient, IHttpContextAccessor httpContextAccessor)
        {
            _httpClient = httpClient;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<Api_Response<userLoginResponse_Dto>> Login(userLogin_ViewModel _userLogin_View)
        {
            var response = await _httpClient.PostAsJsonAsync
                ($"api/login/login", _userLogin_View);
            if (response.IsSuccessStatusCode)
            {
                var data = await response.Content.ReadFromJsonAsync<userLoginResponse_Dto>();

                return new Api_Response<userLoginResponse_Dto>
                {
                    Success = true,
                    Data = data
                };
            }

            var error = await response.Content
            .ReadFromJsonAsync<Api_Response>();

            return new Api_Response<userLoginResponse_Dto>
            {
                Success = false,
                Message = error?.Message ?? "Invalid username or password."
            };
        }
    }
}
