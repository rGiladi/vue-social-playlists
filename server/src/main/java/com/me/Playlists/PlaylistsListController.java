package com.me.Playlists;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.me.Authentication.UserModel;
import com.me.Authentication.UserRepository;

@RestController
@RequestMapping("api/playlists/")
public class PlaylistsListController {

	@Autowired
	private UserRepository userRepository;
	
	@GetMapping("{user}")
	ResponseEntity<?> getUserPlaylists(@PathVariable("user") String username, HttpServletRequest req) {
		String userFromToken = (String) req.getAttribute("userFromToken");
		if (username.equals(userFromToken)) {
			UserModel user = userRepository.findByUsername(username);
			if (user != null) {
				user.getPlaylists().forEach(playlist->playlist.setPassword(""));
				return ResponseEntity.ok(user.getPlaylists());
			} 
			return ResponseEntity.badRequest().body("User doesn't exist");
		} else {
			HashMap<String, Object> data = new HashMap<String, Object>();
			data.put("userFromToken", userFromToken);
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(data);
		}
	}
	
	@PostMapping("{user}")
	ResponseEntity<?> addPlaylist (@PathVariable("user") String username,
			@RequestBody PlaylistModel playlist) {
		UserModel user = userRepository.findByUsername(username);
		if (user != null) {
			if (!playlist.getTitle().isEmpty() && !playlist.getPassword().isEmpty()) {
				user.getPlaylists().add(playlist);
				userRepository.save(user);
				return ResponseEntity.ok(null);
			}
			else {
				return ResponseEntity.badRequest().body("Title and password fields are required");
			}
		} else {
			return ResponseEntity.badRequest().body("User doesn't exist");
		}
	}
	
	@DeleteMapping("{user}")
	ResponseEntity<?> deletePlaylist (@PathVariable("user") String username,
			@RequestParam("pid") int pid) {
		UserModel user = userRepository.findByUsername(username);
		if (user != null) {
			try {
				user.getPlaylists().remove(pid);
				userRepository.save(user);
				return ResponseEntity.ok(null);
			} catch (Exception ex) {
				return ResponseEntity.badRequest().body("Playlist doesn't exist");
			}
		}
		return ResponseEntity.badRequest().body("User doesn't exist");
	}
}
