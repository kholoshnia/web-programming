package ru.lab.model.exceptions;

public final class HitResultListException extends Exception {
  public HitResultListException() {
    super();
  }

  public HitResultListException(String message) {
    super(message);
  }

  public HitResultListException(String message, Throwable cause) {
    super(message, cause);
  }

  public HitResultListException(Throwable cause) {
    super(cause);
  }
}
