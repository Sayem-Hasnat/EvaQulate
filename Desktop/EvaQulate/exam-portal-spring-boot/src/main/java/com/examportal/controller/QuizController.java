package com.examportal.controller;

import com.examportal.dto.*;
import com.examportal.entity.*;
import com.examportal.service.*;
import freemarker.template.TemplateException;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@CrossOrigin
@RequestMapping("/quiz")
public class QuizController {
    private final UserService userService;
    private final QuizService quizService;
    private final CategoryService categoryService;
    private final QuestionService questionService;
    private final EmailService emailService;

    public QuizController(UserService userService, QuizService quizService, CategoryService categoryService, QuestionService questionService, EmailService emailService) {
        this.userService = userService;
        this.quizService = quizService;
        this.categoryService = categoryService;
        this.questionService = questionService;
        this.emailService = emailService;
    }

    /*--------------------------------------------------*/
    @PostMapping("/")
    public ResponseEntity<?> addQuiz(@RequestBody QuizDto quizDto) {
        Quiz quiz = new Quiz();
        BeanUtils.copyProperties(quizDto, quiz);
        quiz.setCode(this.generateQuizCode());
        quiz.setCategory(this.categoryService.getCategory(quizDto.getCategoryDto().getCategoryId()));
        quizService.saveQuiz(quiz);
        return ResponseEntity.ok(new ResponseDto("Save"));
    }

    @GetMapping("/teacher-quizzes/{username}")
    public ResponseEntity<?> getTeacherAllQuizzes(@PathVariable("username") String username) {
        List<Quiz> quizList = quizService.getQuizByUsername(username);
        return ResponseEntity.ok(getQuizDtoList(quizList));
    }

    @DeleteMapping("/delete/{quizId}")
    public ResponseEntity<?> deleteQuiz(@PathVariable("quizId") Long quizId) {
        this.quizService.deleteQuiz(quizId);
        return ResponseEntity.ok(new ResponseDto("Delete"));
    }

    @PutMapping("/update-type")
    public ResponseEntity<?> updateQuizType(@RequestBody QuizDto quizDto) {
        Quiz quiz = this.quizService.getQuiz(quizDto.getQuizId());
        quiz.setIsPublic(quizDto.getIsPublic());
        this.quizService.saveQuiz(quiz);
        return ResponseEntity.ok(new ResponseDto("Quiz Type Update"));
    }

    @PutMapping("/update-visibility")
    public ResponseEntity<?> updateQuizVisibility(@RequestBody QuizDto quizDto) {
        Quiz quiz = this.quizService.getQuiz(quizDto.getQuizId());
        quiz.setIsEnable(quizDto.getIsEnable());
        this.quizService.saveQuiz(quiz);
        return ResponseEntity.ok(new ResponseDto("Quiz Visibility Update"));
    }

    @GetMapping("/disable-quiz/{quizId}")
    public ResponseEntity<?> disableQuizAfterExam(@PathVariable("quizId") Long quizId) {
        this.quizService.disableQuiz(quizId);
        return ResponseEntity.ok(new ResponseDto("Disable Quiz"));
    }


    @PutMapping("/schedule")
    public ResponseEntity<?> setQuizSchedule(@RequestBody QuizScheduleDto quizScheduleDto) {
        Quiz quiz = this.quizService.getQuiz(quizScheduleDto.getQuizId());
        quiz.setDate(quizScheduleDto.getDate());
        quiz.setStartTime(quizScheduleDto.getStartTime());
        quiz.setEndTime(quizScheduleDto.getEndTime());
        this.quizService.saveQuiz(quiz);
        return ResponseEntity.ok(new ResponseDto("Set Schedule"));
    }

    @GetMapping("/questions/{quizId}")
    public ResponseEntity<?> getAllQuestionsOfQuiz(@PathVariable("quizId") Long quizId) {
        Quiz quiz = this.quizService.getQuiz(quizId);
        return ResponseEntity.ok(getQuizQuestionDtoSet(quiz));
    }

    @GetMapping("/active-quizzes")
    public ResponseEntity<?> getAllActiveQuizzes() {
        List<Quiz> quizList = quizService.getAllActiveQuizzes();
        return ResponseEntity.ok(getQuizDtoList(quizList));
    }

    @GetMapping("/get-quiz/{quizId}")
    public ResponseEntity<?> getQuizInformation(@PathVariable("quizId") Long quizId) {
        Quiz quiz = quizService.getQuiz(quizId);
        return ResponseEntity.ok(getQuizDto(quiz));
    }

    @GetMapping("/find-quiz/{code}")
    public ResponseEntity<?> getQuizByCode(@PathVariable("code") String code) {
        Quiz quiz = quizService.getQuizByCode(code);
        if (quiz != null) {
            return ResponseEntity.ok(getQuizDto(quiz));
        } else {
            return ResponseEntity.ok(new ResponseDto("Not Found"));
        }

    }

    @GetMapping("/start/{quizId}")
    public ResponseEntity<?> getQuizQuestionsForExam(@PathVariable("quizId") Long quizId) throws ParseException {
        Quiz quiz = this.quizService.getQuiz(quizId);
        ExamQuizDto examQuizDto = getExamQuizDto(quiz);

        //Need Time Counting Code
        if (quiz.getStartTime() != null && quiz.getEndTime() != null) {
            examQuizDto.setQuizTime(this.timeCount(quiz.getStartTime(), quiz.getEndTime()));

            //Remaining Time For Quiz
            DateTimeFormatter timeFormat = DateTimeFormatter.ofPattern("hh:mm a");
            LocalDateTime now = LocalDateTime.now();
            String currentTime = timeFormat.format(now);
            examQuizDto.setRemainingTime(this.timeCount(currentTime, quiz.getEndTime()));
        } else {
            examQuizDto.setQuizTime((long) examQuizDto.getNumberOfQuestion() * 2 * 60 * 1000);
            examQuizDto.setRemainingTime((long) examQuizDto.getNumberOfQuestion() * 2 * 60 * 1000);

        }

        return ResponseEntity.ok(examQuizDto);
    }

    @PostMapping("/submit/{username}")
    public ResponseEntity<?> submitQuizExam(@PathVariable("username") String username, @RequestBody SubmitQuizDto submitQuizDto) throws MessagingException, TemplateException, IOException {
        SubmitQuiz submitQuiz = this.getSubmitQuiz(submitQuizDto);
        List<SubmitQuestion> submitQuestionList = this.questionService.saveSubmitQuestionList(submitQuiz.getSubmitQuestionList());
        submitQuiz.setSubmitQuestionList(submitQuestionList);
        submitQuiz.setUsername(username);
        SubmitQuiz savedSubmitQuiz = this.quizService.submitQuiz(submitQuiz);

        emailService.sendQuizResultEmail(savedSubmitQuiz, this.getEmailDetails(savedSubmitQuiz.getUsername(), "Quiz Result"));
        return ResponseEntity.ok(this.getSubmitQuizDto(savedSubmitQuiz));
    }

    private Email getEmailDetails(String username, String subject) {
        Email email = new Email();
        email.setTo(this.userService.getEmail(username));
        email.setFrom("tajbir0106@gmail.com");
        email.setSubject(subject);
        return email;
    }

    @GetMapping("/result/{submitQuizId}")
    public ResponseEntity<?> getQuizExamResult(@PathVariable("submitQuizId") Long submitQuizId) {
        return ResponseEntity.ok(this.getSubmitQuizDto(this.quizService.getSubmitQuiz(submitQuizId)));
    }

    @GetMapping("/quiz-participant-result/{quizId}")
    public ResponseEntity<?> getQuizParticipantsResult(@PathVariable("quizId") Long quizId) {
        return ResponseEntity.ok(this.getSubmitQuizDtoList(this.quizService.getQuizParticipantsResult(quizId)));
    }

    @GetMapping("/quiz-participant-result-pdf/{quizId}")
    public ResponseEntity<?> getQuizParticipantsResultPdf(@PathVariable("quizId") Long quizId) throws FileNotFoundException, JRException {
        Quiz quiz = quizService.getQuiz(quizId);
        String filePath = ResourceUtils.getFile("classpath:templates/pdf/QuizParticipantsResult.jrxml").getAbsolutePath();

        List<SubmitQuizDto> list = this.getSubmitQuizDtoList(this.quizService.getQuizParticipantsResult(quizId));
        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(list);

        Map<String, Object> parameters = new HashMap<>();
        parameters.put("quizTitle", quiz.getTitle());
        parameters.put("quizCode", quiz.getCode());
        parameters.put("createdBy", quiz.getCreatedBy());
        parameters.put("tableData", dataSource);

        JasperReport report = JasperCompileManager.compileReport(filePath);

        JasperPrint print = JasperFillManager.fillReport(report, parameters, new JREmptyDataSource());

        byte[] pdfArray = JasperExportManager.exportReportToPdf(print);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("filename", "Result.pdf");

        return new ResponseEntity(pdfArray, headers, HttpStatus.OK);
    }



    /*--------------------- HELPER METHOD ----------------------*/

    private String generateQuizCode() {
        UUID uuid = UUID.randomUUID();
        return uuid.toString().substring(0, 7);
    }

    private QuizDto getQuizDto(Quiz quiz) {
        QuizDto quizDto = new QuizDto();
        BeanUtils.copyProperties(quiz, quizDto);

        CategoryDto categoryDto = new CategoryDto();
        BeanUtils.copyProperties(quiz.getCategory(), categoryDto);
        quizDto.setCategoryDto(categoryDto);
        return quizDto;
    }

    private List<QuizDto> getQuizDtoList(List<Quiz> quizList) {
        List<QuizDto> quizDtoList = new ArrayList<>();
        for (Quiz quiz : quizList) {
            QuizDto quizDto = new QuizDto();
            BeanUtils.copyProperties(quiz, quizDto);

            CategoryDto categoryDto = new CategoryDto();
            BeanUtils.copyProperties(quiz.getCategory(), categoryDto);
            quizDto.setCategoryDto(categoryDto);

            quizDtoList.add(quizDto);
        }
        return quizDtoList;
    }

    private Set<QuestionDto> getQuizQuestionDtoSet(Quiz quiz) {
        Set<QuestionDto> questionDtoSet = new HashSet<>();
        for (Question question : quiz.getQuestionSet()) {
            QuestionDto questionDto = new QuestionDto();
            BeanUtils.copyProperties(question, questionDto);
            questionDtoSet.add(questionDto);
        }
        return questionDtoSet;
    }

    private ExamQuizDto getExamQuizDto(Quiz quiz) {
        ExamQuizDto examQuizDto = new ExamQuizDto();
        BeanUtils.copyProperties(quiz, examQuizDto);

        /*--Remove Question Answer & Convert it To Shuffle Questions--*/
        Set<QuestionDto> questionDtoSet = this.getQuizQuestionDtoSet(quiz);
        List<QuestionDto> questionDtoList = new ArrayList<>(this.removeAnswer(questionDtoSet));
        if (questionDtoList.size() > quiz.getNumberOfQuestion()) {
            questionDtoList = questionDtoList.subList(0, quiz.getNumberOfQuestion());
        }
        Collections.shuffle(questionDtoList);
        examQuizDto.setQuestionDtoList(questionDtoList);
        return examQuizDto;
    }

    private Set<QuestionDto> removeAnswer(Set<QuestionDto> questionDtoSet) {
        Set<QuestionDto> questionDtoSet1 = new HashSet<>();
        for (QuestionDto questionDto : questionDtoSet) {
            questionDto.setAnswer(null);
            questionDtoSet1.add(questionDto);
        }
        return questionDtoSet1;
    }

    private SubmitQuiz getSubmitQuiz(SubmitQuizDto submitQuizDto) {
        SubmitQuiz submitQuiz = new SubmitQuiz();
        BeanUtils.copyProperties(submitQuizDto, submitQuiz);

        List<SubmitQuestion> submitQuestionList = new ArrayList<>();
        for (SubmitQuestionDto submitQuestionDto : submitQuizDto.getSubmitQuestionDtoList()) {
            SubmitQuestion submitQuestion = new SubmitQuestion();
            BeanUtils.copyProperties(submitQuestionDto, submitQuestion);
            submitQuestionList.add(submitQuestion);
        }
        submitQuiz.setSubmitQuestionList(submitQuestionList);
        return submitQuiz;
    }

    private SubmitQuizDto getSubmitQuizDto(SubmitQuiz submitQuiz) {
        SubmitQuizDto submitQuizDto = new SubmitQuizDto();
        BeanUtils.copyProperties(submitQuiz, submitQuizDto);
        List<SubmitQuestionDto> submitQuestionDtoList = new ArrayList<>();
        for (SubmitQuestion submitQuestion : submitQuiz.getSubmitQuestionList()) {
            SubmitQuestionDto submitQuestionDto = new SubmitQuestionDto();
            BeanUtils.copyProperties(submitQuestion, submitQuestionDto);
            submitQuestionDtoList.add(submitQuestionDto);
        }
        submitQuizDto.setSubmitQuestionDtoList(submitQuestionDtoList);
        return submitQuizDto;
    }

    private List<SubmitQuizDto> getSubmitQuizDtoList(List<SubmitQuiz> submitQuizList) {
        List<SubmitQuizDto> submitQuizDtoList = new ArrayList<>();
        for (SubmitQuiz submitQuiz : submitQuizList) {
            submitQuizDtoList.add(this.getSubmitQuizDto(submitQuiz));
        }
        return submitQuizDtoList;
    }


    public long timeCount(String time1, String time2) throws ParseException {
        SimpleDateFormat format = new SimpleDateFormat("hh:mm a");
        Date date1 = format.parse(time1);
        Date date2 = format.parse(time2);
        return date2.getTime() - date1.getTime();
    }

}
