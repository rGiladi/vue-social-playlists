package com.me.config;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HandleRequests {
	
	@RequestMapping("/{[path:[^\\.]*}")
	String app() {
		return "forward:/";
	}
}
