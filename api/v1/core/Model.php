<?php


class Model
{
    protected $table;
    protected $primaryKey = "id";
    protected $foreignKey = "id";

    private static $paginate;


    public static function find($id)
    {
        $model = new static();
        $sql = "SELECT * FROM {$model->table} WHERE {$model->primaryKey} = :id";
        $params = [":id" => $id];
        return DB::get($sql, $params);
    }
    public static function get($id)
    {
        $model = new static();
        $sql = "SELECT * FROM {$model->table} WHERE {$model->primaryKey} = :id";
        $params = [":id" => $id];
        $result = DB::get($sql, $params);

        return new Actions($result, [$model->table, $model->primaryKey]);
    }

    public static function paginate($request, $limit = 15)
    {
        $model = new static();
        $page = new Paginate($request, $model::count(), $limit);
        $init = $page->page();
        self::$paginate = $page;
        $sql = "SELECT * FROM {$model->table} limit {$init},{$limit}";
        return DB::select($sql);
    }
    public static function infoPaginate($route)
    {
        return self::$paginate->makeInfo($route);
    }
    public static function all($limit = 100)
    {
        $model = new static();
        $sql = "SELECT * FROM {$model->table} limit {$limit}";
        return DB::select($sql);
    }

    public static function where($tableHere = null, $where = [], $withStatus = true, $limit = 20)
    {
        $model = new static();
        $table = gettype($tableHere) == "string" ? $tableHere : $model->table;
        $where = (gettype($tableHere) == "array") ? $tableHere : $where;
        $status = "";
        $argument = "";
        if ($withStatus) {
            $status = "inhabilitado = 1";
        }
        if (!empty($where)) {
            foreach ($where as $key => $value) {
                $argument .= " " . $key . " = :" . $key . " AND";
            }
        }
        $argument = !empty($argument) ? " WHERE" . $argument : "";
        $status = empty($argument) ? " WHERE " . $status : $status;
        $argument = empty($status) ? substr($argument, 0, strlen($argument) - 3) : $argument;
        $sql = "SELECT * FROM {$table} {$argument} {$status} limit {$limit}";
        return count(DB::select($sql, $where)) == 1 ? DB::select($sql, $where)[0] : DB::select($sql, $where);
    }

    public static function references($id, $limit = 20)
    {
        $model = new static();
        $sql = "SELECT * FROM {$model->table} WHERE {$model->foreignKey} = :id limit {$limit}";
        return DB::select($sql, [":id" => $id]);
    }
    public static function delete($id = null, $limit = 1)
    {
        $model = new static();
        $sql = "DELETE  FROM {$model->table} WHERE {$model->primaryKey} = :id limit {$limit}";
        $params = [":id" => $id];
        return DB::query($sql, $params);
    }
    public static function count()
    {
        $model = new static();
        $sql = "SELECT * FROM {$model->table}";
        return DB::count($sql);
    }
    public static function create()
    {
        $model = new static();
        return new Actions("", [$model->table, ""]);
    }
}

class Actions
{
    public $id = [];
    public $table;
    public $primaryKey;
    public $data;
    public function __construct($data, $bd)
    {
        $this->table = $bd[0];
        $this->primaryKey = $bd[1];
        $this->data = (array)$data;
        $this->id = [array_key_first((array)$this->data) => $this->data[array_key_first((array)$this->data)]];
    }

    public function update()
    {
        $data = (array)$this;
        $id = array_shift($data["id"]);
        $table = $data["table"];
        $primaryKey = $data["primaryKey"];
        unset($data["primaryKey"], $data["id"], $data["table"], $data["data"]);
        $fieldDetail = "";
        foreach ($data as $field => $value) :
            $fieldDetail .= $field . " = :" . $field . ",";
        endforeach;
        $fieldDetail = substr($fieldDetail, 0, -1);
        $sql = "UPDATE {$table} SET {$fieldDetail} WHERE {$primaryKey} = :{$primaryKey} ";
        $data[$primaryKey] = $id;
        return DB::query($sql, $data);
    }

    public function save()
    {
        $data = (array)$this;
        $id = array_shift($data["id"]);
        $table = $data["table"];
        $primaryKey = $data["primaryKey"];
        unset($data["primaryKey"], $data["id"], $data["table"], $data["data"]);
        $fields = "";
        $values = "";
        foreach ($data as $field => $value) :
            $fields .=  $field . ",";
            $values .=  ":" . $field . ",";
        endforeach;
        $values = substr($values, 0, -1);
        $fields = substr($fields, 0, -1);
        $sql = "INSERT INTO {$table} ($fields) VALUES ({$values})";
        return DB::query($sql, $data);
    }
}
