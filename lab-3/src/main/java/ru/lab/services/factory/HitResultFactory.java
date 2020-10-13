package ru.lab.services.factory;

import ru.lab.model.entities.HitResult;
import ru.lab.services.factory.exceptions.CreateHitResultObjectException;

import javax.ejb.Local;

@Local
public interface HitResultFactory {
  /**
   * Create hit result entity.
   *
   * @param xValueString x coordinates value
   * @param yValueString y coordinates value
   * @param rValueString r coordinates value
   * @return new hit result instance
   */
  HitResult createHitResult(String xValueString, String yValueString, String rValueString)
      throws CreateHitResultObjectException;
}
