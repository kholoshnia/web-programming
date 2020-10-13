package ru.lab.services.parser;

import ru.lab.services.parser.exceprions.ParsingException;

public interface HitResultParser {
  /**
   * Parse string value to the double format.
   *
   * @param value value to parse
   * @return double value
   */
  Double parseValue(String value) throws ParsingException;
}
