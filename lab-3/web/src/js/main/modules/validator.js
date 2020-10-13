/**
 * Validator class provides methods for validating x, y, and r values using an
 * array or range of possible values.
 */
class Validator {
  #xValues = [-3, -2, -1, -0, 1, 2, 3, 4];
  #rValues = [1, 1.5, 2, 2.5, 3];

  #checkX = (xValue) => this.#xValues.includes(xValue);
  #checkY = (yValue) => yValue > -5 && yValue < 3;
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

  /**
   * Set validity of the x checkboxes
   * @param isValid if value is valid
   * @param $xCheckbox jQuery x checkbox
   * @param $xCheckboxes jQuery x checkboxes
   */
  setXValid = (isValid, {$xCheckbox, $xCheckboxes}) => {
    if (isValid) {
      $xCheckbox.removeClass('is-invalid mb-1').addClass('is-valid mb-0');
      $xCheckboxes.each((index, element) => $(element).
          removeClass('is-invalid').
          addClass('is-valid'));
    } else {
      $xCheckbox.removeClass('is-valid mb-1').addClass('is-invalid mb-0');
      $xCheckboxes.each((index, element) => $(element).
          addClass('is-valid').
          addClass('is-invalid'));
    }
  };

  /**
   * Set validity of the y text field.
   * @param isValid if value is valid
   * @param $yText jQuery y text field
   */
  setYValid = (isValid, {$yText}) => {
    isValid
        ? $yText.removeClass('is-invalid').addClass('is-valid')
        : $yText.removeClass('is-valid').addClass('is-invalid');
  };

  /**
   * Set validity of the r buttons.
   * @param isValid if value is valid
   * @param $rButton jQuery r button
   */
  setRValid = (isValid, {$rButton}) => {
    if (isValid) {
      $rButton.children().
          each((index, element) => $(element).
              removeClass('is-invalid').
              addClass('is-valid'));
    } else {
      $rButton.children().
          each((index, element) => $(element).
              removeClass('is-valid').
              addClass('is-invalid'));
    }
  };

  setGraphInvalid = ($graph) => {
    $graph.addClass('is-invalid');
  };

  resetGraphValidity = ($graph) => {
    $graph.removeClass('is-invalid');
  };

  /**
   * Reset validity of the x checkboxes.
   * @param $xCheckbox jQuery x checkbox
   * @param $xCheckboxes jQuery x checkboxes
   */
  resetXValidity = ($xCheckbox, $xCheckboxes) => {
    $xCheckbox.removeClass('is-valid is-invalid').addClass('mb-1');
    $xCheckboxes.each(
        (index, element) => $(element).removeClass('is-valid is-invalid'));
  };

  /**
   * Reset validity of the y text field.
   * @param $yText jQuery y text field
   */
  resetYValidity = ($yText) => {
    $yText.removeClass('is-valid is-invalid');
  };

  /**
   * Reset validity of the r button.
   * @param $rButton jQuery t button
   */
  resetRValidity = ($rButton) => {
    $rButton.children().
        each((index, element) => $(element).
            removeClass('is-valid is-invalid'));
  };
}

export const validator = new Validator();

/**
 * Validates x, y and r values. Returns false if at least one value is wrong,
 * else returns true. Sets validity to invalid if value is wrong.
 * @param xValue x value
 * @param yValue y value
 * @param rValue r value
 * @param $xCheckbox jQuery x checkbox
 * @param $xCheckboxes jQuery x checkboxes
 * @param $yText jQuery y text field
 * @param $rButton jQuery r selected
 * @returns {boolean} Returns false if at least one value is wrong
 */
export const validateValues = (
    {xValues, yValue, rValue, $xCheckbox, $xCheckboxes, $yText, $rButton},
) => {
  const xValid = validator.checkXValues(xValues);
  const yValid = validator.checkYValue(yValue);
  const rValid = validator.checkRValue(rValue);

  validator.setXValid(xValid, {$xCheckbox, $xCheckboxes});
  validator.setYValid(yValid, {$yText});
  validator.setRValid(rValid, {$rButton});

  return xValid || yValid || rValid;
};