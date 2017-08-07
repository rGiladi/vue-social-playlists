package com.me;

import java.io.InputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.io.ClassPathResource;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.me.Authentication.UserModel;
import com.me.Authentication.UserRepository;

@SpringBootApplication
public class SpringVueApplication implements CommandLineRunner {
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	ObjectMapper mapper;

	public static void main(String[] args) {
		SpringApplication.run(SpringVueApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		InputStream is = new ClassPathResource("data.json").getInputStream();
		UserModel user = mapper.readValue(is, UserModel.class);
		userRepository.save(user);
	}
}
