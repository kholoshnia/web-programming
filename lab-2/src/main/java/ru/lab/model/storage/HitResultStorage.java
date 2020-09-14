package ru.lab.model.storage;

import ru.lab.model.HitResult;
import ru.lab.model.storage.exceptions.HitResultStorageException;

import java.io.Serializable;
import java.util.List;

/** The HitResultList class is used to store hit results. */
public interface HitResultStorage extends Serializable {
  /**
   * Clears hit results storage.
   *
   * @throws HitResultStorageException - in case of storage clearing exceptions
   */
  void clearHitResults() throws HitResultStorageException;

  /**
   * Adds hit result to the storage.
   *
   * @param hitResult hit result to add to the storage
   * @throws HitResultStorageException - in case of adding exceptions
   */
  void addHitResult(HitResult hitResult) throws HitResultStorageException;

  /**
   * Returns hit results list copy.
   *
   * @return hit result list copy
   */
  List<HitResult> getHitResultList();
}
