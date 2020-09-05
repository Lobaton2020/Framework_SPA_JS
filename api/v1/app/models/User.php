<?php

class User extends Model
{
    protected $table = "users";
    protected $primaryKey = "iduser";

    public function users($request)
    {
        $users = User::paginate($request, 10);
        foreach ($users as $user) {
            $user->rol = Rol::find($user->idrol);
            unset($user->idrol);
        }
        return $users;
    }

    public function login($email, $pass)
    {
        $user = DB::get("SELECT * FROM {$this->table} WHERE email = :email", ["email" => $email]);
        if (!empty($user)) {
            if ($pass == $user->password) {
                unset($user->password);
                return $user;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}
