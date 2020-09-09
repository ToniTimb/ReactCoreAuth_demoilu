using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using reactCoreAuth.Models;
using Microsoft.EntityFrameworkCore;

namespace reactCoreAuth.Data
{
    public class TiedostotDbContext : DbContext
    {
        public DbSet<Lasku> Laskut { get; set; }

        public TiedostotDbContext() : base()
        {

        }
        public TiedostotDbContext(DbContextOptions <TiedostotDbContext> options) : base(options)
        {

        }
        public DbSet<reactCoreAuth.Models.File> File { get; set; }
         
    }

}
