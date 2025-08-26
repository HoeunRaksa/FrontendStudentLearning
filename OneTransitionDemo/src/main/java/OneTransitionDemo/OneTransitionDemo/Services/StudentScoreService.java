package OneTransitionDemo.OneTransitionDemo.Services;

import OneTransitionDemo.OneTransitionDemo.DTO.StudentScoreDTO;
import OneTransitionDemo.OneTransitionDemo.Models.StudentScore;
import OneTransitionDemo.OneTransitionDemo.Models.User;
import OneTransitionDemo.OneTransitionDemo.Models.Exam;
import OneTransitionDemo.OneTransitionDemo.Repositories.StudentScoreRepository;
import OneTransitionDemo.OneTransitionDemo.Repositories.UserRepository;
import OneTransitionDemo.OneTransitionDemo.Repositories.ExamRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class StudentScoreService {

    private final StudentScoreRepository studentScoreRepository;
    private final UserRepository userRepository;
    private final ExamRepository examRepository;

    public StudentScoreService(StudentScoreRepository studentScoreRepository,
                               UserRepository userRepository,
                               ExamRepository examRepository) {
        this.studentScoreRepository = studentScoreRepository;
        this.userRepository = userRepository;
        this.examRepository = examRepository;
    }

    @Transactional
    public StudentScoreDTO saveScore(Long score, User user, Exam exam) {
        User dbUser = userRepository.findById(user.getId())
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + user.getId()));
        Exam dbExam = examRepository.findById(exam.getId())
                .orElseThrow(() -> new RuntimeException("Exam not found with ID: " + exam.getId()));

        StudentScore studentScore = new StudentScore();
        studentScore.setScore(score);
        studentScore.setUser(dbUser);
        studentScore.setExam(dbExam);

        StudentScore saved = studentScoreRepository.save(studentScore);
        return new StudentScoreDTO(saved.getId(), saved.getScore(), dbUser.getId(), dbExam.getId());
    }

}
