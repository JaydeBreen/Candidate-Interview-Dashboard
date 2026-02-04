namespace Candidate_Interview_Dashboard.Models
{
    public class Candidate
    {
        public int Id { get; set; } // PK
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public int Cellphone { get; set; }
        public string Status { get; set; } = "Pending"; // e.g., "Pending", "Interviewing"
        public string JobRole { get; set; } = string.Empty;
    }
}
