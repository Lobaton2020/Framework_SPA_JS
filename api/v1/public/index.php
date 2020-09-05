<?php
require_once "../app/config/config.php";
require_once SYS_PATH . 'helpers' . SEPARATOR . 'testing.php';
require_once SYS_PATH . 'helpers' . SEPARATOR . 'route.php';
require_once SYS_PATH . 'helpers' . SEPARATOR . 'autoloader.php';
require_once SYS_PATH . 'helpers' . SEPARATOR . 'json.php';
require_once SYS_PATH . 'helpers' . SEPARATOR . 'encrypt.php';
require_once SYS_PATH . 'helpers' . SEPARATOR . 'http_response.php';
require_once SYS_PATH . 'helpers' . SEPARATOR . 'validator.php';

spl_autoload_register(function ($class) {
    autoloader(SYS_PATH, $class);
    autoloader(APP_PATH . "models" . SEPARATOR, $class);
    autoloader(APP_PATH . "contracts" . SEPARATOR, $class);
});
require_once APP_PATH . 'routes' . SEPARATOR . 'api.php';

new App();
