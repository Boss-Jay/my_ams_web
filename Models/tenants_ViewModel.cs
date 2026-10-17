using Ams_Web.Dto;

namespace Ams_Web.Models
{
    public class tenants_ViewModel
    {
        public List<tenantsList_Dto?> _tenantsLists { get; set; } = new List<tenantsList_Dto?>();
        public tenantsCreate_Dto? _tenantsCreate { get; set; } = new();
        public teantsUpdate_Dto? _teantsUpdate { get; set; } = new();
    }
}
