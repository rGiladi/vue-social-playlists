package com.me.Security;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Component;

@Component
public class ValidateUserRequest {

	public String softValidate (HttpServletRequest req, String playlistAuthor) {
		
		String userFromToken = (String) req.getAttribute("userFromToken");
		
		if (userFromToken != null && userFromToken.equals(playlistAuthor)) {
			return userFromToken;
		} 
		else {
			return null;
		}
	}
	
	/* 
	 * Validate endpoints that can get a password instead of jwToken. 
	 * Auth is required so throws an Exception if password/jwt not valid
	 */
	
	public String validate(HttpServletRequest req, String playlistAuthor, String inputPassword,
			String playlistPassword) throws Exception {
		
		String userFromToken = (String) req.getAttribute("userFromToken");
		
		if (userFromToken != null && userFromToken.equals(playlistAuthor) || inputPassword.equals(playlistPassword)) {
			return userFromToken;
		}
		
		if (userFromToken != null && !userFromToken.equals(playlistAuthor) && !inputPassword.equals(playlistPassword)) {
			throw new Exception("Invalid password, please try again");
		}
		
		if (userFromToken == null && !inputPassword.equals(playlistPassword)) {
			throw new Exception("Invalid password, please try again");
		}
		else {
			return null;
		}
	}
	
}
