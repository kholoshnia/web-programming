<?php

/** Checks the validity of the received parameters. */
class Validator
{
    private static $_MISSING_X_VALUE = 'Missing X value.';
    private static $_MISSING_Y_VALUE = 'Missing Y value.';
    private static $_MISSING_R_VALUE = 'Missing R value.';

    private static $_WRONG_X_VALUE = 'Wrong X value: ';
    private static $_WRONG_Y_VALUE = 'Wrong Y value: ';
    private static $_WRONG_R_VALUE = 'Wrong R value: ';

    private static $_X_VALUES = [-5, -4, -3, -2, -1, -0, 1, 2, 3];
    private static $_R_VALUES = [1, 1.5, 2, 2.5, 3];

    /**
     * Checks the validity of the specified parameters.
     * @param $x_values array x values
     * @param $y_value double y value
     * @param $r_value double r value
     * @return string empty string if all values are valid
     */
    public static function validate($x_values, $y_value, $r_value)
    {
        $error_messages = [];

        $x_result = Validator::check_x_values($x_values);
        $y_result = Validator::check_y_value($y_value);
        $r_result = Validator::check_r_value($r_value);

        if (!is_null($x_result)) {
            array_push($error_messages, $x_result);
        }

        if (!is_null($y_result)) {
            array_push($error_messages, $y_result);
        }

        if (!is_null($r_result)) {
            array_push($error_messages, $r_result);
        }

        return implode(' ', $error_messages);
    }

    /**
     * Checks x values.
     * @param $x_values array x values
     * @return string null if value is correct else error message
     */
    private static function check_x_values($x_values)
    {
        if (is_null($x_values)) {
            return static::$_MISSING_X_VALUE;
        }

        if (!is_array($x_values)) {
            return static::$_WRONG_X_VALUE . $x_values;
        }

        foreach ($x_values as $x_value) {
            if (!is_double($x_value) || !in_array($x_value, static::$_X_VALUES)) {
                return static::$_WRONG_X_VALUE . $x_value;
            }
        }

        return null;
    }

    /**
     * Checks y value.
     * @param $y_value double y value
     * @return string null if value is correct else error message
     */
    private static function check_y_value($y_value)
    {
        if (is_null($y_value)) {
            return static::$_MISSING_Y_VALUE;
        }

        if (!is_double($y_value) || !($y_value > -3 && $y_value < 3)) {
            return self::$_WRONG_Y_VALUE . $y_value;
        }

        return null;
    }

    /**
     * Checks x value.
     * @param $r_value string x value
     * @return string null if value is correct else error message
     */
    private static function check_r_value($r_value)
    {
        if (is_null($r_value)) {
            return static::$_MISSING_R_VALUE;
        }

        if (!is_double($r_value) || !in_array($r_value, static::$_R_VALUES)) {
            return self::$_WRONG_R_VALUE . $r_value;
        }

        return null;
    }
}