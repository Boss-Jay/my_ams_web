namespace Ams_Web.Dto
{
    public class bodofficerallowanceCreate_Dto
    {
        public int bodofficerid { get; set; }
        public List<DateTime?> Date { get; set; } = new List<DateTime?>();
        public List<decimal?> Amount { get; set; } = new List<decimal?>();
    }
}
