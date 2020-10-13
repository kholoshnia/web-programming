/** Values class provides methods for getting x, y, and r values. */
export default class Values {
  #$xCheckboxes;
  #$yText;
  #$rSelected;
  #rDefault;

  /**
   * Values constructor accepts jQuery objects as parameters.
   * @param $xCheckboxes jQuery x checkboxes
   * @param $yText jQuery y text field
   * @param $rSelected jQuery r selected
   * @param rDefault default r select string
   */
  constructor({$xCheckboxes, $yText, $rSelected, rDefault}) {
    this.#$xCheckboxes = $xCheckboxes;
    this.#$yText = $yText;
    this.#$rSelected = $rSelected;
    this.#rDefault = rDefault;
  }

  /**
   * Returns the array of x values in string format from the checkboxes. If
   * there are no checkboxes selected, returns null.
   * @returns {string[]|null} x value
   */
  getXValues = () => {
    const result = this.#$xCheckboxes.map((index, element) => {
      if (element.checked) return $(element).next().text();
    }).toArray();
    return result != null && result.length !== 0 ? result : null;
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
    const result = this.#$rSelected.text();
    return result !== this.#rDefault ? result : null;
  };
}