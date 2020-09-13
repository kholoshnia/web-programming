const X_VALUE_KEY = 'x-value';
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
 * @param xValue x value
 * @param yValue y value
 * @param rValue r value
 */
export const storeSession = ({xValue, yValue, rValue}) => {
  saveItem(X_VALUE_KEY, xValue);
  saveItem(Y_VALUE_KEY, yValue);
  saveItem(R_VALUE_KEY, rValue);
};

/**
 * Loads the input form and results table from the session storage.
 * @param $xSelect jQuery x select
 * @param $yText jQuery y text field
 * @param $rText jQuery r text field
 */
export const loadSession = ({$xSelect, $yText, $rText}) => {
  const rValue = sessionStorage.getItem(R_VALUE_KEY);
  const xValue = sessionStorage.getItem(X_VALUE_KEY);
  const yValue = sessionStorage.getItem(Y_VALUE_KEY);

  if (rValue != null) $rText.val(rValue).keyup();
  if (xValue != null) $xSelect.val(xValue).change();
  if (yValue != null) $yText.val(yValue).keyup();
};