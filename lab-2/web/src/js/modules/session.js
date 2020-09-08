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
 * @param xValue x value
 * @param yValue y value
 * @param rValue r value
 * @param resultsTable results table
 */
export const storeSession = ({xValue, yValue, rValue, resultsTable}) => {
  saveItem(X_VALUES_KEY, xValue);
  saveItem(Y_VALUE_KEY, yValue);
  saveItem(R_VALUE_KEY, rValue);
  saveItem(RESULTS_KEY, resultsTable);
};

/**
 * Loads x values, sets select accordingly.
 * @param $xSelect x select
 * @param xValue x values
 */
const loadXValue = ($xSelect, xValue) => {
  $xSelect.val(xValue);
  $xSelect.change();
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
 * Loads r value to the text field.
 * @param $rText r radio buttons
 * @param rValue r value
 */
const loadRValue = ($rText, rValue) => {
  $rText.val(rValue);
  $rText.keyup();
};

/**
 * Loads the input form and results table from the session storage.
 * @param $xSelect jQuery x select
 * @param $yText jQuery y text field
 * @param $rText jQuery r text field
 * @param results results table object
 */
export const loadSession = ({$xSelect, $yText, $rText, results}) => {
  const rValue = sessionStorage.getItem(R_VALUE_KEY);
  const xValue = sessionStorage.getItem(X_VALUES_KEY);
  const yValue = sessionStorage.getItem(Y_VALUE_KEY);
  const resultsTable = sessionStorage.getItem(RESULTS_KEY);

  if (rValue != null) loadRValue($rText, rValue);
  if (xValue != null) loadXValue($xSelect, xValue);
  if (yValue != null) loadYValue($yText, yValue);
  if (resultsTable != null) results.setTable(resultsTable);
};