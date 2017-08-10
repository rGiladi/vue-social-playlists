package com.me.config;

import org.springframework.boot.autoconfigure.web.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HandleErrors implements ErrorController {

	private static final String PATH = "/error";
	
    @RequestMapping(value = PATH)
    public String error() {
        return "/";
    }
    
	@Override
	public String getErrorPath() {
		// TODO Auto-generated method stub
		return null;
	}
	
}
