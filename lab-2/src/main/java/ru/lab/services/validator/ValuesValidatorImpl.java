package ru.lab.services.validator;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import ru.lab.services.validator.exceptions.ValidationException;

import javax.ejb.Stateless;
import java.util.Arrays;
import java.util.List;
import java.util.ResourceBundle;

@Stateless
public class ValuesValidatorImpl implements ValuesValidator {
  private static final Logger logger = LogManager.getLogger(ValuesValidatorImpl.class);

  private static final String MISSING_X_VALUE_EXCEPTION;
  private static final String MISSING_Y_VALUE_EXCEPTION;
  private static final String MISSING_R_VALUE_EXCEPTION;
  private static final String WRONG_X_VALUE_EXCEPTION;
  private static final String WRONG_Y_VALUE_EXCEPTION;
  private static final String WRONG_R_VALUE_EXCEPTION;

  private static final List<Double> xValues =
      Arrays.asList(-4.0, -3.0, -2.0, -1.0, 0.0, 1.0, 2.0, 3.0, 4.0);

  static {
    ResourceBundle resourceBundle = ResourceBundle.getBundle("messages.ValuesValidator");

    MISSING_X_VALUE_EXCEPTION = resourceBundle.getString("exceptions.missingXValue");
    MISSING_Y_VALUE_EXCEPTION = resourceBundle.getString("exceptions.missingYValue");
    MISSING_R_VALUE_EXCEPTION = resourceBundle.getString("exceptions.missingRValue");
    WRONG_X_VALUE_EXCEPTION = resourceBundle.getString("exceptions.wrongXValue");
    WRONG_Y_VALUE_EXCEPTION = resourceBundle.getString("exceptions.wrongYValue");
    WRONG_R_VALUE_EXCEPTION = resourceBundle.getString("exceptions.wrongRValue");
  }

  @Override
  public void checkValues(Double xValue, Double yValue, Double rValue) throws ValidationException {
    checkXValue(xValue);
    checkYValue(yValue);
    checkRValue(rValue);
    logger.info(() -> "All values are valid");
  }

  private void checkXValue(Double xValue) throws ValidationException {
    if (xValue == null) {
      logger.info(() -> "Got null x value");
      throw new ValidationException(MISSING_X_VALUE_EXCEPTION);
    }

    if (!xValues.contains(xValue)) {
      logger.info(() -> "Got wrong x value");
      throw new ValidationException(WRONG_X_VALUE_EXCEPTION);
    }
  }

  private void checkYValue(Double yValue) throws ValidationException {
    if (yValue == null) {
      logger.info(() -> "Got null y value");
      throw new ValidationException(MISSING_Y_VALUE_EXCEPTION);
    }

    if (yValue <= -3 || yValue >= 3) {
      logger.info(() -> "Got wrong y value");
      throw new ValidationException(WRONG_Y_VALUE_EXCEPTION);
    }
  }

  private void checkRValue(Double rValue) throws ValidationException {
    if (rValue == null) {
      logger.info(() -> "Got null r value");
      throw new ValidationException(MISSING_R_VALUE_EXCEPTION);
    }

    if (rValue <= 1 || rValue >= 4) {
      logger.info(() -> "Got wrong r value");
      throw new ValidationException(WRONG_R_VALUE_EXCEPTION);
    }
  }
}
