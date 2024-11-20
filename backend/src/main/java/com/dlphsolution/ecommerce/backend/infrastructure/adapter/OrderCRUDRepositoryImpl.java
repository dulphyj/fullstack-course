package com.dlphsolution.ecommerce.backend.infrastructure.adapter;

import com.dlphsolution.ecommerce.backend.domain.model.Order;
import com.dlphsolution.ecommerce.backend.domain.model.OrderState;
import com.dlphsolution.ecommerce.backend.domain.port.IOrderRepository;
import com.dlphsolution.ecommerce.backend.infrastructure.entity.OrderEntity;
import com.dlphsolution.ecommerce.backend.infrastructure.entity.UserEntity;
import com.dlphsolution.ecommerce.backend.infrastructure.mapper.OrderMapper;
import org.springframework.stereotype.Repository;

@Repository
public class OrderCRUDRepositoryImpl implements IOrderRepository {
    private final OrderMapper orderMapper;
    private final IOrderCRUDRepository iOrderCRUDRepository;

    public OrderCRUDRepositoryImpl(OrderMapper orderMapper, IOrderCRUDRepository iOrderCRUDRepository) {
        this.orderMapper = orderMapper;
        this.iOrderCRUDRepository = iOrderCRUDRepository;
    }

    @Override
    public Order save(Order order) {
        OrderEntity orderEntity = orderMapper.toOrderEntity(order);
        orderEntity.getOrderProducts().forEach(
                orderProductEntity -> orderProductEntity.setOrderEntity(orderEntity)
        );
        return orderMapper.toOrder(iOrderCRUDRepository.save(orderEntity));
    }

    @Override
    public Order findById(Integer id) {
        return orderMapper.toOrder(iOrderCRUDRepository.findById(id).orElseThrow(
                ()-> new RuntimeException("Orden no encontrada")
        ));
    }

    @Override
    public Iterable<Order> findAll() {
        return orderMapper.toOrderList(iOrderCRUDRepository.findAll());
    }

    @Override
    public Iterable<Order> findByUserId(Integer userId) {
        UserEntity userEntity = new UserEntity();
        userEntity.setId(userId);
        return orderMapper.toOrderList(iOrderCRUDRepository.findByUserEntity(userEntity));
    }

    @Override
    public void updateStateById(Integer id, String state) {
        if(state.equals(OrderState.CANCELLED)){
            iOrderCRUDRepository.updateStateById(id, OrderState.CANCELLED);
        }else{
            iOrderCRUDRepository.updateStateById(id,OrderState.CONFIRMED);
        }
    }
}
