package com.dlphsolution.ecommerce.backend.infrastructure.rest;

import com.dlphsolution.ecommerce.backend.application.ProductService;
import com.dlphsolution.ecommerce.backend.domain.model.Product;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;

@RestController
@RequestMapping("/api/v1/admin/products")
@Slf4j
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200/")
public class ProductController {
    private final ProductService productService;

    @PostMapping
    public ResponseEntity<Product> save(@RequestParam("id") Integer id,
                                        @RequestParam("code") String code,
                                        @RequestParam("name") String name,
                                        @RequestParam("description") String  description,
                                        @RequestParam("price") BigDecimal price,
                                        @RequestParam("urlImage")String urlImage,
                                        @RequestParam("userId")Integer userId,
                                        @RequestParam("categoryId")Integer categoryId,
                                        @RequestParam(value = "image", required = false) MultipartFile multipartFile
    ) throws IOException {
        Product product = new Product();
        product.setId(id);
        product.setCode(code);
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setCategoryId(categoryId);
        product.setUserId(userId);
        product.setUrlImage(urlImage);
        log.info("nombre : {}", product.getName());
        return new ResponseEntity<>(productService.save(product, multipartFile), HttpStatus.CREATED);
    }

    /*@PostMapping
    public ResponseEntity<Product> save1(@RequestBody Product product){
        log.info("nombre : {}", product.getName());
        return new ResponseEntity<>(productService.save(product), HttpStatus.CREATED);
    }*/

    @GetMapping
    public ResponseEntity<Iterable<Product>> findAll(){
        return ResponseEntity.ok(productService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> findById(@PathVariable Integer id){
        return ResponseEntity.ok(productService.findById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteById(@PathVariable Integer id){
        productService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
