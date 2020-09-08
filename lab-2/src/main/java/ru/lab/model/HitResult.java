package ru.lab.model;

import javax.validation.constraints.NotNull;

/** Entity class for hit result. Used to save result in result list. */
public final class HitResult {
  @NotNull private Double xValue;
  @NotNull private Double yValue;
  @NotNull private Double rValue;
  @NotNull private Boolean hitResult;

  /** Dot-nothing constructor. */
  public HitResult() {}

  /**
   * Default hit result constructor.
   *
   * @param xValue x value
   * @param yValue y value
   * @param rValue r value
   * @param hitResult hit result
   */
  public HitResult(Double xValue, Double yValue, Double rValue, Boolean hitResult) {
    this.xValue = xValue;
    this.yValue = yValue;
    this.rValue = rValue;
    this.hitResult = hitResult;
  }

  public Double getXValue() {
    return xValue;
  }

  public void setXValue(Double xValue) {
    this.xValue = xValue;
  }

  public Double getYValue() {
    return yValue;
  }

  public void setYValue(Double yValue) {
    this.yValue = yValue;
  }

  public Double getRValue() {
    return rValue;
  }

  public void setRValue(Double rValue) {
    this.rValue = rValue;
  }

  public Boolean getHitResult() {
    return hitResult;
  }

  public void setHitResult(Boolean hitResult) {
    this.hitResult = hitResult;
  }
}
