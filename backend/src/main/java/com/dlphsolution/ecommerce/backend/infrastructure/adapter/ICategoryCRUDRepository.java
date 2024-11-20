package com.dlphsolution.ecommerce.backend.infrastructure.adapter;

import com.dlphsolution.ecommerce.backend.infrastructure.entity.CategoryEntity;
import org.springframework.data.repository.CrudRepository;

public interface ICategoryCRUDRepository extends CrudRepository<CategoryEntity, Integer> {

}
