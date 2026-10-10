namespace Ams_Web.Dto
{
    public class userList_Dto
    {
        public int? Id { get; set; }
        public string? Firstname { get; set; }
        public string? Middlename { get; set; }
        public string? Lastname { get; set; }
        public string? Suffix { get; set; }
        public int? Branchid { get; set; }
        public string? BranchDesc { get; set; }

        public DateTime? Date { get; set; }
        public string? Username { get; set; }
        public int? RoleId { get; set; }
        public string? RoleDesc { get; set; }
        public int? Status { get; set; }
        public string? StatusDesc { get; set; }
    }
}
