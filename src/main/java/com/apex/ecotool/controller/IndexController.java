package com.apex.ecotool.controller;

import com.apex.ecotool.model.Crop;
import com.apex.ecotool.model.Field;
import com.apex.ecotool.repository.CropRepository;
import com.apex.ecotool.util.CropSerializer;
import com.apex.ecotool.util.FieldSerializer;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON;

@Controller
public class IndexController {

    private final CropRepository cropRepository;

    private final ObjectMapper objectMapper;

    public IndexController(CropRepository cropRepository) {
        this.cropRepository = cropRepository;
        this.objectMapper = new ObjectMapper();
        SimpleModule module = new SimpleModule();
        module.addSerializer(new FieldSerializer(Field.class));
        module.addSerializer(new CropSerializer(Crop.class));
        objectMapper.registerModule(module);
    }

    @ModelAttribute("crops")
    public List<Crop> allCrops() {
        return cropRepository.findAll(Sort.by("name"));
    }

    @GetMapping("/allCrops")
    public ResponseEntity<String> getAllCrops() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(APPLICATION_JSON);
        ResponseEntity<String> responseEntity;
        try {
            String cropsJson = objectMapper.writeValueAsString(cropRepository.findAll(Sort.by("name")));
            responseEntity = new ResponseEntity<>(cropsJson, headers, HttpStatus.OK);
        } catch (JsonProcessingException e) {
            responseEntity =  new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return responseEntity;
    }

    @GetMapping("/")
    public String getIndex(Model model) {
        return "index";
    }
}
