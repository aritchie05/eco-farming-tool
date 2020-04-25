package com.apex.ecotool.util;

import com.apex.ecotool.model.Field;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public class FieldSerializer extends StdSerializer<Field> {

    private static final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("HH:mm");

    public FieldSerializer(Class<Field> t) {
        super(t);
    }

    @Override
    public void serialize(Field field, JsonGenerator jsonGenerator, SerializerProvider provider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeNumberField("id", field.getId());
        jsonGenerator.writeStringField("plantedCropId", field.getPlantedCrop().getId());
        if (field.getPlantTime() != null) {
            jsonGenerator.writeStringField("plantTime", dateTimeFormatter.format(field.getPlantTime()));
        } else {
            jsonGenerator.writeStringField("plantTime", "");
        }
        if (field.getNextHarvest() != null) {
            jsonGenerator.writeStringField("nextHarvest", dateTimeFormatter.format(field.getNextHarvest()));
        } else {
            jsonGenerator.writeStringField("nextHarvest", "");
        }
        jsonGenerator.writeStringField("growthTime", dateTimeFormatter.format(LocalTime.MIDNIGHT.plus(field.getGrowthTime())));
        jsonGenerator.writeBooleanField("selfRegenFullyGrown", field.isSelfRegenFullyGrown());
        jsonGenerator.writeEndObject();
    }
}
