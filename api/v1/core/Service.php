<?php


class Service extends Authentication
{

    public function authentication($type = "AUTH")
    {
        // parent::__construct();
        switch ($type) {
            case "AUTH":
                if (!$this->checkSession()) {
                    exit(httpResponse(401, "accessdenied", "Your Session have finished, Try to do login")->json());
                }
                break;
            default;
                exit(httpResponse(500, "errorparam", "Error param. Verify Authentication")->json());
        }
    }

    public function destroySession()
    {
        parent::__construct();
        if (parent::destroySession()) {
            return true;
        }
        return false;
    }
}
