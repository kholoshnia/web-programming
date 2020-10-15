package ru.lab.model.dao;

import lombok.NonNull;
import ru.lab.model.dao.daos.exceptions.InterruptedTransactionException;
import ru.lab.model.dao.daos.exceptions.NoSuchElementInDatabaseException;

import java.util.List;

/**
 * Parametrized DAO interface.
 *
 * @param <Key> Key identifying Entity
 * @param <Entity> DAO object Entity
 */
public interface EntityDAO<Key, Entity> {
  /**
   * Returns all entities.
   *
   * @return Complete list of objects from storage
   * @throws InterruptedTransactionException - in case of any transaction exceptions
   */
  List<Entity> getAll() throws InterruptedTransactionException;

  /**
   * Return entity from the storage by key.
   *
   * @param id entity key
   * @return entity
   * @throws NoSuchElementInDatabaseException - if element not found
   * @throws InterruptedTransactionException - in case of any transaction exceptions
   */
  Entity getById(@NonNull Key id)
      throws NoSuchElementInDatabaseException, InterruptedTransactionException;

  /**
   * Insert entity into the storage.
   *
   * @param entity entity to insert
   * @return inserted entity
   * @throws InterruptedTransactionException - in case of any transaction exceptions
   */
  Entity insert(@NonNull Entity entity) throws InterruptedTransactionException;

  /**
   * Delete entity from the storage.
   *
   * @param entity entity to delete
   * @return true if entity was deleted else false
   * @throws InterruptedTransactionException - in case of any transaction exceptions
   */
  Boolean delete(@NonNull Entity entity) throws InterruptedTransactionException;

  /**
   * Delete all entities from storage
   *
   * @return true if all entities was deleted else false.
   * @throws InterruptedTransactionException - in case of any transaction exceptions
   */
  Boolean deleteAll() throws InterruptedTransactionException;
}
