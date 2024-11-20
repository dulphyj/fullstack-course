package com.dlphsolution.ecommerce.backend.infrastructure.adapter;

import com.dlphsolution.ecommerce.backend.domain.model.OrderState;
import com.dlphsolution.ecommerce.backend.infrastructure.entity.OrderEntity;
import com.dlphsolution.ecommerce.backend.infrastructure.entity.UserEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface IOrderCRUDRepository extends CrudRepository<OrderEntity, Integer> {
    @Transactional
    @Modifying
    @Query("UPDATE OrderEntity o SET o.orderState = :state WHERE o.id = :id")
    void updateStateById(Integer id, OrderState state);
    Iterable<OrderEntity>findByUserEntity(UserEntity userEntity);
}
