package com.dlphsolution.ecommerce.backend.infrastructure.adapter;

import com.dlphsolution.ecommerce.backend.domain.model.User;
import com.dlphsolution.ecommerce.backend.domain.port.IUserRepository;
import com.dlphsolution.ecommerce.backend.infrastructure.mapper.UserMapper;
import org.springframework.stereotype.Repository;

@Repository
public class UserCRUDRepositoryImpl implements IUserRepository {
    private final IUserCRUDRepository iUserCRUDRepository;
    private final UserMapper userMapper;

    public UserCRUDRepositoryImpl(IUserCRUDRepository iUserCRUDRepository, UserMapper userMapper) {
        this.iUserCRUDRepository = iUserCRUDRepository;
        this.userMapper = userMapper;
    }

    @Override
    public User save(User user) {
        return userMapper.toUser(iUserCRUDRepository.save(userMapper.toUserEntity(user)));
    }

    @Override
    public User findByEmail(String email) {
        return userMapper.toUser(iUserCRUDRepository.findByEmail(email).orElseThrow(
                ()-> new RuntimeException("El usuario no fue encontrado")
        ));
    }

    @Override
    public User findById(Integer id) {
        return userMapper.toUser(iUserCRUDRepository.findById(id).get());
    }
}
