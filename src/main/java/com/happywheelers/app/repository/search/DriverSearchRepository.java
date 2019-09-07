package com.happywheelers.app.repository.search;

import com.happywheelers.app.domain.Driver;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Driver} entity.
 */
public interface DriverSearchRepository extends ElasticsearchRepository<Driver, String> {
}
