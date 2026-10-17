namespace Ams_Web.Dto
{
    public class coaTree_Dto
    {
        public int CoaId { get; set; }
        public string? CoaDesc { get; set; }
        public int? Type { get; set; }
        public string? Tag { get; set; }
        public int? Level { get; set; }
        public List<coaTree_Dto> Children { get; set; } = new List<coaTree_Dto>();
    }
}
