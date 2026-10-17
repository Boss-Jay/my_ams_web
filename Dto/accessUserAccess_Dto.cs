
namespace Ams_Web.Dto
{
    public class accessUserAccess_Dto
    {
        public int UserId { get; set; }
        public List<int?> ModuleId { get; set; } = new List<int?>();
        public List<int?> HasAccess { get; set; } = new List<int?>();
    }
}
