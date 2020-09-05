<?php

require_once "../../app/config/config.php";
require_once "../../core/DB.php";
class Console
{
    public function print_m($type, $mensaje)
    {
        if ($type == "success") {
            print("\e[0;32m$mensaje \n \e[0m");
        } else {
            print("\e[0;31m$mensaje \n \e[0m");
        }
    }
}
class LaurelConsole extends Console
{
    private $content = "";
    private $route;
    private $msg;
    private $name;
    private $extencion = "";

    public function __construct()
    {
    }
    public function create($msg, $name, $route, $template, $selector, $plural = false, $extencion = ".php")
    {

        $this->msg = $msg;
        $this->name = $name;
        $this->route = $route;
        $this->content = file_get_contents($template);
        $this->content = str_replace($selector, ($plural) ? $this->name . "s" : $this->name, $this->content);
        $this->extencion = $extencion;
    }
    public function createComponent($data)
    {
        $data = (object)$data;
        $this->msg = $data->msg;
        $this->name = $data->name;
        $name = $this->name;
        $path = $data->route . $this->name;
        if (!file_exists($path)) {
            mkdir($path, 0777, true);
        }
        foreach ($data->files as $file) {
            $file = (object)$file;
            $this->route = $data->route . $name . "/" . $name . "." . $file->file;
            $this->name = "";
            $this->content = " ";
            if (isset($file->template)) {
                $last_s = substr($name, (strlen($name) - 1)) == "s";
                if ($last_s) {
                    $name = substr($name, 0, strlen($name) - 1);
                }
                $this->content = file_get_contents($file->template);
                $this->content = str_replace(":nameimport:", ucwords($name), $this->content);
                $this->content = str_replace(":namesingle:", $name, $this->content);
                $name .= "s";
            }
            $this->createFile();
        }
    }
    public function createFile()
    {
        $path = $this->route . $this->name . $this->extencion;
        if (!file_exists($path)) {
            $file = fopen($path, "w+");
            if (fwrite($file, $this->content)) {
                $this->print_m("success", "{$this->msg} created successfully");
            } else {
                $this->print_m("error", "{$this->msg} error to create");
            }
        } else {
            $this->print_m("error", "{$this->msg} error to create in path '{$path}' the file already exists");
        }
    }


    public function dropTables($name)
    {
        $msg = "Tables";
        $result = true;
        if ($name == "all") {
            foreach (DB::select("show tables") as $table) {
                $table = array_values((array)$table);
                $table = reset($table);

                if (!DB::query("drop table {$table}")) {
                    $result  = false;
                }
            }
        } else {
            $msg = "Table";
            try {
                if (!DB::query("drop table {$name}")) {
                    $result  = false;
                }
            } catch (PDOException $e) {
                $result  = false;
            }
        }
        if ($result) {
            $this->print_m("success", "{$msg} deleted successfully.");
        } else {
            $this->print_m("error", "Error, {$msg} not deleted. ");
        }
    }

    public function createMigration($name)
    {
        $msg = "Migration";
        $ruta = "../../app/database/{$name}.sql";
        if (file_exists($ruta)) {
            $content = file_get_contents($ruta);
            if (DB::query($content)) {
                $this->print_m("success", "{$msg} executed successfully. \n");
            } else {
                $this->print_m("error", "Error, {$msg} not completed. ");
            }
        } else {
            $this->print_m("error", "Error, file or database '{$name}' not found.");
        }
    }
}
