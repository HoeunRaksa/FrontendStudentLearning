package OneTransitionDemo.OneTransitionDemo.Models;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_studentScore")
public class StudentScore {

    @Id
    @SequenceGenerator(name = "student_score_seq", sequenceName = "STUDENT_SCORE_SEQ", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "student_score_seq")
    private Long id;

    private Long score;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exam_id", nullable = false)
    private Exam exam;


    // === Getters ===
    public Long getId() {
        return id;
    }

    public Long getScore() {
        return score;
    }

    public User getUser() {
        return user;
    }

    public Exam getExam() {
        return exam;
    }

    // === Setters ===
    public void setId(Long id) {
        this.id = id;
    }

    public void setScore(Long score) {
        this.score = score;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setExam(Exam exam) {
        this.exam = exam;
    }
}
