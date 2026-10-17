using Ams_Web.Dto;
using Ams_Web.Models;

namespace Ams_Web.Services
{
    public interface IApi_Services
    {
        Task<Api_Response<userLoginResponse_Dto>> Login(userLogin_ViewModel _userLogin_View);
        Task<List<branchListing_Dto>> Get_Branch_List();
        Task<List<rolesList_Dto>> Get_Role_List();
        Task<Api_Response> CreateUser(userCreate_Dto userDto);
        Task<List<userList_Dto>> User_List_Table();
        Task<userList_Dto> Get_user(int? Id);
        Task<Api_Response> Update_User(int? Id, userUpdate_Dto _userUpdate_Dto);
        Task<Api_Response> Update_User_Status(int Id, int StatusId);
        Task<userDashboard_Dto?> Dashboard_Count();
        Task<Api_Response> Change_Password(userChange_Password _userChange_Password);
        Task<List<accessModule_Dto?>> User_Module();
        Task<Api_Response> Create_Access(accessUserAccess_Dto accessUserAccess_Dto);
        Task<int> GetModuleAccessStatus(int userId, int moduleId);
        Task<Api_Response> Create_Branch(branchCreate_Dto branchCreate_);
        Task<Api_Response> Update_Branch(int? branchid, branchUpdate_Dto _branchUpdate_Dto);
        Task<List<branchList_Dto?>> Branch_List();
        Task<List<companyListing_Dto>> Get_Company_Listing();
        Task<List<userListing_Dto>> Get_user_Listing();
        Task<branchList_Dto> Get_Branch(int? Branchid);
        Task<List<branchListSidebar_Dto>> Get_Branch_List_Sidebar();
        Task<bool> Update_Last_Branch(branchUpdateLastUserBranch_Dto dto);
        Task<Api_Response> Create_Supplier(supplierCreate_Dto supplier);
        Task<Api_Response> Update_Supplier(int? Id, supplierUpdate_Dto _Dto);
        Task<supplierList_Dto> Get_Supplier(int? Id);
        Task<List<supplierList_Dto?>> Supplier_List();
        Task<List<supplierTypeListing_Dto>> Get_SuppTypeListing();
        Task<Api_Response> Check_TIN(string tin, string branchcode);
        Task<List<supplierSearch_Dto>> Search_Supplier(string SearchTIN, string SearchBranchCode);
        Task<tenantsList_Dto> Get_Tenants(int? Id);
        Task<List<tenantsList_Dto?>> Tenants_List();
        Task<Api_Response> Create_Tenants(tenantsCreate_Dto tenants);
        Task<Api_Response> Update_Tenants(int? Id, teantsUpdate_Dto _Dto);
        Task<List<tenantsSearch_Dto>> Search_Tenants(string SearchTIN, string SearchBranchCode);
        Task<List<coaTree_Dto>> Coa_Tree();
        Task<coaList_Dto> Get_ChartofAccounts(int? coaid);
        Task<Api_Response> Create_Account(coaCreate_Dto _Dto);
        Task<int?> Get_Max_Accnt_Code(int coaid, int level);

    }
}
