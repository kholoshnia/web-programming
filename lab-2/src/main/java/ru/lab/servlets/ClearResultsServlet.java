package ru.lab.servlets;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import ru.lab.model.storage.HitResultStorage;
import ru.lab.model.storage.exceptions.HitResultStorageException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/clear-results")
public final class ClearResultsServlet extends HttpServlet {
  private static final Logger logger = LogManager.getLogger(AreaCheckServlet.class);

  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp)
      throws ServletException, IOException {
    try {
      HitResultStorage hitResultStorage = (HitResultStorage) req.getAttribute("hitResultStorage");

      if (hitResultStorage != null) {
        hitResultStorage.clearHitResults();
        logger.info(() -> "Hit result storage was cleared successfully");
      }

      logger.info(() -> "Hit result storage not found");
    } catch (HitResultStorageException e) {
      logger.error(() -> "Cannot clear hit result storage", e);
      req.setAttribute("Error-Message", e.getMessage());
      req.getRequestDispatcher("/error.jsp").forward(req, resp);
    }

    logger.info(() -> "Hit result storage was cleared successfully");
    req.getRequestDispatcher("/index.jsp").forward(req, resp);
  }
}
