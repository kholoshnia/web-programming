package ru.lab.tests;

import org.junit.Test;
import ru.lab.model.dao.EntityDAO;
import ru.lab.model.dao.daos.HitResultDAOImpl;
import ru.lab.model.dao.daos.exceptions.InterruptedTransactionException;
import ru.lab.model.dao.daos.exceptions.NoSuchElementInDatabaseException;
import ru.lab.model.entities.HitResult;

public class DataBaseTest {
  EntityDAO<Long, HitResult> dao = new HitResultDAOImpl();

  @Test
  public void addHitResultToDB() throws InterruptedTransactionException {
    dao.insert(new HitResult(1d, 2d, 3d, true));
  }

  @Test(expected = NoSuchElementInDatabaseException.class)
  public void getElementByID()
      throws NoSuchElementInDatabaseException, InterruptedTransactionException {
    dao.getById(0L);
  }
}
