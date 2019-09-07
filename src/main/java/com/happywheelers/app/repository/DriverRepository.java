package com.happywheelers.app.repository;

import com.happywheelers.app.domain.Driver;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Driver entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DriverRepository extends MongoRepository<Driver, String> {

}
