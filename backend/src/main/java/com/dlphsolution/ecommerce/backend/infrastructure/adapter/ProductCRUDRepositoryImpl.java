package com.dlphsolution.ecommerce.backend.infrastructure.adapter;

import com.dlphsolution.ecommerce.backend.domain.model.Product;
import com.dlphsolution.ecommerce.backend.domain.port.IProductRepository;
import com.dlphsolution.ecommerce.backend.infrastructure.mapper.ProductMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@AllArgsConstructor
public class ProductCRUDRepositoryImpl implements IProductRepository {
    private final IProductCRUDRepository iProductCRUDRepository;
    private final ProductMapper productMapper;

    @Override
    public Product save(Product product) {
        return productMapper.toProduct(iProductCRUDRepository.save(productMapper.toProductEntity(product)));
    }

    @Override
    public Iterable<Product> findAll() {
        return productMapper.toProductList(iProductCRUDRepository.findAll());
    }

    @Override
    public Product findById(Integer id) {
        return productMapper.toProduct(iProductCRUDRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Producto no existente o no encontrado")
        ));
    }

    @Override
    public void deleteById(Integer id) {
        iProductCRUDRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Producto no existente o no encontrado")
        );
        iProductCRUDRepository.deleteById(id);
    }
}
