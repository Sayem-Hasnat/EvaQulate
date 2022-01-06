package com.examportal.service;

import com.examportal.entity.Email;
import com.examportal.entity.SubmitQuiz;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Service
@EnableAsync
public class EmailService {

    private final JavaMailSender javaMailSender;
    private final Configuration config;

    public EmailService(JavaMailSender javaMailSender, Configuration config) {
        this.javaMailSender = javaMailSender;
        this.config = config;
    }

    @Async
    public void sendQuizResultEmail(SubmitQuiz submitQuiz, Email email) throws MessagingException, IOException, TemplateException {
        MimeMessage message = javaMailSender.createMimeMessage();

        /* --set mediaType-- */
        MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                StandardCharsets.UTF_8.name());

        /* --add attachment--*/
        helper.addAttachment("logo.png", new ClassPathResource("templates/email/logo.png"));

        /* --Select Email Template-- */
        Template template = config.getTemplate("/email/quiz-result.ftl");

        Map<String, Object> emailBody = new HashMap<>();
        emailBody.put("quizTitle", submitQuiz.getTitle());
        emailBody.put("totalCorrectAnswer", submitQuiz.getTotalCorrectAnswer());
        emailBody.put("totalWrongAnswer", submitQuiz.getNumberOfQuestion() - submitQuiz.getTotalCorrectAnswer());
        emailBody.put("marks", submitQuiz.getMaxMarks() / submitQuiz.getNumberOfQuestion() * submitQuiz.getTotalCorrectAnswer());
        emailBody.put("maxMarks", submitQuiz.getMaxMarks());


        String html = FreeMarkerTemplateUtils.processTemplateIntoString(template, emailBody);

        helper.setTo(email.getTo());
        helper.setText(html, true);
        helper.setSubject(email.getSubject());
        helper.setFrom(email.getFrom());
        javaMailSender.send(message);


    }


}
