package com.dlphsolution.ecommerce.backend.application;

import com.dlphsolution.ecommerce.backend.domain.model.User;
import com.dlphsolution.ecommerce.backend.domain.port.IUserRepository;

public class RegistrationService {
    private final IUserRepository iUserRepository;

    public RegistrationService(IUserRepository iUserRepository) {
        this.iUserRepository = iUserRepository;
    }

    public User register (User user){
        return iUserRepository.save(user);
    }
}
