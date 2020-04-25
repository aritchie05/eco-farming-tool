package com.apex.ecotool.util;

import com.apex.ecotool.model.Crop;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;

public class CropSerializer extends StdSerializer<Crop> {

    public CropSerializer(Class<Crop> t) {
        super(t);
    }

    @Override
    public void serialize(Crop crop, JsonGenerator jsonGenerator, SerializerProvider provider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeStringField("id", crop.getId());
        jsonGenerator.writeStringField("name", crop.getName());
        jsonGenerator.writeStringField("biome", crop.getBiome());
        jsonGenerator.writeBooleanField("isSelfRegenerating", crop.isSelfRegenerating());
        jsonGenerator.writeStringField("growthTime", crop.getGrowthTime().toString().substring(2));
        jsonGenerator.writeEndObject();
    }
}
