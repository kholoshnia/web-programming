package ru.lab.servlets;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import ru.lab.model.HitResultList;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public final class AreaCheckServlet extends HttpServlet {
  private static final Logger logger = LogManager.getLogger(AreaCheckServlet.class);

  @EJB private HitResultList hitResultList;

  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp)
      throws ServletException, IOException {}
}
