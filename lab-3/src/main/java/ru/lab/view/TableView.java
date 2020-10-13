package ru.lab.view;

import lombok.extern.log4j.Log4j2;
import ru.lab.model.dao.EntityDAO;
import ru.lab.model.dao.daos.exceptions.InterruptedTransactionException;
import ru.lab.model.entities.HitResult;

import javax.ejb.EJB;
import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import javax.faces.context.FacesContext;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.ResourceBundle;

@Log4j2
@ManagedBean
@ApplicationScoped
public class TableView {
  private static final String CANNOT_GET_ALL_HIT_RESULTS_EXCEPTION;
  private static final String CANNOT_CLEAR_HIT_RESULTS_EXCEPTION;

  static {
    ResourceBundle resourceBundle = ResourceBundle.getBundle("messages.TableView");
    CANNOT_GET_ALL_HIT_RESULTS_EXCEPTION =
        resourceBundle.getString("exceptions.cannotGetAllHitResults");
    CANNOT_CLEAR_HIT_RESULTS_EXCEPTION =
        resourceBundle.getString("exceptions.cannotClearHitResults");
  }

  @EJB private EntityDAO<Long, HitResult> hitResultDAO;
  @Inject private ErrorView errorView;

  public List<HitResult> getHitResultList() {
    List<HitResult> hitResultsFromDB = new ArrayList<>();

    try {
      hitResultsFromDB = hitResultDAO.getAll();
    } catch (InterruptedTransactionException e) {
      log.info(() -> "Cannot get all hit results from the database", e);
      errorView.setMessage(CANNOT_GET_ALL_HIT_RESULTS_EXCEPTION);
      FacesContext.getCurrentInstance()
          .getApplication()
          .getNavigationHandler()
          .handleNavigation(FacesContext.getCurrentInstance(), null, "/error.xhtml");
    }

    log.info(() -> "Got all hit results from the database successfully.");
    return hitResultsFromDB;
  }

  public void clearTable() {
    try {
      hitResultDAO.deleteAll();
      log.info(() -> "Cleared hit results successfully.");
    } catch (InterruptedTransactionException e) {
      log.error(() -> "Cannot clean hot results.", e);
      errorView.showError(
          String.format("%s %s", CANNOT_CLEAR_HIT_RESULTS_EXCEPTION, e.getMessage()));
    }
  }
}
