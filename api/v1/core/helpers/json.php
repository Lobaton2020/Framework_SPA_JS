<?php

function toJSON($array)
{
    return json_encode($array, true);
}

function toArray($array)
{
    return json_decode($array);
}
