<?php
class Equipamiento {
    private $conn;
    private $table_name = "equipamientos";

    public $codigo;
    public $descripcion;
    public $tipo;
    public $vehiculo_asignado;
    public $estado;
    public $ultima_revision;
    public $proxima_revision;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function crear() {
        $query = "INSERT INTO " . $this->table_name . " 
                 SET codigo=:codigo, descripcion=:descripcion, tipo=:tipo, 
                     vehiculo_asignado=:vehiculo_asignado, estado=:estado, 
                     ultima_revision=:ultima_revision, proxima_revision=:proxima_revision";
        
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(":codigo", $this->codigo);
        $stmt->bindParam(":descripcion", $this->descripcion);
        $stmt->bindParam(":tipo", $this->tipo);
        $stmt->bindParam(":vehiculo_asignado", $this->vehiculo_asignado);
        $stmt->bindParam(":estado", $this->estado);
        $stmt->bindParam(":ultima_revision", $this->ultima_revision);
        $stmt->bindParam(":proxima_revision", $this->proxima_revision);
        
        return $stmt->execute();
    }

    public function leer() {
        $query = "SELECT * FROM " . $this->table_name . " ORDER BY codigo";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
}
?>