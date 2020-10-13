package ru.lab.model.dao.daos.exceptions;

public class InterruptedTransactionException extends Exception {
  public InterruptedTransactionException() {
    super();
  }

  public InterruptedTransactionException(String message) {
    super(message);
  }

  public InterruptedTransactionException(String message, Throwable cause) {
    super(message, cause);
  }

  public InterruptedTransactionException(Throwable cause) {
    super(cause);
  }
}
