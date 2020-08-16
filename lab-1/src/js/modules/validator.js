import {createWrongLabel} from '../plugins/validity.jquery';

const CHOOSE_X_LABEL = createWrongLabel('choose x value');
const CHOOSE_Y_LABEL = createWrongLabel('choose y value');
const CHOOSE_R_LABEL = createWrongLabel('choose r value');

const WRONG_X_LABEL = createWrongLabel('wrong x value');
const WRONG_Y_LABEL = createWrongLabel('y must be from -3 to 3, not inclusive',
    {leftOffset: 48});
const WRONG_R_LABEL = createWrongLabel('wrong r value');

/**
 * Validator class provides methods for validating x, y, and r values using an
 * array or range of possible values.
 */
class Validator {
  #xValues = [-5, -4, -3, -2, -1, -0, -1, -2, -3];
  #rValues = [1, 1.5, 2, 2.5, 3];

  #checkX = (xValue) => this.#xValues.includes(xValue);
  #checkY = (yValue) => yValue > -3 && yValue < 3;
  #checkR = (rValue) => this.#rValues.includes(rValue);

  #isEmpty = (value) => value == null || value.length === 0;
  #isBlank = (value) => value == null || value.trim().length === 0;
  #isNumber = (value) => !isNaN(value) && isFinite(value);

  /**
   * Validates an array of x values. Returns true if the values are valid.
   * @param xValues x values
   * @returns {boolean} true if values are valid
   */
  checkXValues = (xValues) => {
    if (this.#isEmpty(xValues) || !Array.isArray(xValues)) return false;
    xValues.forEach((xValue) => {
      if (!this.#isBlank(xValue) || !this.#isNumber(xValue) ||
          !this.#checkX(xValue)) return false;
    });
    return true;
  };

  /**
   * Validates y value. Returns true if value is valid.
   * @param yValue y value
   * @returns {boolean} true if value is valid
   */
  checkYValue = (yValue) => {
    return !this.#isBlank(yValue) && this.#isNumber(yValue) &&
        this.#checkY(Number(yValue));
  };

  /**
   * Validates r value. Returns true if value is valid.
   * @param rValue r value
   * @returns {boolean} true if value is valid
   */
  checkRValue = (rValue) => {
    return !this.#isBlank(rValue) && this.#isNumber(rValue) &&
        this.#checkR(Number(rValue));
  };
}

export const validator = new Validator();

/**
 * Validates x, y and r values. Returns false if at least one value is wrong,
 * else returns true. Sets validity to invalid if value is wrong.
 * @param xValues x values
 * @param yValue y value
 * @param rValue r value
 * @param $xCheckbox jQuery x checkboxes
 * @param $yText jQuery y text field
 * @param $rRadio jQuery r radio buttons
 * @returns {boolean} Returns false if at least one value is wrong
 */
export const validateValues = ({
  xValues, yValue, rValue,
  $xCheckbox, $yText, $rRadio,
}) => {
  let valid = true;

  if (!validator.checkXValues(xValues)) {
    $xCheckbox.validity('invalid', {
      objectValue: xValues,
      chooseMessage: CHOOSE_X_LABEL,
      wrongMessage: WRONG_X_LABEL,
    });
    valid = false;
  }

  if (!validator.checkYValue(yValue)) {
    $yText.validity('invalid', {
      objectValue: yValue,
      chooseMessage: CHOOSE_Y_LABEL,
      wrongMessage: WRONG_Y_LABEL,
    });
    valid = false;
  }

  if (!validator.checkRValue(rValue)) {
    $rRadio.validity('invalid', {
      objectValue: rValue,
      chooseMessage: CHOOSE_R_LABEL,
      wrongMessage: WRONG_R_LABEL,
    });
    valid = false;
  }

  return valid;
};