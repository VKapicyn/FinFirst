package ru.fedosov.opengifityhack.ui.activity;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.telephony.TelephonyManager;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.arellomobile.mvp.MvpAppCompatActivity;
import com.arellomobile.mvp.presenter.InjectPresenter;
import com.arellomobile.mvp.presenter.PresenterType;

import butterknife.Bind;
import butterknife.ButterKnife;
import butterknife.OnClick;
import ru.fedosov.opengifityhack.R;
import ru.fedosov.opengifityhack.ui.presenter.GuestLoginPresenter;
import ru.fedosov.opengifityhack.ui.view.GuestLoginView;
import ru.fedosov.opengifityhack.ui.view.PortfolioListView;

/**
 * Created by Максим on 16.09.2017.
 */

public class GuestLoginActivity extends AppCompatActivity implements GuestLoginView {

    @Bind(R.id.name_field)
    EditText mNameEditText;
    @Bind(R.id.age_field)
    EditText mAgeEditText;
    @Bind(R.id.send_button)
    Button mSighInButton;
    GuestLoginPresenter mGuestLoginPresenter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_guest_login);
        ButterKnife.bind(this);
        mGuestLoginPresenter = new GuestLoginPresenter(this);
        mSighInButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                onGuestLogin();
            }
        });
    }


    public void onGuestLogin() {
        TelephonyManager telephonyManager = (TelephonyManager) getSystemService(Context.TELEPHONY_SERVICE);
        mGuestLoginPresenter.guestLogin(mNameEditText.getText().toString()
                ,mAgeEditText.getText().toString(),
                telephonyManager.getDeviceId());
    }

    public void onGuestLoginResult(boolean success) {
        if (success) {
            startActivity(new Intent(this, PortfolioListActivity.class));
        }
    }

    @Override
    public void showError(String message) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show();
    }
}
