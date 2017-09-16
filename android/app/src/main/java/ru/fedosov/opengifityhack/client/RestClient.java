package ru.fedosov.opengifityhack.client;

import retrofit2.Retrofit;
import retrofit2.adapter.rxjava.RxJavaCallAdapterFactory;
import retrofit2.converter.gson.GsonConverterFactory;
import ru.fedosov.opengifityhack.client.model.GuestLoginJson;
import rx.Observable;

public class RestClient {

    private static FinService apiService;
    private static RestClient instance;

    private RestClient() {

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("http://192.168.0.136:8081/")
                .addCallAdapterFactory(RxJavaCallAdapterFactory.create())
                .addConverterFactory(GsonConverterFactory.create())

                .build();

        apiService = retrofit.create(FinService.class);
    }

    public static RestClient getInstance() {
        if (instance == null) {
            instance = new RestClient();
        }

        return instance;
    }

    public Observable<User> getModelsObservable(String email, String password) {
//        RequestBody body = RequestBody.create(MediaType.parse("text/plain"),"shit");
//        return  apiService.loginToken(new LoginJson(email,password));
        return Observable.just(new User());
    }

    public Observable<User> getUsers() {
        return apiService.getUsers("asdsad");
    }

    public Observable<User> guestLogin(String name, String age, String imei) {
        return apiService.guestLogin(new GuestLoginJson(imei, name, age));
    }
}