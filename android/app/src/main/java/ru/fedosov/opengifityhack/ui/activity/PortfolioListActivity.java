package ru.fedosov.opengifityhack.ui.activity;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.RecyclerView;

import com.arellomobile.mvp.MvpAppCompatActivity;
import com.arellomobile.mvp.presenter.InjectPresenter;

import butterknife.Bind;
import butterknife.ButterKnife;
import ru.fedosov.opengifityhack.R;
import ru.fedosov.opengifityhack.ui.presenter.PortfolioListPresenter;
import ru.fedosov.opengifityhack.ui.view.PortfolioListView;

/**
 * Created by Максим on 16.09.2017.
 */

public class PortfolioListActivity extends AppCompatActivity implements PortfolioListView {

    PortfolioListPresenter mPortfolioPresenter;
    @Bind(R.id.recycler_view)
    RecyclerView recyclerView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_portfolio);
        ButterKnife.bind(this);
        mPortfolioPresenter = new PortfolioListPresenter(this);
    }

    @Override
    protected void onStart() {
        super.onStart();
        mPortfolioPresenter.getPortfolios();
    }

    @Override
    public void onGetPortfoioResult() {

    }
}
