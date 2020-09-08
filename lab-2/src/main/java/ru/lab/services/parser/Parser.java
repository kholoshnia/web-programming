package ru.lab.services.parser;

import ru.lab.services.parser.exceptions.ParsingException;

/** The Parser class allows you to parse a string into different data types. */
public final class Parser {
  /**
   * Parses double string.
   *
   * @param doubleString double string to parse
   * @return parsed double
   * @throws ParsingException - in case of any parsing exception
   */
  public Double parseDouble(String doubleString) throws ParsingException {
    if (doubleString == null) {
      return null;
    }

    double result;

    try {
      result = Double.parseDouble(doubleString);
    } catch (NumberFormatException e) {
      throw new ParsingException(e);
    }

    return result;
  }
}
