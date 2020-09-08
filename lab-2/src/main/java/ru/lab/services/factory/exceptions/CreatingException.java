package ru.lab.services.factory.exceptions;

public final class CreatingException extends Exception {
  public CreatingException() {
    super();
  }

  public CreatingException(String message) {
    super(message);
  }

  public CreatingException(String message, Throwable cause) {
    super(message, cause);
  }

  public CreatingException(Throwable cause) {
    super(cause);
  }
}
