package com.dlphsolution.ecommerce.backend.application;

import com.dlphsolution.ecommerce.backend.domain.model.Product;
import com.dlphsolution.ecommerce.backend.domain.port.IProductRepository;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public class ProductService {
    private final IProductRepository iProductRepository;
    private final UploadFileService uploadFileService;

    public ProductService(IProductRepository iProductRepository, UploadFileService uploadFileService) {
        this.iProductRepository = iProductRepository;
        this.uploadFileService = uploadFileService;
    }

    public Product save(Product product, MultipartFile multipartFile) throws IOException {
        if(product.getId() != 0){
            if(multipartFile == null){
                product.setUrlImage(product.getUrlImage());
            } else {
                String nameFile = product.getUrlImage().substring(29);
                if(!nameFile.equals("default.jpg")){
                    uploadFileService.delete(nameFile);
                }
                product.setUrlImage(uploadFileService.upload(multipartFile));
            }
        } else {
            product.setUrlImage(uploadFileService.upload(multipartFile));
        }
        return iProductRepository.save(product);
    }


    public Iterable<Product> findAll(){
        return iProductRepository.findAll();
    }

    public Product findById(Integer id){
        return iProductRepository.findById(id);
    }

    public void deleteById(Integer id){
        Product product = findById(id);
        String nameFile = product.getUrlImage().substring(29);
        if(!nameFile.equals("default.jpg")){
            uploadFileService.delete(nameFile);
        }
        iProductRepository.deleteById(id);
    }
}
