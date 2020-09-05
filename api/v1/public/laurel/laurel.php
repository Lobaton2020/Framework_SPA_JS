<?php

include_once "./LaurelConsole.php";

if (php_sapi_name() == "cli") {
    $console = new Console();
    if ($argc == 3) {
        $laurel = new LaurelConsole();
        $request = explode(":", $argv[1]);
        $action = $request[0];
        $type = $request[1];
        $name = $argv[2];
        if ($action == "make") {

            switch ($type) {
                case "model":
                    $laurel->create("Model", $name, "../../app/models/", "template_model.txt", ":model:");
                    $laurel->createFile();
                    break;
                case "service":
                    $laurel->create("Service", $name, "../../app/services/", "template_service.txt", ":class:");
                    $laurel->createFile();
                    break;
                case "contract":
                    $laurel->create("Contract", $name, "../../app/contracts/", "template_contract.txt", ":contract:");
                    $laurel->createFile();
                    break;
                case "migration":
                    $laurel->createMigration($name);
                    break;
                case "destroy":
                    $laurel->dropTables($name);
                    break;
                case "component":
                    $data = [
                        "msg" => "Component",
                        "name" => $name,
                        "route" => "../../../../app/components/",
                        "files" => [
                            ["file" => "component.html"],
                            [
                                "file" => "component.js",
                                "template" => "front-templates/template_js.txt",
                            ],
                            ["file" => "component.css"],
                            ["file" => "component.handler.js"],
                        ]
                    ];
                    $laurel->createComponent($data);

                    break;
                case "servicejs":
                    $laurel->create("Service", $name, "../../../../app/services/", "./front-templates/template_service.txt", ":nameplural:", true, ".service.js");
                    $laurel->createFile();
                    break;
                default;
                    $console->print_m("error", "Sintax error in option '{$type}'");
                    exit();
            }
        } else {
            $console->print_m("error", "Error of sintax '{$action}', check that!");
        }
    } else {
        $console->print_m("error", "Error of sintax number params, check that!");
    }
} else {
    echo "Error de entorno de ejecución.";
}
