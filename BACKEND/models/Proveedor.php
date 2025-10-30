<?php
class Proveedor {
    private $conn;
    private $table_name = "proveedores";

    public $id;
    public $nombre;
    public $cuit;
    public $direccion;
    public $telefono;
    public $email;
    public $contacto;
    public $rubro;
    public $estado;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function crear() {
        $query = "INSERT INTO " . $this->table_name . " 
                 SET nombre=:nombre, cuit=:cuit, direccion=:direccion, 
                     telefono=:telefono, email=:email, contacto=:contacto, 
                     rubro=:rubro, estado=:estado";
        
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":cuit", $this->cuit);
        $stmt->bindParam(":direccion", $this->direccion);
        $stmt->bindParam(":telefono", $this->telefono);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":contacto", $this->contacto);
        $stmt->bindParam(":rubro", $this->rubro);
        $stmt->bindParam(":estado", $this->estado);
        
        return $stmt->execute();
    }

    public function leer() {
        $query = "SELECT * FROM " . $this->table_name . " ORDER BY nombre";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
}
?>