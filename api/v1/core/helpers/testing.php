<?php
function dd($array, $array2 = null, $stop = true)
{
    var_dump($array);
    if ($stop) {
        exit();
    }
};

function ddJson($array, $array2 = null, $stop = true)
{
    echo json_encode($array, true);
    if ($stop) {
        exit();
    }
};
