package ru.lab.services.checker;

import lombok.extern.log4j.Log4j2;

import javax.ejb.Stateless;

@Log4j2
@Stateless
public class HitCheckerImpl implements HitChecker {
  @Override
  public Boolean checkHit(Double xValue, Double yValue, Double rValue) {
    boolean circleResult =
        xValue <= 0 && yValue >= 0 && xValue * xValue + yValue * yValue < rValue * rValue / 4;
    boolean squareResult = xValue >= 0 && yValue >= 0 && xValue <= rValue && yValue <= rValue;
    boolean triangleResult = yValue <= 0 && xValue <= 0 && 2 * xValue + yValue >= -rValue;

    boolean result = circleResult || squareResult || triangleResult;
    log.info(() -> "Checked hit successfully.");
    return result;
  }
}
