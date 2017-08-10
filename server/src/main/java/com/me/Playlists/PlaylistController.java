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

import com.fasterxml.jackson.databind.ObjectMapper;
import com.me.Authentication.UserModel;
import com.me.Authentication.UserRepository;
import com.me.Security.ValidateUserRequest;

@RestController
@RequestMapping("api/playlists/")
public class PlaylistController {

	@Autowired
	private UserRepository userRepository;
	
	/*
	 * Retrieve a specific playlist doesn't rquire authorization.
	 */
	
	@Autowired
	private ValidateUserRequest validateUser;
	
	@Autowired
	private ObjectMapper mapper;
	
	@GetMapping("{user}/{indx}")
	ResponseEntity<?> getPlaylistFromList(@PathVariable("user") String username,
			@PathVariable("indx") int playlist_indx, HttpServletRequest req) {
		
		UserModel user = userRepository.findByUsername(username);
		if (user != null) {
			try {
				
				PlaylistModel p = user.getPlaylists().get(playlist_indx);
				p.setPassword("");
				
				HashMap<String, Object> data = new HashMap<String, Object>();
				data.put("playlist", p);
				data.put("authenticatedUser", validateUser.softValidate(req, username));
				
				return ResponseEntity.ok(data);
			} catch (Exception ex) {
				return ResponseEntity.badRequest().body("Playlist doesn't exist");
			}
		} 
		return ResponseEntity.badRequest().body("User doesn't exist");
	}
	
	@PostMapping("{user}/{indx}")
	ResponseEntity<?> addSongToPlaylist(@PathVariable("user") String username,
			@PathVariable("indx") int playlist_indx, @RequestBody HashMap<String, Object> data,
			HttpServletRequest req) {
		
		UserModel user = userRepository.findByUsername(username);
		if (user != null) {
			try {
				PlaylistModel p = user.getPlaylists().get(playlist_indx);
				validateUser.validate(req, username, (String) data.get("password"), p.getPassword());
				p.getSongs().add(mapper.convertValue(data.get("song"), SongModel.class));
				user.getPlaylists().set(playlist_indx, p);
				userRepository.save(user);
				return ResponseEntity.ok(null);
			} catch (Exception ex) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
			}
		}
		
		return ResponseEntity.badRequest().body("User doesn't exist");
	}
	
	@DeleteMapping("{user}/{indx}")
	ResponseEntity<?> deleteSongFromPlaylist(@PathVariable("user") String username,
			@PathVariable("indx") int playlist_indx, @RequestParam("songIndx") int song_indx,
			@RequestParam("password") String password, HttpServletRequest req) {
		UserModel user = userRepository.findByUsername(username);
		if (user != null) {
			try {
				PlaylistModel p = user.getPlaylists().get(playlist_indx);
				validateUser.validate(req, username, password , p.getPassword()); // Throws an exception if not valid
				p.getSongs().remove(song_indx);
				user.getPlaylists().set(playlist_indx, p);
				userRepository.save(user);
				return ResponseEntity.ok(null);
			} catch (Exception ex) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
			}
		}
		
		return ResponseEntity.badRequest().body("User doesn't exist");
	}
	
	
}
