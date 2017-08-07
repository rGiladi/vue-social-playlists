package com.me.Playlists;

import org.springframework.beans.factory.annotation.Autowired;
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
@RequestMapping("api/playlist/")
public class PlaylistsListController {

	@Autowired
	private UserRepository userRepository;
	
	@GetMapping("{user}/{indx}")
	ResponseEntity<?> getPlaylistFromList(@PathVariable("user") String username,
			@PathVariable("indx") int playlist_indx) {
		UserModel user = userRepository.findByUsername(username);
		if (user != null) {
			try {
				PlaylistModel p = user.getPlaylists().get(playlist_indx);
				p.setPassword("");
				return ResponseEntity.ok(p);
			} catch (Exception ex) {
				return ResponseEntity.badRequest().body("Playlist doesn't exist");
			}
		} 
		return ResponseEntity.badRequest().body("User doesn't exist");
	}
}
