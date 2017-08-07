package com.me.Authentication;

import java.util.List;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import com.me.Playlists.PlaylistModel;

@Document(collection="Users")
public class UserModel {
	
	@Id
	private String _id;
	
	@NotEmpty
	@Pattern(regexp = "^[A-Za-z0-9]+$")
	@Size(min = 4, max = 22)
	private String username;
	
	@NotEmpty
	@Email
	private String email;
	
	@NotEmpty
	@Size(min = 6, max = 32)
	private String password;
	
	@Transient
	@NotEmpty
	@Size(min = 6, max = 32)
	private String passwordMatch;
	
	private List<PlaylistModel> playlists;
	
	public UserModel(String _id, String username, String email, String password, String passwordMatch, List<PlaylistModel> playlists) {
		this._id = _id;
		this.username = username;
		this.email = email;
		this.password = password;
		this.passwordMatch = passwordMatch;
		this.playlists = playlists;
	}
	
	public UserModel() {}

	public String get_id() {
		return _id;
	}

	public void set_id(String _id) {
		this._id = _id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPasswordMatch() {
		return passwordMatch;
	}

	public void setPasswordMatch(String passwordMatch) {
		this.passwordMatch = passwordMatch;
	}

	public List<PlaylistModel> getPlaylists() {
		return playlists;
	}

	public void setPlaylists(List<PlaylistModel> playlists) {
		this.playlists = playlists;
	}

}
