<?php

class AuthService extends Service
{
    public function __construct()
    {
    }

    public function index()
    {
        $this->sessionStart();
        $this->initCredentials();
        return $this->getSession();
    }

    public function login($request = null)
    {
        $this->sessionStart();
        $this->initCredentials();
        $user = new User();
        $user = $user->login($request->email, $request->password);

        if ($user) {
            $this->setSession([
                "id" => $user->iduser,
                "rol" => $user->idrol,
                "name" => $user->name . " " . $user->lastname,
                "email" => $user->email
            ]);
            return $this->getSession();
        } else {
            return httpResponse(401, "loggin", "Error your credentials are incorrects")->json();
        }
    }
    public function destroy()
    {
        if ($this->destroySession()) {
            return httpResponse(200, "ok", "Your session is finishied")->json();
        } else {
            return httpResponse(500, "Error, session not destroy")->json();
        }
    }
}
