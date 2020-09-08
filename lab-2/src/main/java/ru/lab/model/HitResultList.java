package ru.lab.model;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import ru.lab.model.exceptions.HitResultListException;

import javax.enterprise.context.SessionScoped;
import java.io.Serializable;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@SessionScoped
public final class HitResultList implements Serializable {
  private static final Logger logger = LogManager.getLogger(HitResultList.class);
  private final List<HitResult> hitResultList;

  public HitResultList() {
    hitResultList = new CopyOnWriteArrayList<>();
  }

  public void clearResults() throws HitResultListException {
    logger.info(() -> "Clearing hit result list...");

    for (HitResult hitResult : hitResultList) {
      if (hitResultList.remove(hitResult)) {
        logger.error(() -> "Error removing element.");
        throw new HitResultListException();
      }
    }

    logger.info(() -> "Hit result list cleared successfully.");
  }

  public void addResult(HitResult hitResult) {
    logger.info(() -> "Adding hit result to the list.");
    hitResultList.add(hitResult);
  }

  public List<HitResult> getHitResultListCopy() {
    logger.info(() -> "Returning hit result list copy.");
    return new CopyOnWriteArrayList<>(hitResultList);
  }
}
