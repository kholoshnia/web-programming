package ru.lab.services.validator;

import ru.lab.services.validator.exceptions.ValidationException;

public interface HitResultValidator {
  /**
   * Validates data according to the specified parameters.
   *
   * @param xValue x coordinate value
   * @param yValue y coordinate value
   * @param rValue r coordinate value
   */
  void checkValues(Double xValue, Double yValue, Double rValue) throws ValidationException;
}
