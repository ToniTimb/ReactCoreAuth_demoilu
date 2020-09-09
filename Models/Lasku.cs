using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace reactCoreAuth.Models
{
    [Table("Laskut")]
    public class Lasku
    {

        [Key]
        [Required]

        public int LaskuId { get; set; }

        [MaxLength(50)]
        [Required]
        public string LaskuNro { get; set; }

        [MaxLength(50)]
        public string Tunniste { get; set; }

        
        public string Tiedosto { get; set; }


    }
}
