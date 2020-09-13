/**
 * Label jQuery plugin sets new svg text value of the $this object. Does not
 * updates the value and plays an animation if the previous value is equal the
 * the specified one.
 * @param value text to set as label
 * @param fadeIn fade in speed value
 * @returns {jQuery} $this jQuery object
 */
export default function(value, fadeIn = 200) {
  return $(this).each((index, element) => {
    const $element = $(element);
    let string = value.toString();
    if ($element.text() !== string) {
      if (string.length > 5) string = string.substr(0, 5) + '...';
      $element.hide().text(string).fadeIn(fadeIn);
    }
  });
}