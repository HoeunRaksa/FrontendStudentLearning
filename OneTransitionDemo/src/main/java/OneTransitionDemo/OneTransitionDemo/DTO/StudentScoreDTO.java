package OneTransitionDemo.OneTransitionDemo.DTO;

public class StudentScoreDTO {
    private Long id;
    private Long score;
    private Long userId;
    private Long examId;

    public StudentScoreDTO(Long id, Long score, Long userId, Long examId) {
        this.id = id;
        this.score = score;
        this.userId = userId;
        this.examId = examId;
    }

    // Add getters
    public Long getId() {
        return id;
    }

    public Long getScore() {
        return score;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getExamId() {
        return examId;
    }

    // Optional: setters if needed
}
