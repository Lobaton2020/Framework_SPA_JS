<?php


class App
{
    protected $controller = "AuthService";
    protected $method = "index";
    protected $params = [];

    public function __construct()
    {
        $url = $this->getUrl();
        try {
            $action = Router::getAction($url);
            if (!$action) {
                exit(httpResponse(400, "error", "The request method does not belong to the route")->json());
            }
            $this->params = Router::getParams();
            if (isset($action["callback"])) {
                echo  $action["callback"](new Service());
            } else {

                $controller = $action['controller'];
                $method = $action["method"];
                if (file_exists(APP_PATH . 'services/' . SEPARATOR . $controller . '.php')) {
                    require_once APP_PATH . 'services' . SEPARATOR . $controller . '.php';

                    if (class_exists($controller)) {
                        $controller = new $controller();
                        if (method_exists($controller, $method)) {
                            echo (call_user_func_array([$controller, $method], $this->params));
                        } else {
                            exit(httpResponse(404, "error", "Method Service not found")->json());
                        }
                    } else {
                        exit(httpResponse(404, "error", "Class Service not found")->json());
                    }
                } else {
                    exit(httpResponse(404, "error", "File Service not found")->json());
                }
            }
        } catch (Exception $e) {
            exit($e->getMessage());
        }
    }

    private function getUrl()
    {
        $url = [];
        if (isset($_GET["url"])) {
            $url = trim($_GET["url"]);
            $url = filter_var($url, FILTER_SANITIZE_URL);
            $url = explode("/", $url);
        }
        return $url;
    }
}
