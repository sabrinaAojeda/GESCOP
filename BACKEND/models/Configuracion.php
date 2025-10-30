<?php
class Configuracion {
    private $conn;
    private $table_name = "configuraciones";

    public $id;
    public $clave;
    public $valor;
    public $descripcion;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function leer() {
        $query = "SELECT * FROM " . $this->table_name . " ORDER BY clave";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function obtenerValor($clave) {
        $query = "SELECT valor FROM " . $this->table_name . " WHERE clave = ? LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $clave);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row ? $row['valor'] : null;
    }

    public function actualizar() {
        $query = "UPDATE " . $this->table_name . " SET valor = :valor WHERE clave = :clave";
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(":clave", $this->clave);
        $stmt->bindParam(":valor", $this->valor);
        
        return $stmt->execute();
    }
}
?>