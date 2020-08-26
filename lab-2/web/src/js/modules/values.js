/** Values class provides methods for getting x, y, and r values. */
export default class Values {
  #$xCheckbox;
  #$yText;
  #$rRadio;

  /**
   * Values constructor accepts jQuery objects as parameters.
   * @param $xCheckbox jQuery x checkboxes
   * @param $yText jQuery y text field
   * @param $rRadio jQuery r radio buttons
   */
  constructor({$xCheckbox, $yText, $rRadio}) {
    this.#$xCheckbox = $xCheckbox;
    this.#$yText = $yText;
    this.#$rRadio = $rRadio;
  }

  /**
   * Returns an array of x values in string format from checkboxes. If there
   * are no selected checkboxes, returns null.
   * @returns {string[]|null} x values
   */
  getXValues = () => {
    const result = this.#$xCheckbox.map((index, element) => {
      if (element.checked) return $(element).val();
    }).toArray();
    return result != null && result.length !== 0 ? result : null;
  };

  /**
   * Returns the y value in string format from the y text field. If there is no
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
   * Returns the r value in string format from the radio buttons. If there is
   * no selected radio buttons, returns null.
   * @returns {string|null} r value
   */
  getRValue = () => {
    const result = this.#$rRadio.filter(':checked').val();
    return result != null && result.length !== 0 ? result : null;
  };
}