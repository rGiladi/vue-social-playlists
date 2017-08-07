package com.me.Security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;

@Configuration
public class JwtTokenFilter extends OncePerRequestFilter {
	
	@Autowired
	private JwtUtils jwtUtils;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		String token = request.getHeader("Authorization");
		
		if (token != null) {
			try {
				Claims claims = jwtUtils.parseJWT(token.replace("Bearer ", ""));
				request.setAttribute("userFromToken", claims.getIssuer());
				filterChain.doFilter(request, response);
			} catch (Exception ex) {
				response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
			}	
		} else {
			filterChain.doFilter(request, response);
		}
		
	}

}
