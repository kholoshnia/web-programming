import Values from './modules/values';
import Graph from './modules/graph';
import Results from './modules/results';
import matcher from './plugins/matcher.jquery';
import validity from './plugins/validity.jquery';
import {validateValues, validator} from './modules/validator';
import {loadSession, storeSession} from './modules/session';

$.fn.matcher = matcher;
$.fn.validity = validity;

const URL = 'php/server.php';

$(() => {
  const $xCheckbox = $('input:checkbox[name="x-value"]');
  const $yText = $('#text-y-1');
  const $rRadio = $('input:radio[name="r-value"]');

  const values = new Values({$xCheckbox, $yText, $rRadio});

  const $graphSvg = $('#graph-svg');

  const SCALE_X = $graphSvg.attr('viewBox').split(' ')[2] / $graphSvg.width();
  const SCALE_Y = $graphSvg.attr('viewBox').split(' ')[3] / $graphSvg.height();

  const graph = new Graph({
    $graphSvg,
    $rHalfPos: $('.r-half-pos'),
    $rWholePos: $('.r-whole-pos'),
    $rHalfNeg: $('.r-half-neg'),
    $rWholeNeg: $('.r-whole-neg'),
  });

  const results = new Results({
    resultsTableSelector: '#results-plate > table',
    $noDataYetText: $('#results-plate > p:first-of-type'),
  });

  /**
   * Shows graph error message on mouse enter if r value is not selected or
   * wrong.
   * */
  $graphSvg.mouseenter(() => {
    const rValue = values.getRValue();
    if (!validator.checkRValue(rValue)) graph.showError(rValue);
  });

  /** Removes graph error message from mouse enter. */
  $graphSvg.mouseleave(() => {
    graph.resetRawValues();
    graph.hideError();
  });

  /** Sets graph x and y values in accordance with mouse position. */
  $graphSvg.mousemove((event) => {
    const offset = $graphSvg.offset();
    graph.setRawXValue((event.pageX - offset.left) * SCALE_X, $xCheckbox);
    graph.setRawYValue((event.pageY - offset.top) * SCALE_Y);
  });

  /** Saves raw values on graph click. */
  $graphSvg.click(() => {
    graph.saveRawValues($yText, $xCheckbox);
  });

  /** Prevents y text field from not number input. */
  $yText.matcher(/^[+-]?\d*?[.,]?\d*?$/);

  /** Resets validity if x values are correct. Sets graph x values. */
  $xCheckbox.change(() => {
    const xValues = values.getXValues();
    if (validator.checkXValues(xValues)) $xCheckbox.validity('');
    graph.setXValues(xValues);
  });

  /** Resets validity if y value is correct. Sets graph y value. */
  $yText.keyup(() => {
    const yValue = values.getYValue();
    if (validator.checkYValue(yValue)) $yText.validity('');
    graph.setYValue(yValue);
  });

  /** Resets validity if r value is correct. Sets graph r value. */
  $rRadio.change(() => {
    const rValue = values.getRValue();
    if (validator.checkRValue(rValue)) $rRadio.validity('');
    graph.setRValue(rValue);
  });

  /**
   * Validates the form and submits it to the server. Checks the x, y and r
   * values and sends them to the server. Replaces results table with the new
   * one from the server response using AJAX technology. Uses superagent
   * library.
   */
  $('#submit-button').click((event) => {
    event.preventDefault();
    results.hideError();

    const xValues = values.getXValues();
    const yValue = values.getYValue();
    const rValue = values.getRValue();

    if (!validateValues({
      xValues, yValue, rValue,
      $xCheckbox, $yText, $rRadio,
    })) return false;

    request.get(URL).
        timeout({
          deadline: 5000,
          response: 7500,
        }).
        query({
          'x-values[]': xValues,
          'y-value': yValue,
          'r-value': rValue,
        }).
        accept('text/html').
        then((response) => results.setTable(response.text)).
        catch((error) => results.showError(error));
  });

  /**
   * Clears the form and graph. Clears the x input checkboxes, the y text
   * field, and the r input radio buttons and its validity. Sets default graph
   * labels with R characters.
   */
  $('#clear-form-button').click(() => {
    $xCheckbox.prop('checked', false).validity('');
    $yText.val('').validity('');
    $rRadio.prop('checked', false).validity('');
    graph.resetValues();
  });

  /** Clears table by sending clear request. */
  $('#clear-table-button').click(() => {
    results.hideError();
    request.get(URL).
        timeout({
          deadline: 5000,
          response: 7500,
        }).
        query('clear').
        accept('text/html').
        then((response) => results.setTable(response.text)).
        catch((error) => results.showError(error));
  });

  loadSession({$xCheckbox, $yText, $rRadio, results});

  $(window).bind('beforeunload',
      () => storeSession({
        xValues: values.getXValues(),
        yValue: values.getYValue(),
        rValue: values.getRValue(),
        resultsTable: results.getTable(),
      }));
});