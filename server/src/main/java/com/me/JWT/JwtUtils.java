package com.me.JWT;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.UUID;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@SuppressWarnings("unused")
@Configuration
public class JwtUtils {
	
	
	private JwtSettingsProperties jwtProps;
	private String KEY;
	
	@Autowired
	public JwtUtils (JwtSettingsProperties jwtProps) {
		this.jwtProps = jwtProps;
		this.KEY = jwtProps.getKey();
	}
	
	public String generateJWT(String issuer) {
		
		SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

	    byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(KEY);
	    Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());
	    
	    JwtBuilder builder = Jwts.builder().setId(UUID.randomUUID().toString()).
    									setIssuedAt(new Date())
	    								.setIssuer(issuer)
						    			.setSubject("USER")
						    			.signWith(signatureAlgorithm, signingKey)
	    								.setExpiration(new Date(new Date().getTime() + (3600 * 1000 * 72)));			
	    
	    return builder.compact();
	    
	}
	
	public Claims parseJWT(String jwt) {
		Claims claims = Jwts.parser()
				.setSigningKey(DatatypeConverter.parseBase64Binary(KEY))
				.parseClaimsJws(jwt).getBody();
		return claims;
	}
	
	public HashMap<String, String> generateResponseObject(String username) {
		HashMap<String, String> obj = new HashMap<String, String>();
		obj.put("jwt", generateJWT(username));
		obj.put("username", username);
		return obj;
	}
	
	public void test () {
		System.out.println(KEY);
	}
}
