<?php
class Personal {
    private $conn;
    private $table_name = "personal";

    public $id;
    public $dni;
    public $nombre;
    public $apellido;
    public $telefono;
    public $email;
    public $cargo;
    public $sector;
    public $fecha_ingreso;
    public $estado;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function crear() {
        $query = "INSERT INTO " . $this->table_name . " 
                 SET dni=:dni, nombre=:nombre, apellido=:apellido, telefono=:telefono, 
                     email=:email, cargo=:cargo, sector=:sector, fecha_ingreso=:fecha_ingreso, 
                     estado=:estado";
        
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(":dni", $this->dni);
        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":apellido", $this->apellido);
        $stmt->bindParam(":telefono", $this->telefono);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":cargo", $this->cargo);
        $stmt->bindParam(":sector", $this->sector);
        $stmt->bindParam(":fecha_ingreso", $this->fecha_ingreso);
        $stmt->bindParam(":estado", $this->estado);
        
        return $stmt->execute();
    }

    public function leer() {
        $query = "SELECT * FROM " . $this->table_name . " ORDER BY apellido, nombre";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
}
?>