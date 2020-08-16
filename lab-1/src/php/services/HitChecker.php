<?php

/** Class HitChecker checks area hit. */
class HitChecker
{
    /**
     * Checks the area hit. Checks a circle, rectangle and triangle hit.
     * @param $x_value double x value
     * @param $y_value double y value
     * @param $r_value double r value
     * @return bool true if the area is hit
     */
    public static function check_hit($x_value, $y_value, $r_value)
    {
        $circle_hit = $x_value <= 0 && $y_value >= 0 && $x_value ** 2 + $y_value ** 2 < $r_value ** 2;
        $rectangle_hit = $x_value <= 0 && $y_value <= 0 && $x_value > -$r_value && $y_value > -$r_value / 2;
        $triangle_hit = $x_value >= 0 && $y_value <= 0 && $x_value - $y_value - $r_value / 2 < 0;

        return $circle_hit || $rectangle_hit || $triangle_hit;
    }
}