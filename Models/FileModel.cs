using Microsoft.AspNetCore.Http;


namespace reactCoreAuth.Models
{
    public class FileModel
    {
        public IFormFile FormFile { get; set; }
        public string FileName { get; set; }

    }
}
