package ru.lab.model.dao.daos.exceptions;

public class NoSuchElementInDatabaseException extends Exception {
  public NoSuchElementInDatabaseException() {
    super();
  }

  public NoSuchElementInDatabaseException(String message) {
    super(message);
  }

  public NoSuchElementInDatabaseException(String message, Throwable cause) {
    super(message, cause);
  }

  public NoSuchElementInDatabaseException(Throwable cause) {
    super(cause);
  }
}
