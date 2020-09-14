package ru.lab.services.checker;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.ejb.Stateful;

@Stateful
public class HitCheckerImpl implements HitChecker {
  private static final Logger logger = LogManager.getLogger(HitCheckerImpl.class);

  @Override
  public Boolean checkHit(Double xValue, Double yValue, Double rValue) {
    boolean circleResult =
        xValue <= 0 && yValue >= 0 && xValue * xValue + yValue * yValue < rValue * rValue / 4;
    boolean squareResult = xValue >= 0 && yValue >= 0 && xValue <= rValue && yValue <= rValue;
    boolean triangleResult = yValue <= 0 && xValue <= 0 && 2 * xValue + yValue >= -rValue;

    boolean result = circleResult || squareResult || triangleResult;

    logger.info(() -> "Got result successfully");
    return result;
  }
}
