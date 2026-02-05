using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using Candidate_Interview_Dashboard.Data;
using Candidate_Interview_Dashboard.Models;

namespace Candidate_Interview_Dashboard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandidatesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CandidatesController(AppDbContext context)
        {
            _context = context;
        }

        // 1. GET: api/candidates
        // Returning the full list of candidates for the table view
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Candidate>>> GetCandidates()
        {
            return await _context.Candidates.ToListAsync(); 
        }

        // 2. GET: api/candidates/summary
        // Returns counts for the Dashboard Stat Cards
        [HttpGet("summary")]
        public async Task<IActionResult> GetSummary()
        {
            var total = await _context.Candidates.CountAsync();
            var hired = await _context.Candidates.CountAsync(c => c.Status == "Hired");
            var rejected = await _context.Candidates.CountAsync(c => c.Status == "Rejected");

            return Ok(new
            {
                Total = total,
                Hired = hired,
                Rejected = rejected
            }); 
        }

        // 3. POST: api/candidates
        // Accepts a JSON object and saves it to the database
        [HttpPost]
        public async Task<ActionResult<Candidate>> PostCandidate(Candidate candidate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Candidates.Add(candidate);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCandidates), new { id = candidate.Id }, candidate); 
        }
    }
}