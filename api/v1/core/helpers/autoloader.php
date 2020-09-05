<?php
function autoloader($directory, $class)
{
    $fileNames = scandir($directory);
    unset($fileNames[0]);
    unset($fileNames[1]);
    foreach ($fileNames  as $file) {
        if (pathinfo($file, PATHINFO_FILENAME) === $class) {
            include_once $directory . $file;
        }
    }
}
