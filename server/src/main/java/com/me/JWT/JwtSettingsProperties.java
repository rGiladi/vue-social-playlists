package com.me.JWT;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Configuration
@ConfigurationProperties(prefix="jwt")
public class JwtSettingsProperties {
	
	public String key;

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}
}
