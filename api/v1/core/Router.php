<?php


class Router
{
    private static $routes = [];
    private static $params = [];

    public static function post($route, $location)
    {
        self::add("POST", $route, $location);
    }

    public static function get($route, $location)
    {
        self::add("GET", $route, $location);
    }

    public static function add($methodData, $route, $location)
    {
        if (gettype($location) === "object") {
            static::$routes[$route] = [
                'callback' => $location,
                'methodData' => $methodData
            ];
        } else {

            $controller = explode('@', $location)[0];
            $method = explode('@', $location)[1];
            static::$routes[$route] = [
                'controller' => $controller,
                'method' => $method,
                'methodData' => $methodData
            ];
        }
    }

    public static function getAction($route)
    {
        if (!empty($route)) {
            $routeAux = isset($route[1]) ? [$route[0], $route[1]] : [$route[0]];
            $routeAux = "/" . implode("/", $routeAux);
            array_shift($route);
            array_shift($route);
        } else {
            $routeAux = "/";
        }

        if (array_key_exists($routeAux, self::$routes)) {
            self::$params = $route;
            switch ($_SERVER["REQUEST_METHOD"]) {
                case "GET":
                    return self::verifyRequest($routeAux, "GET");
                    break;
                case "POST":
                    return self::verifyRequest($routeAux, "POST");
                    break;
                default:
                    exit(httpResponse(405, "error", "Method request '{$_SERVER["REQUEST_METHOD"]}' is unavailable un the app")->json());
            }
        } else {
            exit(httpResponse(404, "error", "Route '{$routeAux}' not found")->json());
        }
    }

    private static function verifyRequest($routeAux, $method)
    {
        if (self::$routes[$routeAux]["methodData"] === $method) {
            if ($method !== "GET") {
                if (!empty($_POST)) {
                    self::$params[] = (object)$_POST;
                }
                if (!empty($_FILES)) {
                    self::$params[] = (object)$_FILES;
                }
                if (!empty($_POST) && isset($_POST["id"])) {
                    self::$params[] = $_POST["id"];
                }
            } else {
                if (!empty($_GET)) {
                    self::$params[] = (object)$_GET;
                }
            }
            return self::$routes[$routeAux];
        }
        return false;
    }

    public static function getParams()
    {
        return self::$params;
    }
}
