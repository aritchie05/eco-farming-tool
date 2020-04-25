package com.apex.ecotool.entity;

import java.time.Duration;
import java.time.LocalTime;

public class FieldEntity {

    private int id;
    private String fieldName;
    private String plantedCropId;
    private LocalTime plantTime;
    private LocalTime nextHarvest;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFieldName() {
        return fieldName;
    }

    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
    }

    public String getPlantedCropId() {
        return plantedCropId;
    }

    public void setPlantedCropId(String plantedCropId) {
        this.plantedCropId = plantedCropId;
    }

    public LocalTime getPlantTime() {
        return plantTime;
    }

    public void setPlantTime(LocalTime plantTime) {
        this.plantTime = plantTime;
    }

    public LocalTime getNextHarvest() {
        return nextHarvest;
    }

    public void setNextHarvest(LocalTime nextHarvest) {
        this.nextHarvest = nextHarvest;
    }
}
