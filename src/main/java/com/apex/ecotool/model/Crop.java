package com.apex.ecotool.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Duration;

@Document(collection = "crops")
public class Crop {

    @Id
    private final String id;
    private final String name;
    private final String biome;
    private final boolean isSelfRegenerating;
    private final Duration growthTime;

    public Crop(String id, String name, String biome, boolean isSelfRegenerating, Duration growthTime) {
        this.id = id;
        this.name = name;
        this.biome = biome;
        this.isSelfRegenerating = isSelfRegenerating;
        this.growthTime = growthTime;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getBiome() {
        return biome;
    }

    public boolean isSelfRegenerating() {
        return isSelfRegenerating;
    }

    public Duration getGrowthTime() {
        return growthTime;
    }

    @Override
    public String toString() {
        return "Crop{" +
                "name='" + name + '\'' +
                ", biome='" + biome + '\'' +
                ", isSelfRegenerating=" + isSelfRegenerating +
                ", growthTime=" + growthTime +
                '}';
    }
}
