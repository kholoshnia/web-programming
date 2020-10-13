package ru.lab.services.factory;

import lombok.extern.log4j.Log4j2;
import ru.lab.model.entities.HitResult;
import ru.lab.services.checker.HitChecker;
import ru.lab.services.factory.exceptions.CreateHitResultObjectException;
import ru.lab.services.parser.HitResultParser;
import ru.lab.services.parser.exceprions.ParsingException;
import ru.lab.services.validator.HitResultValidator;
import ru.lab.services.validator.exceptions.ValidationException;

import javax.ejb.EJB;
import javax.ejb.Singleton;
import java.util.ResourceBundle;

@Log4j2
@Singleton
public class HitResultFactoryImpl implements HitResultFactory {
  private static final String WRONG_X_FORMAT_EXCEPTION;
  private static final String WRONG_Y_FORMAT_EXCEPTION;
  private static final String WRONG_R_FORMAT_EXCEPTION;

  static {
    ResourceBundle resourceBundle = ResourceBundle.getBundle("messages.HitResultFactory");
    WRONG_X_FORMAT_EXCEPTION = resourceBundle.getString("exceptions.wrongXFormat");
    WRONG_Y_FORMAT_EXCEPTION = resourceBundle.getString("exceptions.wrongYFormat");
    WRONG_R_FORMAT_EXCEPTION = resourceBundle.getString("exceptions.wrongRFormat");
  }

  @EJB private HitResultParser parser;
  @EJB private HitResultValidator valuesValidator;
  @EJB private HitChecker hitChecker;

  @Override
  public HitResult createHitResult(String xValueString, String yValueString, String rValueString)
      throws CreateHitResultObjectException {
    Double xValue = parseXValue(xValueString);
    Double yValue = parseYValue(yValueString);
    Double rValue = parseRValue(rValueString);
    log.info(() -> "All values were parsed successfully.");

    try {
      valuesValidator.checkValues(xValue, yValue, rValue);
    } catch (ValidationException e) {
      log.warn(() -> "Got wrong value.", e);
      throw new CreateHitResultObjectException();
    }

    boolean result = hitChecker.checkHit(xValue, yValue, rValue);
    HitResult hitResult = new HitResult(xValue, yValue, rValue, result);

    log.info(() -> "Hit result was created successfully.");
    return hitResult;
  }

  private Double parseXValue(String xValueString) throws CreateHitResultObjectException {
    try {
      return parser.parseValue(xValueString);
    } catch (ParsingException e) {
      log.warn(() -> "Got wrong x value format.", e);
      throw new CreateHitResultObjectException(WRONG_X_FORMAT_EXCEPTION);
    }
  }

  private Double parseYValue(String yValueString) throws CreateHitResultObjectException {
    try {
      return parser.parseValue(yValueString);
    } catch (ParsingException e) {
      log.warn(() -> "Got wrong y value format.", e);
      throw new CreateHitResultObjectException(WRONG_Y_FORMAT_EXCEPTION);
    }
  }

  private Double parseRValue(String rValueString) throws CreateHitResultObjectException {
    try {
      return parser.parseValue(rValueString);
    } catch (ParsingException e) {
      log.warn(() -> "Got wrong r value format.", e);
      throw new CreateHitResultObjectException(WRONG_R_FORMAT_EXCEPTION);
    }
  }
}
