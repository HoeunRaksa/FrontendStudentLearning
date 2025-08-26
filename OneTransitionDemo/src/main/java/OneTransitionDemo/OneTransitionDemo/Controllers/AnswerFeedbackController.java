package OneTransitionDemo.OneTransitionDemo.Controllers;

import OneTransitionDemo.OneTransitionDemo.DTO.AnswerFeedbackDTO;
import OneTransitionDemo.OneTransitionDemo.Models.AnswerFeedback;
import OneTransitionDemo.OneTransitionDemo.Services.AnswerFeedbackService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/answer-feedback")
public class AnswerFeedbackController {

    @Autowired
    private AnswerFeedbackService answerFeedbackService;

    @PostMapping("/create")
    public ResponseEntity<?> createFeedback(
            @RequestPart("feedbackList") String feedbackListJson,
            @RequestPart(value = "files", required = false) List<MultipartFile> files
    ) {
        System.out.println("Received feedback JSON: " + feedbackListJson);
        if (files != null) {
            System.out.println("Number of files received: " + files.size());
            files.forEach(file -> System.out.println("File: " + file.getOriginalFilename()));
        }

        ObjectMapper mapper = new ObjectMapper();
        List<AnswerFeedbackDTO> feedbackList;
        try {
            feedbackList = mapper.readValue(feedbackListJson, new TypeReference<List<AnswerFeedbackDTO>>() {});
            System.out.println("Parsed feedback list size: " + feedbackList.size());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Invalid JSON in feedbackList");
        }

        // ✅ Save to DB
        List<AnswerFeedback> savedFeedbacks = answerFeedbackService.createMultipleFeedbacks(feedbackList);

        // Convert to DTO to avoid lazy-loading issues
        List<AnswerFeedbackDTO> responseList = savedFeedbacks.stream()
                .map(AnswerFeedbackDTO::new)
                .toList();

        return ResponseEntity.ok(responseList);
    }
}
