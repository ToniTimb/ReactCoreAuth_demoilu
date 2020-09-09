using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace reactCoreAuth.Models
{
    [Table("Files")]
    public class File
    {

        [Key]
        [Required]

        public int FileId { get; set; }

        [MaxLength(50)]
        [Required]
        public string FileNo { get; set; }

        [MaxLength(50)]
        public string FileName { get; set; }

        
        public byte[] FileImage { get; set; }


    }
}
