package com.me;

import java.io.InputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.io.ClassPathResource;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.me.Authentication.UserModel;
import com.me.Authentication.UserRepository;

@EnableScheduling
@SpringBootApplication
public class SpringVueApplication {
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	ObjectMapper mapper;

	public static void main(String[] args) {
		SpringApplication.run(SpringVueApplication.class, args);
	}
	
	@Scheduled(fixedRate=600000)
	private void reset_data() throws Exception {
		InputStream is = new ClassPathResource("data.json").getInputStream();
		UserModel user = mapper.readValue(is, UserModel.class);
		userRepository.save(user);
	}
}
