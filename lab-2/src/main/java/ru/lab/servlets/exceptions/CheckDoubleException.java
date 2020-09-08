package ru.lab.servlets.exceptions;

public final class CheckDoubleException extends Exception {
  public CheckDoubleException() {
    super();
  }

  public CheckDoubleException(String message) {
    super(message);
  }

  public CheckDoubleException(String message, Throwable cause) {
    super(message, cause);
  }

  public CheckDoubleException(Throwable cause) {
    super(cause);
  }
}
