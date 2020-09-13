package ru.lab.services.validator;

import ru.lab.services.validator.exceptions.ValidationException;

public interface ValuesValidator {
  /**
   * Checks x, y and r values.
   *
   * @param xValue x value
   * @param yValue y value
   * @param rValue r value
   */
  void checkValues(Double xValue, Double yValue, Double rValue) throws ValidationException;
}
