package com.examportal.service;

import com.examportal.entity.Question;
import com.examportal.entity.SubmitQuestion;
import com.examportal.repository.QuestionRepo;
import com.examportal.repository.SubmitQuestionRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService {
    private final QuestionRepo questionRepo;
    private final SubmitQuestionRepo submitQuestionRepo;

    public QuestionService(QuestionRepo questionRepo, SubmitQuestionRepo submitQuestionRepo) {
        this.questionRepo = questionRepo;
        this.submitQuestionRepo = submitQuestionRepo;
    }

    /*-----------------------------------------------------------------------------------*/

    public Question saveQuestion(Question question) {
        return questionRepo.save(question);
    }

    public Question getQuestion(Long questionId) {
        return questionRepo.getById(questionId);
    }

    public void deleteQuestion(Long questionId) {
        Question question = this.questionRepo.getById(questionId);
        this.questionRepo.delete(question);
    }

    public List<SubmitQuestion> saveSubmitQuestionList(List<SubmitQuestion> submitQuestionList) {
        for (SubmitQuestion submitQuestion:submitQuestionList) {
            submitQuestion.setAnswer(getQuestion(submitQuestion.getQuestionId()).getAnswer());
        }
        return submitQuestionRepo.saveAll(submitQuestionList);
    }
}
