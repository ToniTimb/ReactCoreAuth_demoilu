using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using reactCoreAuth.Data;
using reactCoreAuth.Models;

namespace reactCoreAuth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LaskutApiController : ControllerBase
    {
        private readonly TiedostotDbContext _context;

        public LaskutApiController(TiedostotDbContext context)
        {
            _context = context;
        }

        // GET: api/LaskutApi
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Lasku>>> GetLaskut()
        {
            return await _context.Laskut.ToListAsync();
        }

        // GET: api/LaskutApi/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Lasku>> GetLasku(int id)
        {
            var lasku = await _context.Laskut.FindAsync(id);

            if (lasku == null)
            {
                return NotFound();
            }

            return lasku;
        }

        // PUT: api/LaskutApi/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLasku(int id,[FromForm]Lasku lasku)
        {
            if (id != lasku.LaskuId)
            {
                return BadRequest();
            }

            _context.Entry(lasku).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LaskuExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/LaskutApi
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Lasku>> PostLasku([FromForm]Lasku lasku)
        {
            _context.Laskut.Add(lasku);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLasku", new { id = lasku.LaskuId }, lasku);
        }

        // DELETE: api/LaskutApi/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Lasku>> DeleteLasku(int id)
        {
            var lasku = await _context.Laskut.FindAsync(id);
            if (lasku == null)
            {
                return NotFound();
            }

            _context.Laskut.Remove(lasku);
            await _context.SaveChangesAsync();

            return lasku;
        }

        private bool LaskuExists(int id)
        {
            return _context.Laskut.Any(e => e.LaskuId == id);
        }
    }
}
