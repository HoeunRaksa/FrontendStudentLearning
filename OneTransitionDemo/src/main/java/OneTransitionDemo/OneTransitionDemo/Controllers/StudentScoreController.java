package OneTransitionDemo.OneTransitionDemo.Controllers;

import OneTransitionDemo.OneTransitionDemo.DTO.StudentScoreDTO;
import OneTransitionDemo.OneTransitionDemo.Models.User;
import OneTransitionDemo.OneTransitionDemo.Models.Exam;
import OneTransitionDemo.OneTransitionDemo.Services.StudentScoreService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

@RestController
@RequestMapping("/api/student_score")
public class StudentScoreController {

    private static final Logger logger = LoggerFactory.getLogger(StudentScoreController.class);

    private final StudentScoreService studentScoreService;

    public StudentScoreController(StudentScoreService studentScoreService) {
        this.studentScoreService = studentScoreService;
    }

    // Using @RequestBody with DTO for cleaner input
    @PostMapping("/add")
    public StudentScoreDTO addScore(@Valid @RequestBody StudentScoreRequest request) {

        logger.info("Received request to add score: {}", request);

        User user = new User();
        user.setId(request.getUserId());

        Exam exam = new Exam();
        exam.setId(request.getExamId());

        StudentScoreDTO result = studentScoreService.saveScore(request.getScore(), user, exam);

        logger.info("Saved score with ID: {}", result.getId());

        return result; // return DTO instead of entity
    }

    // DTO class for request body
    public static class StudentScoreRequest {
        @NotNull
        private Long score;

        @NotNull
        private Long userId;

        @NotNull
        private Long examId;

        // Getters and Setters
        public Long getScore() { return score; }
        public void setScore(Long score) { this.score = score; }

        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }

        public Long getExamId() { return examId; }
        public void setExamId(Long examId) { this.examId = examId; }

        @Override
        public String toString() {
            return "StudentScoreRequest{" +
                    "score=" + score +
                    ", userId=" + userId +
                    ", examId=" + examId +
                    '}';
        }
    }
}
