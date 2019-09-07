package com.happywheelers.app.repository.search;

import com.happywheelers.app.domain.Business;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Business} entity.
 */
public interface BusinessSearchRepository extends ElasticsearchRepository<Business, String> {
}
