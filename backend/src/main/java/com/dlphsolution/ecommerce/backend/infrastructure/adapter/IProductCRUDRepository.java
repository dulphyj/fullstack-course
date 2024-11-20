package com.dlphsolution.ecommerce.backend.infrastructure.adapter;

import com.dlphsolution.ecommerce.backend.infrastructure.entity.ProductEntity;
import org.springframework.data.repository.CrudRepository;

public interface IProductCRUDRepository extends CrudRepository<ProductEntity, Integer> {
}
