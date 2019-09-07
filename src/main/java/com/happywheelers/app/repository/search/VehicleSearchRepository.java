package com.happywheelers.app.repository.search;

import com.happywheelers.app.domain.Vehicle;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Vehicle} entity.
 */
public interface VehicleSearchRepository extends ElasticsearchRepository<Vehicle, String> {
}
