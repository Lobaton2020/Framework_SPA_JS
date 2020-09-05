<?php

function encrypt($password, $type = PASSWORD_BCRYPT)
{
    return password_hash($password, $type);
}


function verify($password, $hash)
{
    return password_verify($password, $hash);
}
