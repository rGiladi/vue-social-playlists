package com.me.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.me.Security.JwtTokenFilter;

@Configuration
public class Beans {

	@Bean
	public FilterRegistrationBean regsitration(JwtTokenFilter filter) {
		FilterRegistrationBean registration = new FilterRegistrationBean(filter);
		registration.setEnabled(false);
		return registration;
	}
	
}
