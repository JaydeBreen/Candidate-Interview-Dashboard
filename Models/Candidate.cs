using System.ComponentModel.DataAnnotations;

namespace Candidate_Interview_Dashboard.Models
{
    public class Candidate
    {
        public int Id { get; set; } // PK
        [Required]
        public string FirstName { get; set; } = string.Empty;
        [Required]
        public string LastName { get; set; } = string.Empty;
        [Required]
        public string Email { get; set; } = string.Empty;
        public long? Cellphone { get; set; }
        public string Status { get; set; } = "Pending"; // e.g., "Pending", "Interviewing"
        public string? JobRole { get; set; }
    }
}
