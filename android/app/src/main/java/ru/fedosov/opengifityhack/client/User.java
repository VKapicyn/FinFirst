package ru.fedosov.opengifityhack.client;

import com.google.gson.annotations.SerializedName;

/**
 * Created by Максим on 16.09.2017.
 */
public class User {
    @SerializedName("_id")
    String id;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
