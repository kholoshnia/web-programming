import {createWrongLabel} from '../plugins/validity.jquery';

const TABLE_ERROR = createWrongLabel('answer does not contain table',
    {leftOffset: 37, topOffset: 95});
const TIMEOUT_ERROR = createWrongLabel('timeout error',
    {leftOffset: 45, topOffset: 95});
const RECEIVE_ERROR = createWrongLabel('receiving response error',
    {leftOffset: 40, topOffset: 95});

/**
 * The result class provides methods for interacting with the results table.
 * The class is used to set and get an HTML results table.
 */
export default class Results {
  #resultsTableSelector;
  #$noDataYetText;

  /**
   * Results constructor takes selector and jQuery object as parameters.
   * @param resultsTableSelector results table selector
   * @param $noDataYetText jQuery no data yet text
   */
  constructor({resultsTableSelector, $noDataYetText}) {
    this.#resultsTableSelector = resultsTableSelector;
    this.#$noDataYetText = $noDataYetText;
  }

  #tableIsEmpty = (table) => table.children('tbody').children().length === 0;

  /** Sets "no data yet label if  table is empty. */
  setLabel = () => {
    this.#tableIsEmpty($(this.#resultsTableSelector))
        ? this.#$noDataYetText.fadeIn()
        : this.#$noDataYetText.fadeOut();
  };

  /**
   * Returns the results table as a string. If the table body is empty returns
   * null.
   * @return {string} results table as string.
   */
  getTable = () => {
    const $resultsTable = $(this.#resultsTableSelector);
    return this.#tableIsEmpty($resultsTable) ? null
        : $resultsTable.get(0).outerHTML;
  };

  /**
   * Shows the connection error.
   * @param error request error
   */
  showError = (error) => {
    const $resultsTable = $(this.#resultsTableSelector);
    $resultsTable.parent().addClass('wrong-plate');
    error.timeout
        ? $resultsTable.parent().append(TIMEOUT_ERROR)
        : $resultsTable.parent().append(RECEIVE_ERROR);
  };

  /** Hides the results table error. */
  hideError = () => {
    const $resultsTable = $(this.#resultsTableSelector);
    $resultsTable.siblings('.wrong-value').remove();
    $resultsTable.parent().removeClass('wrong-plate');
  };
}