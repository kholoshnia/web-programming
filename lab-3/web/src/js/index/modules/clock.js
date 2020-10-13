/** The Clock class provides method to show time on the clock. */
export default class Clock {
  #$hour;
  #$minute;
  #$second;

  /**
   * The Clock class constructor takes jQuery objects as parameters.
   * @param $hour hour hand jQuery object
   * @param $minute minute hand jQuery object
   * @param $second second hand jQuery object
   */
  constructor({$hour, $minute, $second}) {
    this.#$hour = $hour;
    this.#$minute = $minute;
    this.#$second = $second;
  }

  /** Show time on the clock. */
  show = () => {
    const date = new Date();

    const hour = ((date.getHours() + 11) % 12 + 1) * 30;
    const minute = date.getMinutes() * 6;
    const second = date.getSeconds() * 6;

    this.#$hour.css('transform', `rotate(${hour}deg)`);
    this.#$minute.css('transform', `rotate(${minute}deg)`);
    this.#$second.css('transform', `rotate(${second}deg)`);
  };
}