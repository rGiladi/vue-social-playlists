package com.me.Authentication;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<UserModel, String> {
	UserModel findByUsername(String username);
	UserModel findByEmail(String email);
}
