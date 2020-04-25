package com.apex.ecotool.model;

import java.time.Duration;
import java.time.LocalTime;

public class Field {

    private final int id;
    private String fieldName;
    private Crop plantedCrop;
    private LocalTime plantTime;
    private LocalTime nextHarvest;
    private Duration growthTime;
    private boolean selfRegenFullyGrown;

    public Field(int id, Crop plantedCrop) {
        this.id = id;
        this.fieldName = "";
        this.plantedCrop = plantedCrop;
        this.plantTime = null;
        this.nextHarvest = null;
        this.growthTime = plantedCrop.getGrowthTime();
        selfRegenFullyGrown = false;
    }

    public int getId() {
        return id;
    }

    public String getFieldName() {
        return fieldName;
    }

    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
    }

    public Crop getPlantedCrop() {
        return plantedCrop;
    }

    public void setPlantedCrop(Crop plantedCrop) {
        this.plantedCrop = plantedCrop;
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

    public Duration getGrowthTime() {
        return growthTime;
    }

    public void setGrowthTime(Duration growthTime) {
        this.growthTime = growthTime;
    }

    public boolean isSelfRegenFullyGrown() {
        return selfRegenFullyGrown;
    }

    public void setSelfRegenFullyGrown(boolean selfRegenFullyGrown) {
        this.selfRegenFullyGrown = selfRegenFullyGrown;
    }
}
