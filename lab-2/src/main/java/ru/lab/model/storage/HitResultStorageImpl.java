package ru.lab.model.storage;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import ru.lab.model.HitResult;
import ru.lab.model.storage.exceptions.HitResultStorageException;

import java.util.List;
import java.util.ResourceBundle;
import java.util.concurrent.CopyOnWriteArrayList;

public class HitResultStorageImpl implements HitResultStorage {
  private static final Logger logger = LogManager.getLogger(HitResultStorageImpl.class);

  private static final String CLEAR_HIT_RESULTS_EXCEPTION;
  private static final String ADD_HIT_RESULT_EXCEPTION;

  static {
    ResourceBundle resourceBundle = ResourceBundle.getBundle("messages.HitResultStorage");

    CLEAR_HIT_RESULTS_EXCEPTION = resourceBundle.getString("exceptions.clearHitResults");
    ADD_HIT_RESULT_EXCEPTION = resourceBundle.getString("exceptions.addHitResult");
  }

  private final List<HitResult> hitResultList;

  public HitResultStorageImpl() {
    logger.debug(() -> "Creating empty hit result list");
    hitResultList = new CopyOnWriteArrayList<>();
  }

  @Override
  public void clearHitResults() throws HitResultStorageException {
    for (HitResult hitResult : hitResultList) {
      if (hitResultList.remove(hitResult)) {
        logger.error(() -> "Error removing element");
        throw new HitResultStorageException(CLEAR_HIT_RESULTS_EXCEPTION);
      }
    }
    logger.info(() -> "Hit result list cleared successfully");
  }

  @Override
  public void addHitResult(HitResult hitResult) throws HitResultStorageException {
    hitResultList.add(hitResult);
    if (!hitResultList.contains(hitResult)) {
      logger.error(() -> "Error adding element");
      throw new HitResultStorageException(ADD_HIT_RESULT_EXCEPTION);
    }
    logger.info(() -> "Hit result was added successfully");
  }

  @Override
  public List<HitResult> getHitResultList() {
    logger.info(() -> "Returning hit result list copy");
    return new CopyOnWriteArrayList<>(hitResultList);
  }
}
