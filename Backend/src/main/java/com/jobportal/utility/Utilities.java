package com.jobportal.utility;

import com.jobportal.entity.Sequence;
import com.jobportal.exception.JobPortalExpection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

@Component
public class Utilities {

    private static MongoOperations mongoOperations;

    @Autowired
    public Utilities(MongoOperations mongoOperations) {
        this.mongoOperations = mongoOperations;
    }

//    @Autowired
//    public void setMongoOperations(MongoOperations mongoOperations) {
//        Utilities.mongoOperations = mongoOperations;
//    }

    public static Long getNextSequence(String key) throws Exception {
        Query query = new Query(Criteria.where("_id").is(key));
        Update update = new Update().inc("seq", 1);
        FindAndModifyOptions options = new FindAndModifyOptions().returnNew(true).upsert(true);

        Sequence seq = mongoOperations.findAndModify(query, update, options, Sequence.class);
        if (seq == null) {
            throw new JobPortalExpection("Unable to get sequence id for key: " + key);
        }
        return seq.getSeq();
    }
//    public static Long getNextSequence(String key) throws JobPortalExpection {
//        Query query = new Query(Criteria.where("key").is(key));
//        Update update = new Update();
//        update.inc("sequence", 1);
//        FindAndModifyOptions options = new FindAndModifyOptions();
//        options.returnNew(true);
//        Sequence sequence = mongoOperations.findAndModify(query, update, options, Sequence.class);
//        if (sequence == null) {
//            throw new JobPortalExpection("Unable to get sequence id for key: "+key);
//        }
//        return sequence.getSeq();
//
//    }
}
