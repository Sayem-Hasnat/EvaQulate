package com.examportal.controller;

import com.examportal.dto.CategoryDto;
import com.examportal.dto.ResponseDto;
import com.examportal.entity.Category;
import com.examportal.service.CategoryService;
import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashSet;
import java.util.Set;

@RestController
@CrossOrigin
@RequestMapping("/category")
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }


    @PostMapping("/")
    public ResponseEntity<?> addCategory(@RequestBody CategoryDto categoryDto) {
        if (this.categoryService.findCategory(categoryDto.getTitle()) == null) {
            Category category = new Category();
            BeanUtils.copyProperties(categoryDto, category);
            this.categoryService.saveCategory(category);
            return ResponseEntity.ok(new ResponseDto("Save"));
        } else {
            return ResponseEntity.ok(new ResponseDto("Already Exist"));
        }
    }

    /*----------------------------------------------------------------------*/
    @GetMapping("/all-category")
    public ResponseEntity<?> getAllCategory() {
        Set<CategoryDto> categoryDtoSet = this.getCategoryDtoSet(this.categoryService.getAllCategory());
        return ResponseEntity.ok(categoryDtoSet);
    }

    @GetMapping("/{categoryId}")
    public ResponseEntity<?> getAllCategory(@PathVariable("categoryId") Long categoryId) {
        CategoryDto categoryDto = new CategoryDto();
        Category category = this.categoryService.getCategory(categoryId);
        BeanUtils.copyProperties(category, categoryDto);
        return ResponseEntity.ok(categoryDto);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateCategory(@RequestBody CategoryDto categoryDto) {
        if (this.categoryService.findCategory(categoryDto.getTitle()) == null) {
            Category category = new Category();
            BeanUtils.copyProperties(categoryDto, category);
            this.categoryService.saveCategory(category);
            return ResponseEntity.ok(new ResponseDto("Update"));
        } else {
            return ResponseEntity.ok(new ResponseDto("Title Already Used"));
        }
    }

    @DeleteMapping("/delete/{categoryId}")
    public ResponseEntity<?> deleteCategory(@PathVariable("categoryId") Long categoryId) {
        this.categoryService.deleteCategory(categoryId);
        return ResponseEntity.ok(new ResponseDto("Delete"));
    }



    /*------------------------HELPER METHODS-----------------------*/

    private Set<CategoryDto> getCategoryDtoSet(Set<Category> categorySet) {
        Set<CategoryDto> categoryDtoSet = new LinkedHashSet<>();
        for (Category category : categorySet) {
            CategoryDto categoryDto = new CategoryDto();
            BeanUtils.copyProperties(category, categoryDto);
            categoryDtoSet.add(categoryDto);
        }
        return categoryDtoSet;
    }

}
