package pl.pragmatists.starter;

import static java.util.Arrays.asList;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.ExclusionStrategy;
import com.google.gson.FieldAttributes;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class JsonHelpers {
    public static String buildJson(Object jsonDTO) throws JsonProcessingException {
        return new ObjectMapper().writeValueAsString(jsonDTO);
    }

    public static String buildJsonWithoutFields(Object jsonDTO, final String... fieldNames) {
        Gson gson = new GsonBuilder().setExclusionStrategies(new ExclusionStrategy() {
            @Override
            public boolean shouldSkipField(FieldAttributes f) {
                return asList(fieldNames).contains(f.getName());
            }

            @Override
            public boolean shouldSkipClass(Class<?> clazz) {
                return false;
            }
        }).create();
        return gson.toJson(jsonDTO);
    }
}
