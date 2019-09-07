package com.happywheelers.app.repository;

import com.happywheelers.app.domain.Business;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Business entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BusinessRepository extends MongoRepository<Business, String> {

}
