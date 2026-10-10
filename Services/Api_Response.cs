namespace Ams_Web.Services
{
    public class Api_Response
    {
        public bool Success { get; set; }
        public string? Message { get; set; }
        public Dictionary<string, string[]>? Errors { get; set; }

    }

    public class Api_Response<T> : Api_Response
    {
        public T? Data { get; set; }
    }
}
