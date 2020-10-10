package com.apex.ecotool.controller;

import com.apex.ecotool.model.Crop;
import com.apex.ecotool.model.Field;
import com.apex.ecotool.util.CropSerializer;
import com.apex.ecotool.util.FieldSerializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {

    private final ObjectMapper objectMapper;

    public IndexController() {
        this.objectMapper = new ObjectMapper();
        SimpleModule module = new SimpleModule();
        module.addSerializer(new FieldSerializer(Field.class));
        module.addSerializer(new CropSerializer(Crop.class));
        objectMapper.registerModule(module);
    }

    @GetMapping("/")
    public String getIndex(Model model) {
        return "index";
    }
}
