const X_VALUES_KEY = 'x-values';
const Y_VALUE_KEY = 'y-value';
const R_VALUE_KEY = 'r-value';
const RESULTS_KEY = 'results-table';

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
 * @param resultsTable results table
 */
export const storeSession = ({xValues, yValue, rValue, resultsTable}) => {
  saveItem(X_VALUES_KEY, xValues);
  saveItem(Y_VALUE_KEY, yValue);
  saveItem(R_VALUE_KEY, rValue);
  saveItem(RESULTS_KEY, resultsTable);
};

/**
 * Loads x values, sets checkboxes accordingly.
 * @param $xCheckbox x checkboxes
 * @param xValues x values
 */
const loadXValues = ($xCheckbox, xValues) => {
  const values = xValues.split(',');
  $xCheckbox.each((index, element) => {
    const $element = $(element);
    values.forEach((el) => {
      if ($element.val() === el) {
        $element.prop('checked', true);
        $element.change();
      }
    });
  });
};

/**
 * Loads y value to the text field.
 * @param $yText y text field
 * @param yValue y value
 */
const loadYValue = ($yText, yValue) => {
  $yText.val(yValue);
  $yText.keyup();
};

/**
 * Loads r value, sets radio buttons accordingly.
 * @param $rRadio r radio buttons
 * @param rValue r value
 */
const loadRValue = ($rRadio, rValue) => {
  $rRadio.each((index, element) => {
    const $element = $(element);
    if ($element.val() === rValue) {
      $element.prop('checked', true);
      $element.change();
    }
  });
};

/**
 * Loads the input form and results table from the session storage.
 * @param $xCheckbox jQuery x checkboxes
 * @param $yText jQuery y text
 * @param $rRadio jQuery r radio buttons
 * @param results results table object
 */
export const loadSession = ({$xCheckbox, $yText, $rRadio, results}) => {
  const rValue = sessionStorage.getItem(R_VALUE_KEY);
  const xValues = sessionStorage.getItem(X_VALUES_KEY);
  const yValue = sessionStorage.getItem(Y_VALUE_KEY);
  const resultsTable = sessionStorage.getItem(RESULTS_KEY);

  if (rValue != null) loadRValue($rRadio, rValue);
  if (xValues != null) loadXValues($xCheckbox, xValues);
  if (yValue != null) loadYValue($yText, yValue);
  if (resultsTable != null) results.setTable(resultsTable);
};