package com.me;

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.me.Authentication.UserModel;
import com.me.Authentication.UserRepository;
import com.me.Playlists.PlaylistModel;
import com.me.Playlists.SongModel;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = SpringVueApplication.class)
public class PlaylistsControllerTest {

    private MockMvc mockMvc;
    
    @Autowired
    private ObjectMapper mapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WebApplicationContext webApplicationContext;
    
    private UserModel testUser;
    
    private String API_PREFIX = "/api/playlists/";

    @Before
    public void setup() throws Exception {
		this.mockMvc = MockMvcBuilders
				.webAppContextSetup(webApplicationContext)
				.apply(springSecurity())
				.build();
		SongModel s = new SongModel("Test Song", "zaSpUvBM2AI", "PT1H28M", "https://i.ytimg.com/vi/MOJsczJTJk0/mqdefault.jpg"); // details of a random youtube video.
		PlaylistModel p = new PlaylistModel("Default Playlist", "12345", Arrays.asList(s));
		testUser = new UserModel("1", "testuser", "roy@gmail.com","12345", "12345", Arrays.asList(p));
		userRepository.save(testUser);
    }
    
	@Test
	public void requestShouldReturnUserPlaylistsListAndBadRequestForUnexistsUser() throws Exception {
		this.mockMvc.perform(get(API_PREFIX + "testuser")).andExpect(status().isOk());
		this.mockMvc.perform(get(API_PREFIX + "UserWhichDoesntExist")).andExpect(status().isBadRequest());
	}
  
	@Test
	public void requestShouldReturnPlaylistFromListAndBadRequestForInvalidPlaylistIndex() throws Exception {
		this.mockMvc.perform(get(API_PREFIX + "testuser/0")).andExpect(status().isOk());
		this.mockMvc.perform(get(API_PREFIX + "testuser/1")).andExpect(status().isBadRequest());
	}

}
