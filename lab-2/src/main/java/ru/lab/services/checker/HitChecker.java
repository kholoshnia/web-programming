package ru.lab.services.checker;

public interface HitChecker {
  /**
   * Checks are hit using given x, y and r values.
   *
   * @param xValue x value
   * @param yValue y value
   * @param rValue r value
   * @return true if area is hit
   */
  Boolean checkHit(Double xValue, Double yValue, Double rValue);
}
