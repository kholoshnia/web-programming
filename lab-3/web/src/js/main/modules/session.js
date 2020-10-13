const X_VALUES_KEY = 'x-values';
const Y_VALUE_KEY = 'y-value';
const R_VALUE_KEY = 'r-value';

/**
 * Saves item to the session storage. Removes item if the specified value is
 * null.
 * @param key key to store
 * @param value value to store
 */
const saveItem = (key, value) => {
  value == null
      ? sessionStorage.removeItem(key)
      : sessionStorage.setItem(key, String(value));
};

/**
 * Saves the input form and results table to session storage.
 * @param xValues x values
 * @param yValue y value
 * @param rValue r value
 */
export const storeSession = ({xValues, yValue, rValue}) => {
  saveItem(X_VALUES_KEY, xValues);
  saveItem(Y_VALUE_KEY, yValue);
  saveItem(R_VALUE_KEY, rValue);
};

/**
 * Loads x values, sets checkboxes accordingly.
 * @param $xCheckboxes jQuery x checkboxes
 * @param xValues x values
 */
const loadXValues = ($xCheckboxes, xValues) => {
  const values = xValues.split(',');
  $xCheckboxes.each((index, element) => {
    const $element = $(element);
    values.forEach((el) => {
      if ($element.next().text() === el) {
        $element.prop('checked', true).change();
      }
    });
  });
};

/**
 * Loads y value to the text field.
 * @param $yText jQuery y text field
 * @param yValue y value
 */
const loadYValue = ($yText, yValue) => {
  $yText.val(yValue).keyup();
};

/**
 * Loads r value, sets radio buttons accordingly.
 * @param $rSelected jQuery r selected
 * @param rValue r value
 */
const loadRValue = ($rSelected, rValue) => {
  $rSelected.text(rValue).change();
};

/**
 * Loads the input form and results table from the session storage.
 * @param $xCheckboxes jQuery x checkboxes
 * @param $yText jQuery y text
 * @param $rSelected jQuery r selected
 */
export const loadSession = ({$xCheckboxes, $yText, $rSelected}) => {
  const rValue = sessionStorage.getItem(R_VALUE_KEY);
  const xValues = sessionStorage.getItem(X_VALUES_KEY);
  const yValue = sessionStorage.getItem(Y_VALUE_KEY);

  if (rValue != null) loadRValue($rSelected, rValue);
  if (xValues != null) loadXValues($xCheckboxes, xValues);
  if (yValue != null) loadYValue($yText, yValue);
};