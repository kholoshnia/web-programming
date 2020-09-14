package ru.lab.servlets;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/server")
public final class ControllerServlet extends HttpServlet {
  private static final Logger logger = LogManager.getLogger(ControllerServlet.class);

  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp)
      throws ServletException, IOException {
    if (req.getParameter("clear") != null) {
      logger.info(() -> "Got clear results request, forwarding...");
      req.getRequestDispatcher("/clear-results").forward(req, resp);
      return;
    }

    logger.info(() -> "Got area check request, forwarding...");
    req.getRequestDispatcher("/area-check").forward(req, resp);
  }
}
