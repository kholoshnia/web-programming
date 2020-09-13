import Values from './modules/values';
import Graph from './modules/graph';
import Results from './modules/results';
import matcher from './plugins/matcher.jquery';
import validity from './plugins/validity.jquery';
import {validateValues, validator} from './modules/validator';
import {loadSession, storeSession} from './modules/session';

$.fn.matcher = matcher;
$.fn.validity = validity;

const URL = 'server';

$(() => {
  const $body = $('body');

  /** Sets theme in accordance with system preferences. */
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    $body.addClass('dark');
    $body.removeClass('light');
  }

  const $themeSwitcher = $('#theme-switcher');

  /** Toggles theme on switch button click. */
  $themeSwitcher.click(() => {
    $body.toggleClass('light');
    $body.toggleClass('dark');
    $themeSwitcher.toggleClass('active');
  });

  const $submitButton = $('#submit-button');

  const $xSelect = $('#x-select');
  const $yText = $('#text-y');
  const $rText = $('#text-r');

  const values = new Values({$xSelect, $yText, $rText});

  const $graphSvg = $('#graph-svg');

  const SCALE_X = $graphSvg.attr('viewBox').split(' ')[2] / $graphSvg.width();
  const SCALE_Y = $graphSvg.attr('viewBox').split(' ')[3] / $graphSvg.height();

  const graph = new Graph({
    $graphSvg,
    $rHalfPos: $('.r-half-pos'),
    $rWholePos: $('.r-whole-pos'),
    $rHalfNeg: $('.r-half-neg'),
    $rWholeNeg: $('.r-whole-neg'),
    xValues: $xSelect.children('option'),
  });

  const results = new Results({
    resultsTableSelector: '#results-plate > table',
    $noDataYetText: $('#results-plate > p:first-of-type'),
  });

  /** Prevents y text field from not number input. */
  $yText.matcher(/^[+-]?\d*?[.,]?\d*?$/);

  /** Prevents r text field from not number input and negative number input. */
  $rText.matcher(/^\+?\d*?[.,]?\d*?$/);

  /**
   * Shows graph error message on mouse enter if r value is not selected or
   * wrong.
   */
  $graphSvg.mouseenter(() => {
    const rValue = values.getRValue();
    if (!validator.checkRValue(rValue)) graph.showError(rValue);
  });

  /** Removes graph error message from mouse enter. */
  $graphSvg.mouseleave(() => {
    $rText.keyup();
    $xSelect.change();
    $yText.keyup();
    graph.hideError();
  });

  /** Sets graph x and y values in accordance with mouse position. */
  $graphSvg.mousemove((event) => {
    const offset = $graphSvg.offset();
    graph.drawXLine((event.pageX - offset.left) * SCALE_X);
    graph.drawYLine((event.pageY - offset.top) * SCALE_Y);
  });

  /** Validates the form and submits it to the server on graph click. */
  $graphSvg.click(() => {
    $xSelect.validity('');
    $yText.validity('');

    if (validator.checkRValue(values.getRValue())) {
      graph.valuesToForm({$xSelect, $yText, $rText});
      $submitButton.click();
    }
  });

  /** Resets validity if x value is correct. Sets graph x value. */
  $xSelect.change(() => {
    const xValue = values.getXValue();
    if (validator.checkXValue(xValue)) $xSelect.validity('');
    graph.setXValue(xValue);
  });

  /** Resets validity if y value is correct. Sets graph y value. */
  $yText.keyup(() => {
    const yValue = values.getYValue();
    if (validator.checkYValue(yValue)) $yText.validity('');
    graph.setYValue(yValue);
  });

  /** Resets validity if r value is correct. Sets graph r value. */
  $rText.keyup(() => {
    const rValue = values.getRValue();
    if (validator.checkRValue(rValue)) {
      $rText.validity('');
      graph.setRValue(rValue);
    } else {
      graph.resetGraph();
    }
  });

  /**
   * Validates the form and submits it to the server. Checks the x, y and r
   * values and sends them to the server. Replaces results table with the new
   * one from the server response using AJAX technology. Uses superagent
   * library.
   */
  $submitButton.click((event) => {
    event.preventDefault();
    results.hideError();

    const xValue = values.getXValue();
    const yValue = values.getYValue();
    const rValue = values.getRValue();

    if (!validateValues({
      xValue, yValue, rValue,
      $xSelect, $yText, $rText,
    })) return false;

    request.get(URL).
        timeout({
          deadline: 5000,
          response: 7500,
        }).
        query({
          'x-value': xValue,
          'y-value': yValue,
          'r-value': rValue,
        }).
        accept('text/html').
        then((response) => results.setTable(response.text)).
        catch((error) => results.showError(error));
  });

  /**
   * Clears the form and graph. Clears the x select, the y text field, and the
   * r text field and its validity. Sets default graph labels with R
   * characters.
   */
  $('#clear-form-button').click(() => {
    $xSelect.val('Select value').validity('').change();
    $yText.val('').validity('').keyup();
    $rText.val('').validity('').keyup();
    graph.resetGraph();
  });

  /** Clears table by sending clear request. */
  $('#clear-table-button').click(() => {
    results.hideError();
    request.del(URL).
        timeout({
          deadline: 5000,
          response: 7500,
        }).
        query('clear').
        accept('text/html').
        then((response) => results.setTable(response.text)).
        catch((error) => results.showError(error));
  });

  loadSession({$xSelect, $yText, $rText});

  $(window).bind('beforeunload', () => storeSession({
    xValue: values.getXValue(),
    yValue: values.getYValue(),
    rValue: values.getRValue(),
  }));
});