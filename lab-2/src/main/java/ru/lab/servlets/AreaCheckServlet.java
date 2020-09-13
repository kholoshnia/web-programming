package ru.lab.servlets;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import ru.lab.model.HitResult;
import ru.lab.model.storage.HitResultStorage;
import ru.lab.model.storage.exceptions.HitResultStorageException;
import ru.lab.services.factory.HitResultFactory;
import ru.lab.services.factory.exceptions.CreatingException;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/area-check")
public final class AreaCheckServlet extends HttpServlet {
  private static final Logger logger = LogManager.getLogger(AreaCheckServlet.class);

  @EJB private HitResultFactory hitResultFactory;
  @EJB private HitResultStorage hitResultStorage;

  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp)
      throws ServletException, IOException {
    String xValueString = req.getParameter("x-value");
    String yValueString = req.getParameter("y-value");
    String rValueString = req.getParameter("r-value");

    HitResult hitResult;

    try {
      hitResult = hitResultFactory.createHitResult(xValueString, yValueString, rValueString);
      logger.info(() -> "Hit result was created successfully");
    } catch (CreatingException e) {
      logger.error(() -> "Cannot create hit result", e);
      req.setAttribute("Error-Message", e.getMessage());
      req.getRequestDispatcher("/error.jsp").forward(req, resp);
      return;
    }

    try {
      hitResultStorage.addHitResult(hitResult);
      logger.info(() -> "Hit result was added successfully");
    } catch (HitResultStorageException e) {
      logger.error(() -> "Cannot add hit result", e);
      req.setAttribute("Error-Message", e.getMessage());
      req.getRequestDispatcher("/error.jsp").forward(req, resp);
      return;
    }

    logger.info(() -> "Forwarding to the result page");
    req.setAttribute("Hit-Result", hitResult);
    req.getRequestDispatcher("/result.jsp").forward(req, resp);
  }
}
