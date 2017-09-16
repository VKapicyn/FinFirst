package ru.fedosov.opengifityhack.ui.activity;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.arellomobile.mvp.MvpAppCompatActivity;
import com.arellomobile.mvp.presenter.InjectPresenter;

import butterknife.Bind;
import butterknife.ButterKnife;
import butterknife.OnClick;
import ru.fedosov.opengifityhack.R;
import ru.fedosov.opengifityhack.ui.presenter.LoginPresenter;
import ru.fedosov.opengifityhack.ui.view.LoginView;

public class LoginActivity extends MvpAppCompatActivity implements LoginView {

    @InjectPresenter
    LoginPresenter mLoginPresenter;

    @Bind(R.id.login_field)
    EditText mLoginView;
    @Bind(R.id.password_field)
    EditText mPasswordView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        ButterKnife.bind(this);
    }

    @OnClick(R.id.sign_in_button)
    public void startLoginProcess() {
        mLoginView.setError(null);
        mPasswordView.setError(null);
        String email = mLoginView.getText().toString();
        String password = mPasswordView.getText().toString();
        if (TextUtils.isEmpty(email) || TextUtils.isEmpty(password)) {
            Toast.makeText(this, getString(R.string.login_empty_fields_message), Toast.LENGTH_SHORT).show();
            if (TextUtils.isEmpty(email)) {
                mLoginView.setError(getString(R.string.error_field_required));
                mLoginView.requestFocus();
            } else if (TextUtils.isEmpty(password)) {
                mPasswordView.setError(getString(R.string.error_invalid_password));
                mPasswordView.requestFocus();
            }
        } else mLoginPresenter.runLogin(email, password);
    }

    @OnClick(R.id.guest_login_button)
    public void onGuestLogin() {
        startActivity(new Intent(this, GuestLoginActivity.class));
    }

    @Override
    public void onLoginResult(boolean success) {
        if (success) {
            startActivity(new Intent(this, PortfolioListActivity.class));
        }
    }
}
