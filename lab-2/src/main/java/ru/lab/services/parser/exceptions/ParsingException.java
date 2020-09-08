package ru.lab.services.parser.exceptions;

public final class ParsingException extends Exception {
  public ParsingException() {
    super();
  }

  public ParsingException(String message) {
    super(message);
  }

  public ParsingException(String message, Throwable cause) {
    super(message, cause);
  }

  public ParsingException(Throwable cause) {
    super(cause);
  }
}
