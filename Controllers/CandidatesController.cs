﻿﻿﻿using Microsoft.AspNetCore.Mvc;
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
            var interviewing = await _context.Candidates.CountAsync(c => c.Status == "Interviewing");
            var rejected = await _context.Candidates.CountAsync(c => c.Status == "Rejected");

            return Ok(new
            {
                Total = total,
                Interviewing = interviewing,
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

        // 4. PUT: api/candidates/{id}
        // Updates an existing candidate
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCandidate(int id, Candidate candidate)
        {
            if (id != candidate.Id)
            {
                return BadRequest();
            }

            _context.Entry(candidate).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _context.Candidates.AnyAsync(c => c.Id == id)) return NotFound();
                else throw;
            }

            return NoContent();
        }
    }
}