package com.happywheelers.app.repository;

import com.happywheelers.app.domain.Insurance;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Insurance entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InsuranceRepository extends MongoRepository<Insurance, String> {

}
