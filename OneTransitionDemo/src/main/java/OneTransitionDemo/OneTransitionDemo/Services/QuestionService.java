package OneTransitionDemo.OneTransitionDemo.Services;

import OneTransitionDemo.OneTransitionDemo.Models.Question;
import OneTransitionDemo.OneTransitionDemo.Repositories.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

public class QuestionService {
       @Autowired
       private QuestionRepository questionRepository;
       public Optional<Question> findById(Long Id){return questionRepository.findById(Id);
       }
}
