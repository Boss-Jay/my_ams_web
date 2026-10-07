namespace Ams_Web.Dto
{
    public class userLoginResponse_Dto
    {
        public int? userid {  get; set; }
        public string? lastname { get; set; }
        public string? firstname { get; set; }
        public string? middlename { get; set; }
        public int? branchid { get; set; }
        public int? ismanager { get; set; }
        public int? roleid { get; set; }
        public int? lastbranchidaccess { get; set; }
        public string? token { get; set; }
        public int? tokenValidity { get; set; }
    }
}
