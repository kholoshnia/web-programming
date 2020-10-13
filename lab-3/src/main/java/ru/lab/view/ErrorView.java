package ru.lab.view;

import lombok.extern.log4j.Log4j2;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import javax.faces.context.FacesContext;
import java.util.ResourceBundle;

@Log4j2
@ManagedBean
@ApplicationScoped
public class ErrorView {
  private static final String DEFAULT_ERROR_MESSAGE;

  static {
    ResourceBundle resourceBundle = ResourceBundle.getBundle("messages.ErrorView");
    DEFAULT_ERROR_MESSAGE = resourceBundle.getString("messages.defaultError");
  }

  private String message;

  public String getMessage() {
    String contextMessage = getContextMessage();
    if (contextMessage == null || contextMessage.trim().isEmpty()) {
      if (message == null || message.trim().isEmpty()) {
        log.info("Returning default error message: {}.", () -> DEFAULT_ERROR_MESSAGE);
        return DEFAULT_ERROR_MESSAGE;
      }
      log.info("Returning error message: {}.", () -> message);
      return message;
    }
    log.info("Returning context error message: {}.", () -> contextMessage);
    return contextMessage;
  }

  public void setMessage(String message) {
    log.info("Setting error message: {}.", () -> message);
    this.message = message;
  }

  private String getContextMessage() {
    return (String)
        FacesContext.getCurrentInstance()
            .getExternalContext()
            .getRequestMap()
            .get("javax.servlet.error.message");
  }

  public void showError(String message) {
    setMessage(message);
    FacesContext.getCurrentInstance()
        .getApplication()
        .getNavigationHandler()
        .handleNavigation(FacesContext.getCurrentInstance(), null, "/error.xhtml");
  }
}
