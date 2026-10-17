namespace Ams_Web.Dto
{
    public class coaList_Dto
    {
        public int CoaId { get; set; }

        public string? CoaDesc { get; set; }

        public int? Type { get; set; }

        public string? Tag { get; set; }

        public int? Level { get; set; }

        public int? SubCoaId { get; set; }

        public DateTime? AddedDate { get; set; }

        public int? AddedBy { get; set; }

        public int? EditBy { get; set; }

        public DateTime? EditDate { get; set; }

        public int? BalType { get; set; }

        public int? Active { get; set; }
    }
}
