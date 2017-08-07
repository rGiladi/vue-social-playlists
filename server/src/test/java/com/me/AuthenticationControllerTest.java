package com.me;

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
public class AuthenticationControllerTest {

    private MockMvc mockMvc;
    
    @Autowired
    private ObjectMapper mapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WebApplicationContext webApplicationContext;
    
    @Autowired
    BCryptPasswordEncoder bCrypt;
    
    private UserModel testUser;
    
    private String SIGNUP_PATH = "/api/auth/sign-up";
    
    private String LOGIN_PATH = "/api/auth/login";

    @Before
    public void setup() throws Exception {
    	this.mockMvc = MockMvcBuilders
			.webAppContextSetup(webApplicationContext)
			.apply(springSecurity())
			.build();
        testUser = new UserModel("1", "testuser", "abc@example.com", "test-password", "test-password", Collections.emptyList());
    }

    
    @Test
    public void userShouldBeSavedSuccessfully() throws Exception {
    	this.mockMvc.perform(post(SIGNUP_PATH)
			.contentType(MediaType.APPLICATION_JSON)
			.content(mapper.writeValueAsString(testUser)))
			.andExpect(status().isCreated());
    }
    
    @Test
    public void userShouldNotBeSavedBecauseAlreadyExists() throws Exception {
    	this.mockMvc.perform(post(SIGNUP_PATH)
			.contentType(MediaType.APPLICATION_JSON)
			.content(mapper.writeValueAsString(testUser)))
			.andExpect(status().isConflict());
    }
    
    @Test
    public void invalidUserDetailsShouldNotPassValidation() throws Exception {
    	testUser = new UserModel("2", "Test User # 2", "", "", "", Collections.emptyList());
    	this.mockMvc.perform(post(SIGNUP_PATH)
			.contentType(MediaType.APPLICATION_JSON)
			.content(mapper.writeValueAsString(testUser)))
			.andExpect(status().isBadRequest());
    }
    
    @Test
    public void userShouldLoginSucessfully () throws Exception {
    	this.mockMvc.perform(post(LOGIN_PATH).
			contentType(MediaType.APPLICATION_JSON)
			.content(mapper.writeValueAsString(testUser)))
			.andExpect(status().isOk());
    }
    
    @Test
    public void userShouldNotBeLoggedIn () throws Exception {
    	testUser.setPassword("invalid password");
    	this.mockMvc.perform(post(LOGIN_PATH).
			contentType(MediaType.APPLICATION_JSON)
			.content(mapper.writeValueAsString(testUser)))
			.andExpect(status().isUnauthorized());
    }

}
