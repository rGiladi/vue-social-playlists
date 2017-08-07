package com.me.Playlists;

import java.util.List;

public class PlaylistModel {
	
	private String title;
	private String password;
	private List<SongModel> songs;
	
	public PlaylistModel(String title, String password, List<SongModel> songs) {
		this.title = title;
		this.password = password;
		this.songs = songs;
	}

	public PlaylistModel() {
	}
	
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<SongModel> getSongs() {
		return songs;
	}
	public void setSongs(List<SongModel> songs) {
		this.songs = songs;
	}
	
	
}

