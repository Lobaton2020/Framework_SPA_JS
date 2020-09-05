<?php

class DB
{
    public static function get($sql, $params = [])
    {
        $stmt = self::connection()->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetch();
    }

    public static function query($sql, $params = [])
    {
        $stmt = self::connection()->prepare($sql);
        return $stmt->execute($params);
    }

    public static function count($sql, $params = [])
    {
        $stmt = self::connection()->prepare($sql);
        $stmt->execute($params);
        return $stmt->rowCount();
    }

    public static function select($sql, $params = [])
    {
        $stmt = self::connection()->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll();
    }

    private static function connection()
    {
        try {
            $dbh = new PDO(DBDRIVER . ":host=" . DBHOST . ";dbname=" . DBNAME . ";charset=" . DBCHARSET, DBUSER, DBPASWORD);
            $dbh->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
            $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $dbh;
        } catch (PDOException $e) {
            exit($e->getMessage());
        }
    }
}
