package ru.lab.view;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.log4j.Log4j2;
import ru.lab.model.dao.EntityDAO;
import ru.lab.model.dao.daos.exceptions.InterruptedTransactionException;
import ru.lab.model.entities.HitResult;
import ru.lab.services.factory.HitResultFactory;
import ru.lab.services.factory.exceptions.CreateHitResultObjectException;

import javax.ejb.EJB;
import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.ResourceBundle;

@Log4j2
@Getter
@Setter
@ManagedBean
@ApplicationScoped
public class SubmitView {
  private static final String CANNOT_CREATE_HIT_RESULT_EXCEPTION;
  private static final String CANNOT_INSERT_HIT_RESULT_EXCEPTION;

  static {
    ResourceBundle resourceBundle = ResourceBundle.getBundle("messages.SubmitView");
    CANNOT_CREATE_HIT_RESULT_EXCEPTION =
        resourceBundle.getString("exceptions.cannotCreateHitResult");
    CANNOT_INSERT_HIT_RESULT_EXCEPTION =
        resourceBundle.getString("exceptions.cannotInsertHitResult");
  }

  @EJB private EntityDAO<Long, HitResult> entityDAO;
  @EJB private HitResultFactory hitResultFactory;
  @Inject private ErrorView errorView;

  private boolean xValue1;
  private boolean xValue2;
  private boolean xValue3;
  private boolean xValue4;
  private boolean xValue5;
  private boolean xValue6;
  private boolean xValue7;

  private String yValue;
  private String rValue;

  public void submitHitResult() {
    List<String> xValues = getXValues();
    for (String xValue : xValues) {
      try {
        HitResult hitResult = hitResultFactory.createHitResult(xValue, yValue, rValue);
        log.info(() -> "Hit result instance was created successfully.");
        entityDAO.insert(hitResult);
        log.info(() -> "Hit result was inserted successfully.");
      } catch (CreateHitResultObjectException e) {
        log.error(() -> "Cannot create new hit result instance.", e);
        errorView.showError(
            String.format("%s %s", CANNOT_CREATE_HIT_RESULT_EXCEPTION, e.getMessage()));
      } catch (InterruptedTransactionException e) {
        log.error(() -> "Cannot insert hit result to the database.", e);
        errorView.showError(
            String.format("%s %s", CANNOT_INSERT_HIT_RESULT_EXCEPTION, e.getMessage()));
      }
    }
  }

  private List<String> getXValues() {
    return new ArrayList<String>() {
      {
        if (xValue1) add("-3");
        if (xValue2) add("-2");
        if (xValue3) add("-1");
        if (xValue4) add("0");
        if (xValue5) add("1");
        if (xValue6) add("2");
        if (xValue7) add("3");
      }
    };
  }
}
