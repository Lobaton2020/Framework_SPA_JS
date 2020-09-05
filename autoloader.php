<?php

/**
 * $config["stata"] This say the type of the app
 * PRODUCTION -> Only compile the component once
 * DEVELOP -> Compile every time that refresh the browser
 */
$config = [
    "state" => "DEVELOP"
];
// if (!php_sapi_name() == "cli") {
//     exit("Error, app ejecutable solo desde consola.");
// }

if ($config["state"] === "DEVELOP") {
    if (php_sapi_name() == "cli") {
        if ($argv[1] == "run" && $argv[2] == "app") {
            prepareLoadCompoponents();
        } else {
            print_m("error", "The comandads are bad writes {$argv[1]} - {$argv[2]}");
        }
    } else {
        prepareLoadCompoponents();
    }
} else {
    print_m("error", "Error, The application is in production, Change the state");
    http_response_code(500);
}
function print_m($type, $mensaje)
{
    if ($type == "success") {
        print("\e[0;32m$mensaje  \e[0m");
    } else {
        print("\e[0;31m$mensaje  \e[0m");
    }
}

function prepareLoadCompoponents()
{
    $path = "./app/components/";
    $pathCompiled = "./assets/autoloader/";
    $components = scandir($path);
    unset($components[0], $components[1]);
    $components = array_values($components);
    $content_css = "";
    // $content_js = "";
    $content_handler = "";

    foreach ($components as $name) {
        if ($name != "layouts") {

            $content_css .= "\n" . file_get_contents($path . $name . "/" . $name . ".component.css");
            // $content_js .= file_get_contents($path . $name . "/" . $name . ".component.js");
            $content_handler .= "\n" . file_get_contents($path . $name . "/" . $name . ".component.handler.js");
        }
    }
    if (!file_exists($pathCompiled)) {
        mkdir($pathCompiled, 0777, true);
    }
    writeInFile("Css", $pathCompiled . "styles-components.min.css", minifyContentFile($content_css));
    // writeInFile("Js", $pathCompiled . "js-components.min.js", minifyContentFile($content_js));
    writeInFile("Handlers", $pathCompiled . "handlers-components.min.js", minifyContentFile($content_handler));
}
function writeInFile($type, $path, $content)
{

    $file = fopen($path, "w+");
    if (php_sapi_name() == "cli") {
        if (fwrite($file, $content)) {
            print_m("success", "\n{$type} compiled successfully ");
        } else {
            print_m("error", "\n{$type} error to compiled ");
        }
    } else {
        if (fwrite($file, $content)) {
            http_response_code(200);
        } else {
            http_response_code(500);
        }
    }
}
function minifyContentFile($content)
{
    // $content = str_replace(" ", "", $content);
    // $content = preg_replace("/\r|\n/", "", $content);
    return $content;
}
