package com.apex.ecotool.controller;

import com.apex.ecotool.entity.FieldEntity;
import com.apex.ecotool.model.Crop;
import com.apex.ecotool.model.Field;
import com.apex.ecotool.repository.CropRepository;
import com.apex.ecotool.util.CropSerializer;
import com.apex.ecotool.util.FieldSerializer;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Controller
public class IndexController {

    private static final Logger LOGGER = LoggerFactory.getLogger(IndexController.class);

    private final CropRepository cropRepository;

    private final ObjectMapper objectMapper;

    private static final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("HH:mm");

    private static final Random random = new Random();

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

    @GetMapping("/addField/{numFields}")
    public String addFieldRow(@PathVariable int numFields, Model model) {
        Field field = createRandomField(numFields + 1);
        model.addAttribute("fields", Collections.singletonList(field));
        return "fragments/fieldRow";
    }

    @PostMapping("/addFieldsFromCookie")
    public String addFieldsFromCookie(@RequestBody String fieldJsonList, Model model) {
        LOGGER.info("Adding fields from cookie: {}", fieldJsonList);
        List<Field> fields = new ArrayList<>();
        try {
            JSONArray fieldJsonArray = new JSONArray(fieldJsonList);
            for (int i = 0; i < fieldJsonArray.length(); i++) {
                JSONObject fieldJsonObj = fieldJsonArray.getJSONObject(i);
                int id = fieldJsonObj.getInt("id");
                String fieldName = fieldJsonObj.getString("fieldName");
                String cropId = fieldJsonObj.getString("plantedCropId");
                String plantTimeString = fieldJsonObj.getString("plantTime");
                LocalTime plantTime = null;
                if (!plantTimeString.isEmpty()) {
                    plantTime = LocalTime.from(dateTimeFormatter.parse(plantTimeString));
                }
                String nextHarvestString = fieldJsonObj.getString("nextHarvest");
                LocalTime nextHarvest = null;
                if (!nextHarvestString.isEmpty()) {
                    nextHarvest = LocalTime.from(dateTimeFormatter.parse(nextHarvestString));
                }
                boolean selfRegenFullyGrown = fieldJsonObj.getBoolean("selfRegenFullyGrown");
                Optional<Crop> optionalCrop = cropRepository.findById(cropId);
                if (optionalCrop.isPresent()) {
                    Crop crop = optionalCrop.get();
                    Field field = new Field(id, crop);
                    field.setFieldName(fieldName);
                    field.setPlantTime(plantTime);
                    field.setNextHarvest(nextHarvest);
                    if (selfRegenFullyGrown) {
                        field.setGrowthTime(crop.getGrowthTime().dividedBy(2));
                    } else {
                        field.setGrowthTime(crop.getGrowthTime());
                    }
                    fields.add(field);
                }
            }
        } catch (JSONException e) {
            LOGGER.error("Encountered json exception while getting fields from cookie ", e);
        }
        model.addAttribute("fields", fields);
        return "fragments/fieldRow";
    }

    @PostMapping(value = "/plantField", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<String> plantField(@RequestBody String fieldJson) {
        ResponseEntity<String> responseEntity;

        try {
            JSONObject fieldJsonObj = new JSONObject(fieldJson);

            String plantTimeString = fieldJsonObj.getString("plantTime");
            LocalTime plantTime = LocalTime.from(dateTimeFormatter.parse(plantTimeString));

            FieldEntity fieldEntity = new FieldEntity();
            fieldEntity.setId(fieldJsonObj.getInt("id"));
            fieldEntity.setPlantTime(plantTime);
            fieldEntity.setPlantedCropId(fieldJsonObj.getString("plantedCropId"));

            Optional<Crop> optionalCrop = cropRepository.findById(fieldEntity.getPlantedCropId());

            if (optionalCrop.isPresent()) {
                Crop crop = optionalCrop.get();
                Field resultField = new Field(fieldEntity.getId(), crop);
                resultField.setPlantTime(fieldEntity.getPlantTime());
                resultField.setNextHarvest(fieldEntity.getPlantTime().plus(crop.getGrowthTime()));
                String responseJson = objectMapper.writeValueAsString(resultField);
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(APPLICATION_JSON);
                responseEntity = new ResponseEntity<>(responseJson, headers, HttpStatus.OK);
            } else {
                responseEntity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (JSONException | JsonProcessingException e) {
            responseEntity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return responseEntity;
    }

    @PostMapping("/harvestField")
    public ResponseEntity<String> harvestField(@RequestBody String fieldJson) {
        ResponseEntity<String> responseEntity;

        try {
            JSONObject fieldJsonObj = new JSONObject(fieldJson);
            Optional<Crop> optionalCrop = cropRepository.findById(fieldJsonObj.getString("plantedCropId"));

            if (optionalCrop.isPresent()) {
                Crop crop = optionalCrop.get();
                Field resultField = new Field(fieldJsonObj.getInt("id"), crop);

                if (crop.isSelfRegenerating()) {
                    Duration newGrowthTime = resultField.getGrowthTime().dividedBy(2);

                    String nextHarvestString = fieldJsonObj.getString("nextHarvest");
                    LocalTime nextHarvest = LocalTime.from(dateTimeFormatter.parse(nextHarvestString));

                    resultField.setNextHarvest(nextHarvest.plus(newGrowthTime));
                    resultField.setGrowthTime(newGrowthTime);
                    resultField.setSelfRegenFullyGrown(true);

                    resultField.setPlantTime(nextHarvest);
                } else {
                    resultField.setPlantTime(null);
                    resultField.setNextHarvest(null);
                }

                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(APPLICATION_JSON);
                String responseJson = objectMapper.writeValueAsString(resultField);
                responseEntity = new ResponseEntity<>(responseJson, headers, HttpStatus.OK);
            } else {
                responseEntity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

        } catch (JSONException | JsonProcessingException e) {
            responseEntity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return responseEntity;
    }

    private Field createRandomField(int id) {
        List<Crop> crops = cropRepository.findAll();
        int randomInt = random.nextInt(crops.size());
        LOGGER.info("Creating random field with int generated: {}", randomInt);
        Crop crop = crops.get(randomInt);
        return new Field(id, crop);
    }
}
