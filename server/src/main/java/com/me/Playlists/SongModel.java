package com.me.Playlists;

public class SongModel {
	
	private String title;
	private String vidId;
	private String time;
	private String thumbnail;
	
	public SongModel(String title, String vidId, String time, String thumbnail) {
		this.title = title;
		this.vidId = vidId;
		this.time = time;
		this.thumbnail = thumbnail;
	}

	public SongModel() {}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getVidId() {
		return vidId;
	}
	public void setVidId(String vidId) {
		this.vidId = vidId;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	public String getThumbnail() {
		return thumbnail;
	}
	public void setThumbnail(String thumbnail) {
		this.thumbnail = thumbnail;
	}
	
}
