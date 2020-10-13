package ru.lab.services.parser;

import lombok.extern.log4j.Log4j2;
import ru.lab.services.parser.exceprions.ParsingException;

import javax.ejb.Stateless;
import java.util.ResourceBundle;

@Log4j2
@Stateless
public class HitResultParserImpl implements HitResultParser {
  private static final String CANNOT_PARSE_DOUBLE_EXCEPTION;

  static {
    ResourceBundle resourceBundle = ResourceBundle.getBundle("messages.HitResultParser");
    CANNOT_PARSE_DOUBLE_EXCEPTION = resourceBundle.getString("exceptions.cannotParseDouble");
  }

  @Override
  public Double parseValue(String value) throws ParsingException {
    if (value == null || value.trim().isEmpty()) {
      log.info(() -> "Got null or empty string.");
      return null;
    }
    double result;
    try {
      result = Double.parseDouble(value);
    } catch (NumberFormatException e) {
      log.error(() -> "Cannot parse double string.");
      throw new ParsingException(CANNOT_PARSE_DOUBLE_EXCEPTION);
    }
    log.info(() -> "Double string was parsed successfully.");
    return result;
  }
}
