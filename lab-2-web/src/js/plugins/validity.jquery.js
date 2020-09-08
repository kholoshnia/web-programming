/**
 * Appends label with the wrong value description. Uses HTML object to set
 * custom validity. If value is null appends choose message else appends
 * wrong message.
 * @param value $this object validity
 * @param objectValue object to check if null
 * @param chooseMessage choose value message
 * @param wrongMessage wrong value message
 * @returns {jQuery} $this jQuery object
 */
export default function(
    value, {objectValue, chooseMessage, wrongMessage} = {}) {
  const $this = $(this);
  $this.each((index, element) => $(element).get(0).setCustomValidity(value));

  const wrongLabel = $this.parent().children('.wrong-value');
  if (wrongLabel.length !== 0) $this.siblings('.wrong-value').remove();

  if (value === '') return $this;

  objectValue == null
      ? $this.before(chooseMessage)
      : $this.before(wrongMessage);

  return $this;
}

/**
 * Creates wrong label with styles.
 * @param labelText label text
 * @param leftOffset left offset in percents
 * @param topOffset top offset in percents
 * @return {string} label
 */
export const createWrongLabel = (
    labelText, {leftOffset = 75.5, topOffset = 105} = {}) =>
    `<p class="wrong-value" style="left: ${leftOffset}%; top: ${topOffset}%;">${labelText}</p>`;
