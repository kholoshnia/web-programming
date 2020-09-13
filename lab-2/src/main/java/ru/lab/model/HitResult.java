package ru.lab.model;

import java.util.Objects;

/** Entity class for hit result. Used to save result in result list. */
public final class HitResult {
  private final Double xValue;
  private final Double yValue;
  private final Double rValue;
  private final Boolean result;

  /**
   * Default hit result constructor.
   *
   * @param xValue x value
   * @param yValue y value
   * @param rValue r value
   * @param result result
   */
  public HitResult(Double xValue, Double yValue, Double rValue, Boolean result) {
    this.xValue = xValue;
    this.yValue = yValue;
    this.rValue = rValue;
    this.result = result;
  }

  public Double getX() {
    return xValue;
  }

  public Double getY() {
    return yValue;
  }

  public Double getR() {
    return rValue;
  }

  public Boolean getResult() {
    return result;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    HitResult hitResult = (HitResult) o;
    return Objects.equals(xValue, hitResult.xValue)
        && Objects.equals(yValue, hitResult.yValue)
        && Objects.equals(rValue, hitResult.rValue)
        && Objects.equals(result, hitResult.result);
  }

  @Override
  public int hashCode() {
    return Objects.hash(xValue, yValue, rValue, result);
  }

  @Override
  public String toString() {
    return "HitResult{"
        + "xValue="
        + xValue
        + ", yValue="
        + yValue
        + ", rValue="
        + rValue
        + ", result="
        + result
        + '}';
  }
}
