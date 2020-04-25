package com.apex.ecotool;

import com.mongodb.client.MongoDatabase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

@Service
public class MongoDbService {

    private final MongoDbFactory mongoDbFactory;
    private final MongoTemplate mongoTemplate;

    @Autowired
    public MongoDbService(MongoDbFactory mongoDbFactory, MongoTemplate mongoTemplate) {
        this.mongoDbFactory = mongoDbFactory;
        this.mongoTemplate = mongoTemplate;
    }

    public MongoDatabase getMongoDatabase() {
        return mongoDbFactory.getDb();
    }

    public MongoTemplate getMongoTemplate() {
        return mongoTemplate;
    }
}
