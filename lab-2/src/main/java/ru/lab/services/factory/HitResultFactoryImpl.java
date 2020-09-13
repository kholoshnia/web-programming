package ru.lab.services.factory;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import ru.lab.model.HitResult;
import ru.lab.services.checker.HitChecker;
import ru.lab.services.factory.exceptions.CreatingException;
import ru.lab.services.parser.Parser;
import ru.lab.services.parser.exceptions.ParsingException;
import ru.lab.services.validator.ValuesValidator;
import ru.lab.services.validator.exceptions.ValidationException;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import java.util.ResourceBundle;

@Stateless
public class HitResultFactoryImpl implements HitResultFactory {
  private static final Logger logger = LogManager.getLogger(HitResultFactoryImpl.class);

  private static final String WRONG_X_FORMAT_EXCEPTION;
  private static final String WRONG_Y_FORMAT_EXCEPTION;
  private static final String WRONG_R_FORMAT_EXCEPTION;

  static {
    ResourceBundle resourceBundle = ResourceBundle.getBundle("messages.HitResultFactory");

    WRONG_X_FORMAT_EXCEPTION = resourceBundle.getString("exceptions.wrongXFormat");
    WRONG_Y_FORMAT_EXCEPTION = resourceBundle.getString("exceptions.wrongYFormat");
    WRONG_R_FORMAT_EXCEPTION = resourceBundle.getString("exceptions.wrongRFormat");
  }

  @EJB private Parser parser;
  @EJB private ValuesValidator valuesValidator;
  @EJB private HitChecker hitChecker;

  @Override
  public HitResult createHitResult(String xValueString, String yValueString, String rValueString)
      throws CreatingException {
    Double xValue = parseXValue(xValueString);
    Double yValue = parseYValue(yValueString);
    Double rValue = parseRValue(rValueString);
    logger.info(() -> "All values were parsed successfully");

    try {
      valuesValidator.checkValues(xValue, yValue, rValue);
    } catch (ValidationException e) {
      logger.warn(() -> "Got wrong value");
      throw new CreatingException(e.getMessage());
    }

    boolean result = hitChecker.checkHit(xValue, yValue, rValue);
    HitResult hitResult = new HitResult(xValue, yValue, rValue, result);

    logger.info(() -> "Hit result was created successfully");
    return hitResult;
  }

  private Double parseXValue(String xValueString) throws CreatingException {
    try {
      return parser.parseDouble(xValueString);
    } catch (ParsingException e) {
      logger.warn(() -> "Got wrong x value format");
      throw new CreatingException(WRONG_X_FORMAT_EXCEPTION, e);
    }
  }

  private Double parseYValue(String yValueString) throws CreatingException {
    try {
      return parser.parseDouble(yValueString);
    } catch (ParsingException e) {
      logger.warn(() -> "Got wrong y value format");
      throw new CreatingException(WRONG_Y_FORMAT_EXCEPTION, e);
    }
  }

  private Double parseRValue(String rValueString) throws CreatingException {
    try {
      return parser.parseDouble(rValueString);
    } catch (ParsingException e) {
      logger.warn(() -> "Got wrong r value format");
      throw new CreatingException(WRONG_R_FORMAT_EXCEPTION, e);
    }
  }
}
