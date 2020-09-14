package ru.lab.services.parser;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import ru.lab.services.parser.exceptions.ParsingException;

import javax.ejb.Stateful;
import java.util.ResourceBundle;

@Stateful
public class ParserImpl implements Parser {
  private static final Logger logger = LogManager.getLogger(ParserImpl.class);

  private static final String CANNOT_PARSE_DOUBLE_EXCEPTION;

  static {
    ResourceBundle resourceBundle = ResourceBundle.getBundle("messages.Parser");

    CANNOT_PARSE_DOUBLE_EXCEPTION = resourceBundle.getString("exceptions.cannotParseDouble");
  }

  @Override
  public Double parseDouble(String doubleString) throws ParsingException {
    if (doubleString == null || doubleString.trim().isEmpty()) {
      logger.info(() -> "Got null or empty string");
      return null;
    }

    double result;

    try {
      result = Double.parseDouble(doubleString);
    } catch (NumberFormatException e) {
      logger.warn(() -> "Cannot parse double string");
      throw new ParsingException(CANNOT_PARSE_DOUBLE_EXCEPTION);
    }

    logger.info(() -> "Double string was parsed successfully");
    return result;
  }
}
