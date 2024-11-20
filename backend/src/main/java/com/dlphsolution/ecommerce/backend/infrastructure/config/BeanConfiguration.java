package com.dlphsolution.ecommerce.backend.infrastructure.config;

import com.dlphsolution.ecommerce.backend.application.*;
import com.dlphsolution.ecommerce.backend.domain.port.ICategoryRepository;
import com.dlphsolution.ecommerce.backend.domain.port.IOrderRepository;
import com.dlphsolution.ecommerce.backend.domain.port.IProductRepository;
import com.dlphsolution.ecommerce.backend.domain.port.IUserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfiguration {
    @Bean
    public UserService userService(IUserRepository iUserRepository){
        return new UserService(iUserRepository);
    }

    @Bean
    public CategoryService categoryService(ICategoryRepository iCategoryRepository){
        return new CategoryService(iCategoryRepository);
    }

    @Bean
    public ProductService productService(IProductRepository iProductRepository, UploadFileService uploadFileService){
        return new ProductService(iProductRepository, uploadFileService);
    }

    @Bean
    public OrderService orderService(IOrderRepository iOrderRepository){
        return new OrderService(iOrderRepository);
    }

    @Bean
    public UploadFileService uploadFileService(){
        return  new UploadFileService();
    }

    @Bean
    public RegistrationService registrationService(IUserRepository iUserRepository){
        return new RegistrationService(iUserRepository);
    }
}
