package ru.fedosov.opengifityhack.client.model;

/**
 * Created by Максим on 16.09.2017.
 */

public class GuestLoginJson {

    private String imei;
    private String name;
    private String age;

    public GuestLoginJson(String imei, String name, String age) {
        this.imei = imei;
        this.name = name;
        this.age = age;
    }

    public String getImei() {
        return imei;
    }

    public void setImei(String imei) {
        this.imei = imei;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }
}
