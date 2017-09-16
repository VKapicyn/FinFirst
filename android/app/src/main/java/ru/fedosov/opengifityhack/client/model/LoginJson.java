package ru.fedosov.opengifityhack.client.model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class LoginJson {
    @SerializedName("login")
    @Expose
    private String login;
    @SerializedName("password")
    @Expose
    private String password;

    public LoginJson(String login, String password) {
        this.login = login;
        this.password = password;
    }

}