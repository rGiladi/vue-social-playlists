package com.me.Authentication;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.me.Playlists.PlaylistModel;
import com.me.Security.JwtUtils;

@RestController
@RequestMapping("api/auth/")
public class AuthenticationController {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BCryptPasswordEncoder bCrypt;
	
	@Autowired
	JwtUtils jwt;

	@PostMapping("sign-up")
	public ResponseEntity<?> newAccount (@RequestBody @Validated UserModel user) {
		if (userRepository.findByUsername(user.getUsername()) == null && userRepository.findByEmail(user.getEmail()) == null) {
			
			List<PlaylistModel> userPlaylists = user.getPlaylists(); 
			if (!userPlaylists.isEmpty()) {
				userPlaylists.get(0).setPassword(bCrypt.encode(userPlaylists.get(0).getPassword()));
				user.setPlaylists(userPlaylists);
			}
			
			user.setPassword(bCrypt.encode(user.getPassword()));
			userRepository.save(user);
			
			return ResponseEntity.status(HttpStatus.CREATED).body(jwt.generateResponseObject(user.getUsername()));
		} else {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
		}
	}
	
	@PostMapping("login")
	public ResponseEntity<?> login (@RequestBody UserModel user) {
		UserModel authUser = userRepository.findByUsername(user.getUsername());
		if (authUser != null && bCrypt.matches(user.getPassword(), authUser.getPassword())) {
			return ResponseEntity.status(HttpStatus.OK).body(jwt.generateResponseObject(user.getUsername()));
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect username/password");
	}
	
}
