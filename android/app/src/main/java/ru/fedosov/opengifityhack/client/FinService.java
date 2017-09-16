package ru.fedosov.opengifityhack.client;

import java.util.HashMap;

import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Query;
import ru.fedosov.opengifityhack.client.model.GuestLoginJson;
import rx.Observable;

public interface FinService {

    @POST("/reg")
    rx.Observable<String> reg(@Body HashMap<String, Object> body);

    @GET("/im")
    rx.Observable<User> getUsers(@Query("imei") String imei);

    @POST("/api/setUser")
    Observable<User> guestLogin(@Body GuestLoginJson body);

}