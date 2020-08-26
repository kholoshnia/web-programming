import label from '../plugins/label.jquery';
import {createWrongLabel} from '../plugins/validity.jquery';

$.fn.label = label;

const CHOOSE_R_GRAPH_LABEL = createWrongLabel('choose r value to use graph',
    {leftOffset: 58, topOffset: 95});
const WRONG_R_GRAPH_LABEL = createWrongLabel('wrong r value, cannot use graph',
    {leftOffset: 53, topOffset: 95});

/** The Graph class provides methods for interacting with the svg graph. */
export default class Graph {
  #$graphSvg;
  #$rHalfPos;
  #$rWholePos;
  #$rHalfNeg;
  #$rWholeNeg;
  #xValues;
  #yValue;
  #rValue;
  #rawXValue;
  #rawYValue;

  /**
   * Graph constructor takes jQuery objects as parameters.
   * @param $graphSvg jQuery graph svg
   * @param $rHalfPos jQuery r half positive label
   * @param $rWholePos jQuery r whole positive label
   * @param $rHalfNeg jQuery r half negative label
   * @param $rWholeNeg jQuery r whole negative label
   */
  constructor({$graphSvg, $rHalfPos, $rWholePos, $rHalfNeg, $rWholeNeg}) {
    this.#$graphSvg = $graphSvg;
    this.#$rHalfPos = $rHalfPos;
    this.#$rWholePos = $rWholePos;
    this.#$rHalfNeg = $rHalfNeg;
    this.#$rWholeNeg = $rWholeNeg;
  }

  #createElement = (name) => $(
      document.createElementNS('http://www.w3.org/2000/svg', name));

  #setCrossings = () => {
    this.#$graphSvg.children('.crossing').remove();
    if (this.#xValues == null || this.#yValue == null) return;
    const yPosition = 150 - this.#yValue * 100 / this.#rValue;

    this.#xValues.forEach((xValue) => {
      const circle = this.#createElement('circle').attr({
        cx: 150 + xValue * 100 / this.#rValue,
        cy: yPosition,
        r: 3,
      }).addClass('crossing');

      this.#$graphSvg.append(circle);
    });
  };

  #removeCrossings = () => this.#$graphSvg.children('.crossing').remove();
  #removeXLines = () => this.#$graphSvg.children('.dotted-line-x').remove();
  #removeYLines = () => this.#$graphSvg.children('.dotted-line-y').remove();

  #resetRValue = () => {
    this.#$rHalfPos.label('R/2');
    this.#$rWholePos.label('R');
    this.#$rHalfNeg.label('-R/2');
    this.#$rWholeNeg.label('-R');
  };

  /**
   * Shows choose error message if specified value is null, else show wrong
   * error message.
   * @param value value to check if null
   */
  showError = (value) => {
    this.#$graphSvg.parent().addClass('wrong-plate');
    value == null
        ? this.#$graphSvg.parent().append(CHOOSE_R_GRAPH_LABEL)
        : this.#$graphSvg.parent().append(WRONG_R_GRAPH_LABEL);
  };

  /** Hides the graph error. */
  hideError = () => {
    this.#$graphSvg.siblings('.wrong-value').remove();
    this.#$graphSvg.parent().removeClass('wrong-plate');
  };

  /**
   * Resets values. Sets r as default R string. Removes all lines and
   * crossings. Resets x, y and r values.
   */
  resetValues = () => {
    this.#removeCrossings();
    this.#removeYLines();
    this.#removeXLines();
    this.#resetRValue();
    this.resetRawValues();
    this.#xValues = null;
    this.#yValue = null;
    this.#rValue = null;
  };

  /**
   * Sets x values. Removes the previously drawn x lines and crossings, adds
   * new ones to the graph.
   * @param xValues x values
   */
  setXValues = (xValues) => {
    this.#xValues = xValues;
    this.#removeXLines();
    this.#removeCrossings();
    if (this.#rValue == null || xValues == null) return;

    xValues.forEach((xValue) => {
      const xPos = 150 + Number(xValue) * 100 / this.#rValue;
      const line = this.#createElement('line').attr({
        x1: xPos,
        x2: xPos,
        y1: 0,
        y2: 300,
      }).addClass('dotted-line-x');

      this.#$graphSvg.append(line);
    });

    this.#setCrossings();
  };

  /**
   * Sets y value. Removes the previously drawn y line and adds the new one to
   * the graph.
   * @param yValue y values
   */
  setYValue = (yValue) => {
    if (isNaN(yValue) || !isFinite(yValue)) return;
    this.#yValue = yValue;
    this.#removeYLines();
    this.#removeCrossings();
    if (this.#rValue == null || yValue == null) return;

    const yPos = 150 - Number(yValue) * 100 / this.#rValue;
    const line = this.#createElement('line').attr({
      x1: 0,
      x2: 300,
      y1: yPos,
      y2: yPos,
    }).addClass('dotted-line-y');

    this.#$graphSvg.append(line);
    this.#setCrossings();
  };

  /**
   * Sets r value. Changes the graph labels accordingly. Sets x values and y
   * values in accordance with new r value.
   * @param rValue r value
   */
  setRValue = (rValue) => {
    this.#$rHalfPos.label(rValue / 2);
    this.#$rWholePos.label(rValue);
    this.#$rHalfNeg.label(-rValue / 2);
    this.#$rWholeNeg.label(-rValue);
    this.#rValue = Number(rValue);
    this.setXValues(this.#xValues);
    this.setYValue(this.#yValue);
    this.#setCrossings();
  };

  /** Resets raw values. Removes raw lines. */
  resetRawValues = () => {
    this.#$graphSvg.children('.dotted-raw-y').remove();
    this.#$graphSvg.children('.dotted-raw-x').remove();
    this.#rawXValue = null;
    this.#rawYValue = null;
  };

  /**
   * Sets raw y value.
   * @param rawYValue raw y value
   */
  setRawYValue = (rawYValue) => {
    if (this.#rValue == null || rawYValue == null) return;
    this.#$graphSvg.children('.dotted-raw-y').remove();
    this.#rawYValue = (150 - rawYValue) * this.#rValue / 100;

    const line = this.#createElement('line').attr({
      x1: 0,
      x2: 300,
      y1: rawYValue,
      y2: rawYValue,
    }).addClass('dotted-raw-y');

    this.#$graphSvg.append(line);
  };

  /**
   * Sets raw x values. Sticks the line on accordance with x checkboxes values.
   * @param rawXValue raw x value
   * @param $xCheckbox jQuery x checkboxes
   */
  setRawXValue = (rawXValue, $xCheckbox) => {
    if (this.#rValue == null || rawXValue == null) return;
    this.#$graphSvg.children('.dotted-raw-x').remove();
    const xValue = (rawXValue - 150) * this.#rValue / 100;

    $xCheckbox.each((index, element) => {
      const value = Number($(element).val());
      if (value - 0.5 < xValue && value + 0.5 >= xValue) {
        this.#rawXValue = value;
        const line = this.#createElement('line').attr({
          x1: 150 + value * 100 / this.#rValue,
          x2: 150 + value * 100 / this.#rValue,
          y1: 0,
          y2: 300,
        }).addClass('dotted-raw-x');

        this.#$graphSvg.append(line);
      }
    });
  };

  /**
   * Saves raw values. Resets values if clicked on the existing line.
   * @param $yText jQuery y text
   * @param $xCheckbox j Query x checkboxes
   */
  saveRawValues = ($yText, $xCheckbox) => {
    if (this.#rawXValue == null || this.#rawYValue == null) return;

    $xCheckbox.each((index, element) => {
      const $element = $(element);
      if (Number($element.val()) === this.#rawXValue) {
        $element.prop('checked', !$element.prop('checked'));
        $element.change();
      }
    });

    $xCheckbox.map((index, element) => {
      if (element.checked) return $(element).val();
    }).toArray().length === 0
        ? $yText.val('')
        : $yText.val(this.#rawYValue);

    $yText.keyup();
  };
}