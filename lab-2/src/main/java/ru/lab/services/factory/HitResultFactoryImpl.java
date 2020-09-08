package ru.lab.services.factory;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import ru.lab.model.HitResult;
import ru.lab.services.factory.exceptions.CreatingException;
import ru.lab.services.hitChecker.HitChecker;
import ru.lab.services.parser.Parser;
import ru.lab.services.parser.exceptions.ParsingException;

import javax.inject.Inject;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.Set;

public final class HitResultFactoryImpl implements HitResultFactory {
  private static final Logger logger = LogManager.getLogger(HitResultFactoryImpl.class);

  private final Parser parser;
  private final HitChecker hitChecker;

  @Inject
  public HitResultFactoryImpl(Parser parser, HitChecker hitChecker) {
    this.parser = parser;
    this.hitChecker = hitChecker;
  }

  @Override
  public HitResult createHitResult(String xValueString, String yValueString, String rValueString)
      throws CreatingException {
    Double xValue;
    Double yValue;
    Double rValue;

    try {
      xValue = parser.parseDouble(xValueString);
      yValue = parser.parseDouble(yValueString);
      rValue = parser.parseDouble(rValueString);
    } catch (ParsingException e) {
      logger.warn(() -> "Got wrong value format.");
      throw new CreatingException(e);
    }

    ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
    Validator validator = validatorFactory.getValidator();

    HitResult hitResult = new HitResult(xValue, yValue, rValue, false);
    Set<ConstraintViolation<HitResult>> violations = validator.validate(hitResult, HitResult.class);

    if (!violations.isEmpty()) {}

    logger.info(() -> "Hit result was created successfully.");
    return hitResult;
  }
}
