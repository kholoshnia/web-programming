/**
 * Matcher jQuery plugin prevents text field from the input that does not match
 * the specified regex.
 * @param value regex
 * @param ignore key codes to ignore
 * @return {jQuery} $this jQuery object
 */
export default function(value, ignore = [8, 13, 37, 38]) {
  $(this).on('keypress paste', (event) => {
    const text = $(event.currentTarget).val();
    if (!value.test(
        text.substring(0, event.target.selectionStart) +
        String.fromCharCode(event.which) +
        text.substring(event.target.selectionEnd)) &&
        !ignore.includes(event.which)) event.preventDefault();
  });
}