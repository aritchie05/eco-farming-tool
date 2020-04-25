package com.apex.ecotool.repository;

import com.apex.ecotool.model.Crop;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CropRepository extends MongoRepository<Crop, String> {

}
