<?php
/*
* @param  $validate Array a comparar
* @param  $object Object
*
*/
function arrayEmpty($validate, $object)
{
    $array = (array)$object;
    $res = false;
    foreach ($validate as $key) {
        if (array_key_exists($key, $array)) {
            if (empty($array[$key]) && strlen($array[$key]) < 1) {
                return true;
            }
        } else {
            exit("Llave no encontrada");
        }
    }
    return false;
}

function is_correct($string)
{
    if (strlen($string) == null || strlen($string) == 0) {
        return null;
    } else {
        return $string;
    }
}
