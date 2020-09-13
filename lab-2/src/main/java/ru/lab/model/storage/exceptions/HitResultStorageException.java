package ru.lab.model.storage.exceptions;

public final class HitResultStorageException extends Exception {
  public HitResultStorageException() {
    super();
  }

  public HitResultStorageException(String message) {
    super(message);
  }

  public HitResultStorageException(String message, Throwable cause) {
    super(message, cause);
  }

  public HitResultStorageException(Throwable cause) {
    super(cause);
  }
}
