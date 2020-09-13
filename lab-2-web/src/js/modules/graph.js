import label from '../plugins/label.jquery';
import {createWrongLabel} from '../plugins/validity.jquery';

$.fn.label = label;

const CHOOSE_R_GRAPH_LABEL = createWrongLabel('choose r value to use graph',
    {leftOffset: 52, topOffset: 92});
const WRONG_R_GRAPH_LABEL = createWrongLabel('wrong r value',
    {leftOffset: 73, topOffset: 92});

export default class Graph {
  #$graphSvg;
  #$rHalfPos;
  #$rWholePos;
  #$rHalfNeg;
  #$rWholeNeg;
  #xValues;
  #xValue;
  #yValue;
  #rValue;

  /**
   * Graph constructor takes jQuery objects as parameters.
   * @param $graphSvg jQuery graph svg
   * @param $rHalfPos jQuery r half positive label
   * @param $rWholePos jQuery r whole positive label
   * @param $rHalfNeg jQuery r half negative label
   * @param $rWholeNeg jQuery r whole negative label
   * @param xValues x select options
   */
  constructor({$graphSvg, $rHalfPos, $rWholePos, $rHalfNeg, $rWholeNeg, xValues}) {
    this.#$graphSvg = $graphSvg;
    this.#$rHalfPos = $rHalfPos;
    this.#$rWholePos = $rWholePos;
    this.#$rHalfNeg = $rHalfNeg;
    this.#$rWholeNeg = $rWholeNeg;
    this.#xValues = xValues;
  }

  #createElement = (name) => $(
      document.createElementNS('http://www.w3.org/2000/svg', name));

  #removeXLine = () => this.#$graphSvg.children('.dotted-line-x').remove();
  #removeYLine = () => this.#$graphSvg.children('.dotted-line-y').remove();
  #removeCrossing = () => this.#$graphSvg.children('.crossing').remove();

  #setCrossing = () => {
    this.#removeCrossing();
    if (this.#xValue == null || this.#yValue == null) return;

    const circle = this.#createElement('circle').attr({
      cx: 150 + this.#xValue * 100 / this.#rValue,
      cy: 150 - this.#yValue * 100 / this.#rValue,
      r: 3,
    }).addClass('crossing');

    this.#$graphSvg.append(circle);
  };

  /**
   * Sets r value as graph labels.
   * @param rValue r value
   */
  setRValue = (rValue) => {
    this.#rValue = Number(rValue);
    this.#$rHalfPos.label(this.#rValue / 2);
    this.#$rWholePos.label(this.#rValue);
    this.#$rHalfNeg.label(-this.#rValue / 2);
    this.#$rWholeNeg.label(-this.#rValue);
    this.setXValue(this.#xValue);
    this.setYValue(this.#yValue);
  };

  /** Resets r value labels. */
  resetRValue = () => {
    this.#rValue = null;
    this.#$rHalfPos.label('R/2');
    this.#$rWholePos.label('R');
    this.#$rHalfNeg.label('-R/2');
    this.#$rWholeNeg.label('-R');
    this.setXValue(this.#xValue);
    this.setYValue(this.#yValue);
  };

  /** Resets labels, removes lines and crossing. */
  resetGraph = () => {
    this.resetRValue();
    this.#removeXLine();
    this.#removeYLine();
    this.#removeCrossing();
  };

  /**
   * Draws x line in accordance with the specified x value.
   * @param xValue x value
   */
  drawXLine = (xValue) => {
    if (xValue == null || this.#rValue == null) return;
    this.#removeXLine();
    const x = (xValue - 150) * this.#rValue / 100;

    this.#xValues.each((index, element) => {
      const value = Number($(element).val());
      if (value - 0.5 < x && value + 0.5 >= x) {
        const xPos = 150 + value * 100 / this.#rValue;
        const line = this.#createElement('line').attr({
          x1: xPos,
          x2: xPos,
          y1: 0,
          y2: 300,
        }).addClass('dotted-line-x');
        this.#xValue = value;
        this.#$graphSvg.append(line);
        this.#setCrossing();
      }
    });
  };

  /**
   * Draws y line in accordance with the specified y value.
   * @param yValue y value
   */
  drawYLine = (yValue) => {
    if (yValue == null || this.#rValue == null) return;
    this.#removeYLine();

    const line = this.#createElement('line').attr({
      x1: 0,
      x2: 300,
      y1: yValue,
      y2: yValue,
    }).addClass('dotted-line-y');

    this.#yValue = (150 - yValue) * this.#rValue / 100;
    this.#$graphSvg.append(line);
    this.#setCrossing();
  };

  /**
   * Sets x value to to the graph.
   * @param xValue x value
   */
  setXValue = (xValue) => {
    if (isNaN(xValue) || xValue == null) return;
    this.drawXLine(xValue / this.#rValue * 100 + 150);
  };

  /**
   * Sets y value to to the graph.
   * @param yValue y value
   */
  setYValue = (yValue) => {
    if (isNaN(yValue) || yValue == null) return;
    this.drawYLine(150 - yValue / this.#rValue * 100);
  };

  /**
   * Shows choose error message if specified value is null, else show wrong
   * error message.
   * @param value value to check if null
   */
  showError = (value) => {
    this.#$graphSvg.parent().addClass('wrong-plate');
    value == null ?
        this.#$graphSvg.parent().append(CHOOSE_R_GRAPH_LABEL) :
        this.#$graphSvg.parent().append(WRONG_R_GRAPH_LABEL);
  };

  /** Hides the graph error. */
  hideError = () => {
    this.#$graphSvg.siblings('.wrong-value').remove();
    this.#$graphSvg.parent().removeClass('wrong-plate');
  };

  /**
   * Sets x, y and r values to the form.
   * @param $xSelect jQuery x select
   * @param $rText jQuery r text
   * @param $yText jQuery y text
   */
  valuesToForm = ({$xSelect, $yText, $rText}) => {
    $xSelect.val(this.#xValue);
    $yText.val(this.#yValue);
    $rText.val(this.#rValue);
  };
}