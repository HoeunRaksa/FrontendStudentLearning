package OneTransitionDemo.OneTransitionDemo.DTO;

import OneTransitionDemo.OneTransitionDemo.Models.AnswerFeedback;

public class AnswerFeedbackDTO {

       private Long id;
       private Long score;
       private Long userId;
       private Long examId;
       private Long questionId;
       private UserDTO userDTO;
       private ExamDTO examDTO;

       // Constructor from entity
       public AnswerFeedbackDTO(AnswerFeedback answerFeedback) {
              if (answerFeedback == null) return;

              this.id = answerFeedback.getId();
              this.score = answerFeedback.getScore();

              if (answerFeedback.getUser() != null) {
                     this.userDTO = new UserDTO(answerFeedback.getUser());
                     this.userId = answerFeedback.getUser().getId();
              }

              if (answerFeedback.getExam() != null) {
                     this.examDTO = new ExamDTO(answerFeedback.getExam());
                     this.examId = answerFeedback.getExam().getId();
              }

              if (answerFeedback.getQuestion() != null) {
                     this.questionId = answerFeedback.getQuestion().getId();
              }
       }

       // Default constructor needed by Jackson
       public AnswerFeedbackDTO() {}

       // Getters
       public Long getId() {
              return id;
       }

       public Long getScore() {
              return score;
       }

       public Long getUserId() {
              // Return the primitive userId if set, otherwise fallback to userDTO
              return userId != null ? userId : (userDTO != null ? userDTO.getId() : null);
       }

       public Long getExamId() {
              return examId != null ? examId : (examDTO != null ? examDTO.getId() : null);
       }

       public Long getQuestionId() {
              return questionId;
       }

       public UserDTO getUserDTO() {
              return userDTO;
       }

       public ExamDTO getExamDTO() {
              return examDTO;
       }

       // Setters
       public void setId(Long id) {
              this.id = id;
       }

       public void setScore(Long score) {
              this.score = score;
       }

       public void setUserId(Long userId) {
              this.userId = userId;
       }

       public void setExamId(Long examId) {
              this.examId = examId;
       }

       public void setQuestionId(Long questionId) {
              this.questionId = questionId;
       }

       public void setUserDTO(UserDTO userDTO) {
              this.userDTO = userDTO;
              if (userDTO != null) this.userId = userDTO.getId();
       }

       public void setExamDTO(ExamDTO examDTO) {
              this.examDTO = examDTO;
              if (examDTO != null) this.examId = examDTO.getId();
       }
}
