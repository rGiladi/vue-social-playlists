package com.me;

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.me.Authentication.UserModel;
import com.me.Authentication.UserRepository;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = SpringVueApplication.class)
public class UserControllerTest {

    private MockMvc mockMvc;
    
    @Autowired
    private ObjectMapper mapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WebApplicationContext webApplicationContext;
    
    private UserModel testUser;

    @Before
    public void setup() throws Exception {
        this.mockMvc = MockMvcBuilders
        				.webAppContextSetup(webApplicationContext)
        				.apply(springSecurity())
        				.build();
        testUser = new UserModel("1", "TestUser", "abc@example.com", "test-password", "test-password");
        userRepository.save(testUser);
    }

    @Test
    public void userShouldNotBeSavedBecauseAlreadyExists() throws Exception {
    	this.mockMvc.perform(post("/api/sign-up")
    			.contentType(MediaType.APPLICATION_JSON)
    			.content(mapper.writeValueAsString(testUser)))
    			.andExpect(status().isConflict());
    }
    
    @Test
    public void userShouldBeSavedSuccessfully() throws Exception {
    	testUser = new UserModel("2", "TestUser2", "abc2@example.com", "test-password2", "test-password2");
    	this.mockMvc.perform(post("/api/sign-up")
    			.contentType(MediaType.APPLICATION_JSON)
    			.content(mapper.writeValueAsString(testUser)))
    			.andExpect(status().isCreated());
    }
    
    @Test
    public void invalidUserDetailsShouldNotBeSaved() throws Exception {
    	testUser = new UserModel("3", "Test User # 3", "ac@z", "pa", "pa");
    	this.mockMvc.perform(post("/api/sign-up")
    			.contentType(MediaType.APPLICATION_JSON)
    			.content(mapper.writeValueAsString(testUser)))
    			.andExpect(status().isBadRequest());
    }

}
