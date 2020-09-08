/** Values class provides methods for getting x, y, and r values. */
export default class Values {
  #$xSelect;
  #$yText;
  #$rText;

  /**
   * Values constructor accepts jQuery objects as parameters.
   * @param $xSelect jQuery x select
   * @param $yText jQuery y text field
   * @param $rText jQuery r text field
   */
  constructor({$xSelect, $yText, $rText}) {
    this.#$xSelect = $xSelect;
    this.#$yText = $yText;
    this.#$rText = $rText;
  }

  /**
   * Returns the x value in string format from the select. If there are no
   * selected checkboxes, returns null.
   * @returns {string|null} x value
   */
  getXValue = () => {
    return this.#$xSelect.val();
  };

  /**
   * Returns the y value in string format from the text field. If there is no
   * text, returns null.
   * @returns {string|null} y value
   */
  getYValue = () => {
    const result = this.#$yText.val();
    return result != null && result.length !== 0
        ? result.replace(',', '.')
        : null;
  };

  /**
   * Returns the r value in string format from the text field. If there is
   * no selected radio buttons, returns null.
   * @returns {string|null} r value
   */
  getRValue = () => {
    const result = this.#$rText.val();
    return result != null && result.length !== 0
        ? result.replace(',', '.')
        : null;
  };
}