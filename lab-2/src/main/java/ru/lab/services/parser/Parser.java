package ru.lab.services.parser;

import ru.lab.services.parser.exceptions.ParsingException;

/** The Parser class allows you to parse a string into different data types. */
public interface Parser {
  /**
   * Parses double string.
   *
   * @param doubleString double string to parse
   * @return parsed double
   * @throws ParsingException - in case of any parsing exception
   */
  Double parseDouble(String doubleString) throws ParsingException;
}
