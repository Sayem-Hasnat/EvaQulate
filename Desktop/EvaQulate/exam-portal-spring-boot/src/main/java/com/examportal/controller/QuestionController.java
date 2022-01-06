package com.examportal.controller;

import com.examportal.dto.QuestionDto;
import com.examportal.dto.ResponseDto;
import com.examportal.entity.Question;
import com.examportal.entity.Quiz;
import com.examportal.service.QuestionService;
import com.examportal.service.QuizService;
import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/question")
public class QuestionController {
    private final QuizService quizService;
    private final QuestionService questionService;

    public QuestionController(QuizService quizService, QuestionService questionService) {
        this.quizService = quizService;
        this.questionService = questionService;
    }

    /*-------------------------------------------------*/

    @PostMapping("/")
    public ResponseEntity<?> addQuestion(@RequestBody QuestionDto questionDto) {
        Question question = new Question();
        BeanUtils.copyProperties(questionDto, question);
        question.setQuiz(this.quizService.getQuiz(questionDto.getQuizId()));
        Question savedQuestion = this.questionService.saveQuestion(question);

        if (savedQuestion != null) {
            return ResponseEntity.ok(new ResponseDto("Save"));
        } else {
            return ResponseEntity.ok(new ResponseDto("Fail"));
        }
    }

    @DeleteMapping("/delete/{questionId}")
    public ResponseEntity<?> deleteQuestion(@PathVariable("questionId") Long questionId) {
        this.questionService.deleteQuestion(questionId);
        return ResponseEntity.ok(new ResponseDto("Delete"));
    }

}
