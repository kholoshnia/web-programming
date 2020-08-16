<?php

require 'services/Validator.php';
require 'services/HitChecker.php';

/**
 * Returns double array value of the string.
 * @param $value string double array string
 * @return array|float[] double array
 */
function double_array($value)
{
    return array_map(function ($item) {
        return doubleval($item);
    }, (array)$value);
}

/**
 * Trims the response to reduce the amount of data transferred.
 * @param $value string response
 * @return string|string[]|null trimmed answer
 */
function trim_response($value)
{
    return preg_replace('/(^|$)\s+/m', '', $value);
}

date_default_timezone_set('Europe/Moscow');

define('NOT_SUPPORTED_METHOD', ' method is not supported.');
define('RESULTS_TABLE_START', '
                        <table>
                            <thead>
                            <tr>
                                <th>X value</th>
                                <th>Y value</th>
                                <th>R value</th>
                                <th>Area hit</th>
                                <th>Current time</th>
                                <th>Execution time</th>
                            </tr>
                            </thead>
                            <tbody>');
define('RESULTS_TABLE_END', '
                            </tbody>
                        </table>');

if ($_SERVER['REQUEST_METHOD'] !== 'GET' && $_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    http_response_code(400);
    header('Content-Type: text/plain');
    echo $_SERVER['REQUEST_METHOD'] . NOT_SUPPORTED_METHOD;
    exit;
}

session_start();

if (isset($_GET['clear'])) {
    $_SESSION['results-history'] = [];
    http_response_code(200);
    header('Content-Type: text/html');
    echo trim_response(RESULTS_TABLE_START . RESULTS_TABLE_END);
    exit;
}

if (!isset($_SESSION['results-history'])) {
    $_SESSION['results-history'] = [];
}

$script_start = microtime(true);

$x_values = isset($_GET['x-values']) ? double_array($_GET['x-values']) : null;
$y_value = isset($_GET['y-value']) ? doubleval($_GET['y-value']) : null;
$r_value = isset($_GET['r-value']) ? doubleval($_GET['r-value']) : null;

$validation_result = Validator::validate($x_values, $y_value, $r_value);

if (!empty($validation_result)) {
    http_response_code(400);
    header('Content-Type: text/plain');
    echo $validation_result;
    exit;
}

foreach ($x_values as $x_value) {
    $hit_result = HitChecker::check_hit($x_value, $y_value, $r_value) ? 'Yes' : 'No';
    $current_time = date('H:i:s');
    $execution_time = (microtime(true) - $script_start) * 1000000;

    $result = "<tr>
                    <td>$x_value</td>
                    <td>$y_value</td>
                    <td>$r_value</td>
                    <td>$hit_result</td>
                    <td>$current_time</td>
                    <td>$execution_time</td>
                </tr>";

    array_unshift($_SESSION['results-history'], $result);
}

http_response_code(201);
header('Content-Type: text/html');
echo trim_response(RESULTS_TABLE_START . implode($_SESSION['results-history']) . RESULTS_TABLE_END);