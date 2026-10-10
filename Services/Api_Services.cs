using Ams_Web.Dto;
using Ams_Web.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;

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
        public async Task<List<branchList_Dto>> Get_Branch_List()
        {
            return await _httpClient.GetFromJsonAsync<List<branchList_Dto>>("api/useraccnt/get-branch-list")
          ?? new List<branchList_Dto>();
        }
        public async Task<List<rolesList_Dto>> Get_Role_List()
        {
            return await _httpClient.GetFromJsonAsync<List<rolesList_Dto>>("api/useraccnt/get-roles-list")
          ?? new List<rolesList_Dto>();
        }
        public async Task<Api_Response> CreateUser(userCreate_Dto userDto)
        {

            var response = await _httpClient.PostAsJsonAsync("api/useraccnt/create-user", userDto);
            if (response.IsSuccessStatusCode)
            {
                return new Api_Response
                {
                    Success = true
                };
            }

            var result = await response.Content.ReadFromJsonAsync<Api_Response>();

            return result ?? new Api_Response
            {
                Success = false,
                Message = $"API returned HTTP {(int)response.StatusCode}, " +
                $"{response.ReasonPhrase ?? "Unknown error"}."
            };
        }
        public async Task<List<userList_Dto>> User_List_Table()
        {
            var response = await _httpClient.GetAsync($"api/useraccnt/user-list");
            if (response.IsSuccessStatusCode)
            {
                return await response.Content
                .ReadFromJsonAsync<List<userList_Dto>>()
                ?? new List<userList_Dto>();
            }
            return new List<userList_Dto>();
        }
        public async Task<userList_Dto> Get_user(int? Id)
        {
            var response = await _httpClient.GetAsync($"api/useraccnt/get-user?Id={Id}");
            if (response.IsSuccessStatusCode)
            {
                return await response.Content
                .ReadFromJsonAsync<userList_Dto>()
                ?? new userList_Dto();
            }
            return new userList_Dto();
        }
        public async Task<Api_Response> Update_User(int? Id, userUpdate_Dto _userUpdate_Dto)
        {
         
            var response = await _httpClient.PutAsJsonAsync($"api/useraccnt/update-user?Id={Id}", _userUpdate_Dto);
            if (response.IsSuccessStatusCode)
            {
                return new Api_Response
                {
                    Success = true,
                    Message = "Status updated."
                };
            }

            return new Api_Response
            {
                Success = false,
                Message = await response.Content.ReadAsStringAsync()
            };
        }
    }

}
