package com.me.Authentication;

import java.security.Key;
import java.util.Date;
import java.util.UUID;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtils {
	
	@Value("${jwt.api-key}")
	String JWT_KEY;
	
	public String generateJWT(String issuer) {
		
		SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

	    byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(JWT_KEY);
	    Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());
	    
	    JwtBuilder builder = Jwts.builder().setId(UUID.randomUUID().toString()).
    									setIssuedAt(new Date())
	    								.setIssuer(issuer)
						    			.setSubject("USER")
						    			.signWith(signatureAlgorithm, signingKey)
	    								.setExpiration(new Date(new Date().getTime() + (3600 * 1000 * 24)));			
	    
	    return builder.compact();
	    
	}
	
	public Claims parseJWT(String jwt) {
		
		Claims claims = Jwts.parser()
				.setSigningKey(DatatypeConverter.parseBase64Binary(JWT_KEY))
				.parseClaimsJws(jwt).getBody();
		return claims;
	}
}
