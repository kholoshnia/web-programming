package ru.lab.model.dao.daos;

import lombok.NonNull;
import lombok.extern.log4j.Log4j2;
import org.hibernate.HibernateException;
import ru.lab.model.dao.EntityDAO;
import ru.lab.model.dao.daos.exceptions.InterruptedTransactionException;
import ru.lab.model.dao.daos.exceptions.NoSuchElementInDatabaseException;
import ru.lab.model.entities.HitResult;

import javax.ejb.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
import java.util.List;
import java.util.ResourceBundle;

/** DAO for hit results. Contains all CRUD methods. */
@Log4j2
@Singleton
public class HitResultDAOImpl implements EntityDAO<Long, HitResult> {
  private static final String GET_ALL_HIT_RESULTS_EXCEPTION;
  private static final String GET_HIT_RESULT_BY_ID_EXCEPTION;
  private static final String INSERT_HIT_RESULT_EXCEPTION;
  private static final String DELETE_HIT_RESULT_EXCEPTION;
  private static final String DELETE_ALL_HIT_RESULTS_EXCEPTION;

  static {
    ResourceBundle resourceBundle = ResourceBundle.getBundle("messages.HitResultDAO");
    GET_ALL_HIT_RESULTS_EXCEPTION = resourceBundle.getString("exceptions.getAllHitResults");
    GET_HIT_RESULT_BY_ID_EXCEPTION = resourceBundle.getString("exceptions.getHitResultById");
    INSERT_HIT_RESULT_EXCEPTION = resourceBundle.getString("exceptions.insertHitResult");
    DELETE_HIT_RESULT_EXCEPTION = resourceBundle.getString("exceptions.deleteHitResult");
    DELETE_ALL_HIT_RESULTS_EXCEPTION = resourceBundle.getString("exceptions.deleteAllHitResults");
  }

  /** Factory configuration is described in persistence.xml. */
  private final EntityManagerFactory entityManagerFactory =
      Persistence.createEntityManagerFactory("persist");

  /**
   * Return all hit result entities from the database.
   *
   * @return all entities from the database
   */
  @Override
  public List<HitResult> getAll() throws InterruptedTransactionException {
    EntityManager entityManager = entityManagerFactory.createEntityManager();

    try {
      return entityManager
          .createNativeQuery("SELECT * FROM hit_results", HitResult.class)
          .getResultList();
    } catch (HibernateException e) {
      log.info(() -> "Cannot get all elements from database, transaction was interrupted.", e);
      throw new InterruptedTransactionException(GET_ALL_HIT_RESULTS_EXCEPTION);
    }
  }

  /**
   * Return hit result by id.
   *
   * @param id hit result id key
   * @return hit result with the specified id
   * @throws NoSuchElementInDatabaseException - if there is no hit result with such id
   */
  @Override
  public HitResult getById(Long id)
      throws NoSuchElementInDatabaseException, InterruptedTransactionException {
    try {
      EntityManager entityManager = entityManagerFactory.createEntityManager();
      HitResult hitResult = entityManager.find(HitResult.class, id);

      if (hitResult == null) {
        log.warn("No element found with id: {}.", () -> id);
        throw new NoSuchElementInDatabaseException();
      }

      return hitResult;
    } catch (HibernateException e) {
      log.info(() -> "Cannot get element by id, transaction was interrupted.", e);
      throw new InterruptedTransactionException(GET_HIT_RESULT_BY_ID_EXCEPTION);
    }
  }

  /**
   * Insert hit result to the database.
   *
   * @param hitResult hit result to insert
   * @return inserted hit result with generated id
   * @throws InterruptedTransactionException - in case of inserting exception
   */
  @Override
  public HitResult insert(@NonNull HitResult hitResult) throws InterruptedTransactionException {
    EntityManager entityManager = entityManagerFactory.createEntityManager();
    EntityTransaction currentTransaction = entityManager.getTransaction();

    try {
      currentTransaction.begin();
      entityManager.persist(hitResult);
      currentTransaction.commit();

      log.info("Upload entity: {} into database", hitResult::toString);
      return hitResult;
    } catch (HibernateException e) {
      currentTransaction.rollback();
      log.error(
          () -> "Cannot insert hit result into the database, transaction was interrupted.", e);
      throw new InterruptedTransactionException(INSERT_HIT_RESULT_EXCEPTION);
    }
  }

  /**
   * Delete hit result from database.
   *
   * @param hitResult hit result to delete
   * @return true if hit result was deleted else false
   * @throws InterruptedTransactionException - in case of deleting exception
   */
  @Override
  public Boolean delete(@NonNull HitResult hitResult) throws InterruptedTransactionException {
    EntityManager entityManager = entityManagerFactory.createEntityManager();
    EntityTransaction currentTransaction = entityManager.getTransaction();

    try {
      currentTransaction.begin();
      HitResult removedData = entityManager.find(HitResult.class, hitResult.getId());

      if (removedData == null) {
        log.warn("Hit result with id: {} not found.", hitResult::getId);
        return false;
      }

      entityManager.remove(removedData);
      currentTransaction.commit();
      log.info("Entity successful delete. Entity id: {}", hitResult::getId);
      return true;
    } catch (HibernateException e) {
      currentTransaction.rollback();
      log.error(() -> "Cannot delete entity from the database, transaction was interrupted.", e);
      throw new InterruptedTransactionException(DELETE_HIT_RESULT_EXCEPTION);
    }
  }

  /** Deletes all hit results from the database. */
  @Override
  public Boolean deleteAll() throws InterruptedTransactionException {
    try {
      final List<HitResult> hitResultList = getAll();
      for (HitResult hitResult : hitResultList) {
        delete(hitResult);
      }

      log.info(() -> "All entities were deleted from the database.");
      return true;
    } catch (HibernateException e) {
      log.error(() -> "Cannot delete all entities from the database.", e);
      throw new InterruptedTransactionException(DELETE_ALL_HIT_RESULTS_EXCEPTION);
    }
  }
}
