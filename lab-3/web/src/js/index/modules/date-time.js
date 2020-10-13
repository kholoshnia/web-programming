/**
 * Return string with two digits (e.g. 2 => '02').
 * @return {string} string with two digits
 */
Number.prototype.twoDigits = function() {
  const string = this.toString();
  if (string.length === 1) {
    return `0${string}`;
  }
  return string;
};

/**
 * The DateTime class provides methods to show date and time on the digital
 * clock.
 */
export default class DateTime {
  #months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  #days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  #$dayName;
  #$month;
  #$dayNumber;
  #$year;
  #$hour;
  #$minutes;
  #$seconds;
  #$period;

  /**
   * The DateTime class constructor takes jQuery objects as parameters.
   * @param $dayName day name jQuery object
   * @param $month month jQuery object
   * @param $dayNumber day number jQuery object
   * @param $year year jQuery object
   * @param $hour hour jQuery object
   * @param $minutes minutes jQuery object
   * @param $seconds seconds jQuery object
   * @param $period period jQuery object
   */
  constructor({$dayName, $month, $dayNumber, $year, $hour, $minutes, $seconds, $period}) {
    this.#$dayName = $dayName;
    this.#$month = $month;
    this.#$dayNumber = $dayNumber;
    this.#$year = $year;
    this.#$hour = $hour;
    this.#$minutes = $minutes;
    this.#$seconds = $seconds;
    this.#$period = $period;
  }

  /** Show date and time on the digital clock. */
  show = () => {
    const date = new Date();

    let hours = date.getHours();
    const period = hours >= 12 ? 'PM' : 'AM';

    if (hours === 0) hours = 12;
    if (hours > 12) hours = hours - 12;

    this.#$dayName.text(this.#days[date.getDay()]);
    this.#$month.text(this.#months[date.getMonth()]);
    this.#$dayNumber.text(date.getDate().twoDigits());
    this.#$year.text(date.getFullYear());
    this.#$hour.text(hours.twoDigits());
    this.#$minutes.text(date.getMinutes().twoDigits());
    this.#$seconds.text(date.getSeconds().twoDigits());
    this.#$period.text(period);
  };
}