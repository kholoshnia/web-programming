package ru.lab.services.factory;

import ru.lab.model.HitResult;
import ru.lab.services.factory.exceptions.CreatingException;

public interface HitResultFactory {
  /**
   * Creates hit result from x, y and r values.
   *
   * @param xValue x value
   * @param yValue y value
   * @param rValue r value
   * @return new hit result instance
   * @throws CreatingException - in case of any hit result creating exception
   */
  HitResult createHitResult(String xValue, String yValue, String rValue) throws CreatingException;
}
