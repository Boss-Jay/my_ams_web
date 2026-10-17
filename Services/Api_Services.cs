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
        public async Task<List<branchListing_Dto>> Get_Branch_List()
        {
            return await _httpClient.GetFromJsonAsync<List<branchListing_Dto>>("api/useraccnt/get-branch-list")
          ?? new List<branchListing_Dto>();
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
                    Message = "User is updated."
                };
            }

            return new Api_Response
            {
                Success = false,
                Message = await response.Content.ReadAsStringAsync()
            };
        }
        public async Task<Api_Response> Update_User_Status(int Id, int StatusId)
        {

            var response = await _httpClient.PutAsync($"api/useraccnt/update-user-status?Id={Id}&StatusId={StatusId}", null);
            if (response.IsSuccessStatusCode)
            {
                return new Api_Response
                {
                    Success = true,
                    Message = "Status is updated."
                };
            }

            return new Api_Response
            {
                Success = false,
                Message = await response.Content.ReadAsStringAsync()
            };
        }
        public async Task<userDashboard_Dto?> Dashboard_Count()
        {
 
            var response = await _httpClient.GetAsync($"api/useraccnt/dashboard_count");
            if (!response.IsSuccessStatusCode)
                return null;

            return await response.Content.ReadFromJsonAsync<userDashboard_Dto>();
        }
        public async Task<Api_Response> Change_Password(userChange_Password _userChange_Password)
        {
            var response = await _httpClient.PutAsJsonAsync($"api/useraccnt/user-change-pass", _userChange_Password);
            if (response.IsSuccessStatusCode)
            {
                return new Api_Response
                {
                    Success = true,
                    Message = "Password is successfully changed."
                };
            }
            return new Api_Response
            {
                Success = false,
                Message = await response.Content.ReadAsStringAsync()
            };
        }
        // User Access
        public async Task<List<accessModule_Dto?>> User_Module()
        {
            var response = await _httpClient.GetAsync($"api/useraccess/module-list");
            if (response.IsSuccessStatusCode)
            {
                return await response.Content
                .ReadFromJsonAsync<List<accessModule_Dto?>>()
                ?? new List<accessModule_Dto?>();
            }
            return new List<accessModule_Dto?>();
        }
        public async Task<Api_Response> Create_Access(accessUserAccess_Dto accessUserAccess_Dto)
        {

            var response = await _httpClient.PostAsJsonAsync("api/useraccess/create-access", accessUserAccess_Dto);
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
        public async Task<int> GetModuleAccessStatus(int userId, int moduleId)
        {
            var response = await _httpClient.GetAsync(
                $"api/useraccess/module-access-status?userId={userId}&moduleId={moduleId}");

            response.EnsureSuccessStatusCode();

            var result = await response.Content.ReadFromJsonAsync<int>();

            return result;
        }
        // Branch
        public async Task<Api_Response> Create_Branch(branchCreate_Dto branchCreate_)
        {

            var response = await _httpClient.PostAsJsonAsync("api/branch/create-branch", branchCreate_);
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
        public async Task<Api_Response> Update_Branch(int? branchid, branchUpdate_Dto _branchUpdate_Dto)
        {

            var response = await _httpClient.PutAsJsonAsync($"api/branch/update-branch?branchid={branchid}", _branchUpdate_Dto);
            if (response.IsSuccessStatusCode)
            {
                return new Api_Response
                {
                    Success = true
                };
            }

            return new Api_Response
            {
                Success = false,
                Message = await response.Content.ReadAsStringAsync()
            };
        }
        public async Task<List<branchList_Dto?>> Branch_List()
        {
            var response = await _httpClient.GetAsync($"api/branch/branch-list");
            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadFromJsonAsync<List<branchList_Dto?>>()
                ?? new List<branchList_Dto?>();
            }
            return new List<branchList_Dto?>();
        }
        public async Task<List<companyListing_Dto>> Get_Company_Listing()
        {
            return await _httpClient.GetFromJsonAsync<List<companyListing_Dto>>("api/branch/get-company-list")
          ?? new List<companyListing_Dto>();
        }
        public async Task<List<userListing_Dto>> Get_user_Listing()
        {
            return await _httpClient.GetFromJsonAsync<List<userListing_Dto>>("api/useraccnt/get-user-listing")
          ?? new List<userListing_Dto>();
        }
        public async Task<branchList_Dto> Get_Branch(int? Branchid)
        {
            var response = await _httpClient.GetAsync($"api/branch/get-branch?Branchid={Branchid}");
            if (response.IsSuccessStatusCode)
            {
                return await response.Content
                .ReadFromJsonAsync<branchList_Dto>()
                ?? new branchList_Dto();
            }
            return new branchList_Dto();
        }
        public async Task<List<branchListSidebar_Dto>> Get_Branch_List_Sidebar()
        {
            return await _httpClient.GetFromJsonAsync<List<branchListSidebar_Dto>>("api/branch/branch-list-sidebar")
          ?? new List<branchListSidebar_Dto>();
        }
        public async Task<bool> Update_Last_Branch(branchUpdateLastUserBranch_Dto dto)
        {
            var response = await _httpClient.PostAsJsonAsync("api/branch/update-last-branch", dto);

            return response.IsSuccessStatusCode;
        }
        // Supplier
        public async Task<Api_Response> Create_Supplier(supplierCreate_Dto supplier)
        {

            var response = await _httpClient.PostAsJsonAsync("api/supplier/create-supplier", supplier);
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
        public async Task<Api_Response> Update_Supplier(int? Id, supplierUpdate_Dto _Dto)
        {

            var response = await _httpClient.PutAsJsonAsync
                ($"api/supplier/update-supplier?Id={Id}", _Dto);
            if (response.IsSuccessStatusCode)
            {
                return new Api_Response
                {
                    Success = true
                };
            }

            return new Api_Response
            {
                Success = false,
                Message = await response.Content.ReadAsStringAsync()
            };
        }
        public async Task<supplierList_Dto> Get_Supplier(int? Id)
        {
            var response = await _httpClient.GetAsync($"api/supplier/supplier-list-by-Id?Id={Id}");
            if (response.IsSuccessStatusCode)
            {
                return await response.Content
                .ReadFromJsonAsync<supplierList_Dto>()
                ?? new supplierList_Dto();
            }
            return new supplierList_Dto();
        }
        public async Task<List<supplierList_Dto?>> Supplier_List()
        {
            var response = await _httpClient.GetAsync($"api/supplier/supplier-list");
            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadFromJsonAsync<List<supplierList_Dto?>>()
                ?? new List<supplierList_Dto?>();
            }
            return new List<supplierList_Dto?>();
        }
        public async Task<List<supplierTypeListing_Dto>> Get_SuppTypeListing()
        {
            return await _httpClient.GetFromJsonAsync<List<supplierTypeListing_Dto>>
                ("api/supplier/get-supptype")
          ?? new List<supplierTypeListing_Dto>();
        }
        public async Task<Api_Response> Check_TIN(string tin,string branchcode)
        {
            var response = await _httpClient.GetAsync(
                $"api/supplier/check-tin-code?tin={Uri.EscapeDataString(tin)}" +
                $"&branchcode={Uri.EscapeDataString(branchcode)}");

            response.EnsureSuccessStatusCode();

            return await response.Content.ReadFromJsonAsync<Api_Response>()
                   ?? new Api_Response();
        }
        public async Task<List<supplierSearch_Dto>> Search_Supplier(string SearchTIN, string SearchBranchCode)
        {
            var response = await _httpClient.GetAsync(
                $"api/supplier/get-searched-supplier?SearchTIN={SearchTIN}&" +
                $"SearchBranchCode={SearchBranchCode}"
            );

            response.EnsureSuccessStatusCode();

            return await response.Content.ReadFromJsonAsync<List<supplierSearch_Dto>>()
                   ?? new List<supplierSearch_Dto>();
        }
        // Tenants 
        public async Task<tenantsList_Dto> Get_Tenants(int? Id)
        {
            var response = await _httpClient.GetAsync($"api/tenants/tenants-list-by-Id?Id={Id}");
            if (response.IsSuccessStatusCode)
            {
                return await response.Content
                .ReadFromJsonAsync<tenantsList_Dto>()
                ?? new tenantsList_Dto();
            }
            return new tenantsList_Dto();
        }
        public async Task<List<tenantsList_Dto?>> Tenants_List()
        {
            var response = await _httpClient.GetAsync($"api/tenants/tenants-list");
            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadFromJsonAsync<List<tenantsList_Dto?>>()
                ?? new List<tenantsList_Dto?>();
            }
            return new List<tenantsList_Dto?>();
        }
        public async Task<Api_Response> Create_Tenants(tenantsCreate_Dto tenants)
        {
            var response = await _httpClient.PostAsJsonAsync("api/tenants/create-tenant", tenants);

            if (response.IsSuccessStatusCode)
            {
                return new Api_Response
                {
                    Success = true
                };
            }

            var errorMessage = await response.Content.ReadAsStringAsync();

            return new Api_Response
            {
                Success = false,
                Message = string.IsNullOrWhiteSpace(errorMessage)
                    ? $"API returned HTTP {(int)response.StatusCode}."
                    : errorMessage
            };
        }
        public async Task<Api_Response> Update_Tenants(int? Id, teantsUpdate_Dto _Dto)
        {
            var response = await _httpClient.PutAsJsonAsync($"api/tenants/update-tenant?Id={Id}", _Dto);
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
        public async Task<List<tenantsSearch_Dto>> Search_Tenants(string SearchTIN, string SearchBranchCode)
        {
            var response = await _httpClient.GetAsync(
                $"api/tenants/get-searched-tenants?SearchTIN={SearchTIN}&SearchBranchCode={SearchBranchCode}"
            );

            response.EnsureSuccessStatusCode();

            return await response.Content.ReadFromJsonAsync<List<tenantsSearch_Dto>>()
                   ?? new List<tenantsSearch_Dto>();
        }
        // Chart of Accounts
        public async Task<List<coaTree_Dto>> Coa_Tree()
        {
            var response = await _httpClient.GetAsync($"api/coa/coa-tree");
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadFromJsonAsync<List<coaTree_Dto>>()
                ?? new List<coaTree_Dto>();
        }
        public async Task<coaList_Dto> Get_ChartofAccounts(int? coaid)
        {
            var response = await _httpClient.GetAsync($"api/coa/get-coa-by-id?coaid={coaid}");
            if (response.IsSuccessStatusCode)
            {
                return await response.Content
                .ReadFromJsonAsync<coaList_Dto>()
                ?? new coaList_Dto();
            }
            return new coaList_Dto();
        }
        public async Task<Api_Response> Create_Account(coaCreate_Dto _Dto)
        {
            var response = await _httpClient.PostAsJsonAsync("api/coa/create-account", _Dto);

            if (response.IsSuccessStatusCode)
            {
                return new Api_Response
                {
                    Success = true
                };
            }

            var errorMessage = await response.Content.ReadAsStringAsync();

            return new Api_Response
            {
                Success = false,
                Message = string.IsNullOrWhiteSpace(errorMessage)
                    ? $"API returned HTTP {(int)response.StatusCode}."
                    : errorMessage
            };
        }
        public async Task<int?> Get_Max_Accnt_Code(int coaid, int level)
        {
            var response = await _httpClient.GetAsync(
                $"api/coa/get-max-accnt-code?coaid={coaid}&level={level}");

            response.EnsureSuccessStatusCode();

            var result = await response.Content.ReadFromJsonAsync<Api_Response>();

            return result?.MaxAccount;
        }

    }

}
