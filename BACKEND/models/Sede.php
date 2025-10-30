<?php
class Sede {
    private $conn;
    private $table_name = "sedes";

    public $id;
    public $nombre;
    public $direccion;
    public $telefono;
    public $empresa_id;
    public $encargado;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function crear() {
        $query = "INSERT INTO " . $this->table_name . " 
                 SET nombre=:nombre, direccion=:direccion, telefono=:telefono, 
                     empresa_id=:empresa_id, encargado=:encargado";
        
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":direccion", $this->direccion);
        $stmt->bindParam(":telefono", $this->telefono);
        $stmt->bindParam(":empresa_id", $this->empresa_id);
        $stmt->bindParam(":encargado", $this->encargado);
        
        return $stmt->execute();
    }

    public function leer() {
        $query = "SELECT s.*, e.nombre as empresa_nombre 
                  FROM " . $this->table_name . " s 
                  LEFT JOIN empresas e ON s.empresa_id = e.id 
                  ORDER BY s.nombre";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
}
?>