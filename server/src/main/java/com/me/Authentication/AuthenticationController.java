package com.me.Authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/auth/")
public class AuthenticationController {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BCryptPasswordEncoder bCrypt;
	
	@Autowired
	JwtUtils jwt;

	@RequestMapping(value="sign-up", method=RequestMethod.POST)
	@ResponseBody public ResponseEntity<Object> newAccount (@RequestBody @Validated UserModel user) {
		if (userRepository.findByUsername(user.getUsername()) == null || userRepository.findByEmail(user.getEmail()) == null) {
			user.setPassword(bCrypt.encode(user.getPassword()));
			userRepository.save(user);
			return ResponseEntity.status(HttpStatus.CREATED).body(jwt.generateJWT(user.getUsername()));
		} else {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
		}
	}
	
	@RequestMapping(value="login", method=RequestMethod.POST)
	@ResponseBody public ResponseEntity<Object> login (@RequestBody UserModel user) {
		UserModel authUser = userRepository.findByUsername(user.getUsername());
		if (authUser != null && bCrypt.matches(user.getPassword(), authUser.getPassword())) {
			return ResponseEntity.status(HttpStatus.OK).body(jwt.generateJWT(user.getUsername()));
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
	}
	
	
}
