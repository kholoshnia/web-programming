import Graph from './modules/graph';
import Values from './modules/values';
import matcher from './plugins/matcher.jquery';
import label from './plugins/label.jquery';
import {loadSession, storeSession} from './modules/session';
import {validateValues, validator} from './modules/validator';

$.fn.matcher = matcher;
$.fn.label = label;

$(() => {
  const $xCheckbox = $('#x-input');
  const $xCheckboxes = $xCheckbox.find('input');
  const $yText = $('.y-text');
  const $rSelected = $('#r-selected');
  const rDefault = $rSelected.text();
  const $rButton = $('#r-input');

  const values = new Values({$xCheckboxes, $yText, $rSelected, rDefault});

  const $resultsTable = $('#results-table');
  const $graph = $('#graph-plate');
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

  $graphSvg.mouseenter(() => {
    const rValue = values.getRValue();
    if (!validator.checkRValue(rValue)) validator.setGraphInvalid($graph);
  }).mouseleave(() => {
    graph.resetRawValues();
    validator.resetGraphValidity($graph);
  }).mousemove((event) => {
    const offset = $graphSvg.offset();
    graph.setRawXValue((event.pageX - offset.left) * SCALE_X, $xCheckboxes);
    graph.setRawYValue((event.pageY - offset.top) * SCALE_Y);
  }).click(() => {
    graph.saveRawValues($xCheckboxes, $yText);
    validator.resetXValidity($xCheckbox, $xCheckboxes);
    validator.resetYValidity($yText);
    validator.resetRValidity($rButton);
  });

  $xCheckboxes.each((index, element) => {
    $(element).change(() => {
      validator.resetXValidity($xCheckbox, $xCheckboxes);
      graph.setXValues(values.getXValues());
    });
  });

  $yText.focus(() => validator.resetYValidity($yText)).
      keyup(() => graph.setYValue($yText.val())).
      matcher(/^[+-]?\d*?[.,]?\d*?$/);

  $rButton.children().each((index, element) => {
    const $element = $(element);
    $element.click(() => {
      $rSelected.text($element.val());
      validator.resetRValidity($rButton);
      graph.setRValue(Number($rSelected.text()));
    });
  });
  $rSelected.change(() => graph.setRValue(Number($rSelected.text())));

  $('.submit-button').click((event) => {
    if (!validateValues({
      xValues: values.getXValues(),
      yValue: values.getYValue(),
      rValue: values.getRValue(),
      $xCheckbox, $xCheckboxes, $yText, $rButton,
    })) return event.preventDefault();
  });

  $('.clear-from-button').click(() => {
    $xCheckboxes.each((index, element) => $(element).prop('checked', false));
    $yText.val('');
    $rSelected.text(rDefault);
    validator.resetXValidity($xCheckbox, $xCheckboxes);
    validator.resetYValidity($yText);
    validator.resetRValidity($rButton);
    graph.resetValues();
  });

  $resultsTable.change(() => {
    if ($resultsTable.find('tbody td:last').html() === 'Yes') {
      graph.setGreenCrossing();
    }
  });

  loadSession({$xCheckboxes, $yText, $rSelected});
  $(window).on('beforeunload', () => storeSession({
    xValues: values.getXValues(),
    yValue: values.getYValue(),
    rValue: values.getRValue(),
  }));
});