package com.dlphsolution.ecommerce.backend.infrastructure.adapter;

import com.dlphsolution.ecommerce.backend.domain.model.Category;
import com.dlphsolution.ecommerce.backend.domain.port.ICategoryRepository;
import com.dlphsolution.ecommerce.backend.infrastructure.mapper.CategoryMapper;
import org.springframework.stereotype.Repository;

@Repository
public class CategoryCRUDRepositoryImpl implements ICategoryRepository {
    private final ICategoryCRUDRepository iCategoryCRUDRepository;
    private final CategoryMapper categoryMapper;

    public CategoryCRUDRepositoryImpl(ICategoryCRUDRepository iCategoryCRUDRepository, CategoryMapper categoryMapper) {
        this.iCategoryCRUDRepository = iCategoryCRUDRepository;
        this.categoryMapper = categoryMapper;
    }


    @Override
    public Category save(Category category) {
        return categoryMapper.toCategory(iCategoryCRUDRepository.save(categoryMapper.toCategoryEntity(category)));
    }

    @Override
    public Iterable<Category> findAll() {
        return categoryMapper.toCategoryList(iCategoryCRUDRepository.findAll());
    }

    @Override
    public Category findById(Integer id) {
        return categoryMapper.toCategory(iCategoryCRUDRepository.findById(id).orElseThrow(
                ()-> new RuntimeException("La Categoria no fue encontrada o no existe")
        ));
    }

    @Override
    public void deleteById(Integer id) {
        iCategoryCRUDRepository.findById(id).orElseThrow(
                () -> new RuntimeException("La Categoria no fue encontrada o no existe")
        );
        iCategoryCRUDRepository.deleteById(id);
    }
}
