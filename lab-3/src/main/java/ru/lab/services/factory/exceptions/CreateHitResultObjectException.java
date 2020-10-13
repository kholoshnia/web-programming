package ru.lab.services.factory.exceptions;

public class CreateHitResultObjectException extends Exception {
  public CreateHitResultObjectException() {
    super();
  }

  public CreateHitResultObjectException(String message) {
    super(message);
  }

  public CreateHitResultObjectException(String message, Throwable cause) {
    super(message, cause);
  }

  public CreateHitResultObjectException(Throwable cause) {
    super(cause);
  }
}
