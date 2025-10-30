<?php
class Empresa {
    private $conn;
    private $table_name = "empresas";

    public $id;
    public $nombre;
    public $ruc;
    public $direccion;
    public $telefono;
    public $email;
    public $tipo_habilitacion;
    public $certificados;
    public $activo;
    public $created_at;
    public $updated_at;

    // Relaciones
    public $sedes;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function crear() {
        $query = "INSERT INTO " . $this->table_name . " 
                  (nombre, ruc, direccion, telefono, email, tipo_habilitacion, certificados, activo) 
                  VALUES (:nombre, :ruc, :direccion, :telefono, :email, :tipo_habilitacion, :certificados, :activo)";
        
        $stmt = $this->conn->prepare($query);
        
        $this->nombre = htmlspecialchars(strip_tags($this->nombre));
        $this->ruc = htmlspecialchars(strip_tags($this->ruc));
        $this->direccion = htmlspecialchars(strip_tags($this->direccion));
        $this->telefono = htmlspecialchars(strip_tags($this->telefono));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->tipo_habilitacion = htmlspecialchars(strip_tags($this->tipo_habilitacion));
        
        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":ruc", $this->ruc);
        $stmt->bindParam(":direccion", $this->direccion);
        $stmt->bindParam(":telefono", $this->telefono);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":tipo_habilitacion", $this->tipo_habilitacion);
        $stmt->bindParam(":certificados", $this->certificados);
        $stmt->bindParam(":activo", $this->activo);
        
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function leerUno() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = ? LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();
        
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($row) {
            $this->nombre = $row['nombre'];
            $this->ruc = $row['ruc'];
            $this->direccion = $row['direccion'];
            $this->telefono = $row['telefono'];
            $this->email = $row['email'];
            $this->tipo_habilitacion = $row['tipo_habilitacion'];
            $this->certificados = $row['certificados'];
            $this->activo = $row['activo'];
            $this->created_at = $row['created_at'];
            $this->updated_at = $row['updated_at'];
            
            $this->cargarSedes();
            return true;
        }
        return false;
    }

    private function cargarSedes() {
        $query = "SELECT s.* FROM sedes s 
                  INNER JOIN sede_empresa se ON s.id = se.sede_id 
                  WHERE se.empresa_id = ? AND s.activo = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();
        
        $this->sedes = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function actualizar() {
        $query = "UPDATE " . $this->table_name . " 
                  SET nombre = :nombre, ruc = :ruc, direccion = :direccion, 
                      telefono = :telefono, email = :email, 
                      tipo_habilitacion = :tipo_habilitacion, certificados = :certificados,
                      activo = :activo, updated_at = CURRENT_TIMESTAMP 
                  WHERE id = :id";
        
        $stmt = $this->conn->prepare($query);
        
        $this->nombre = htmlspecialchars(strip_tags($this->nombre));
        $this->ruc = htmlspecialchars(strip_tags($this->ruc));
        $this->direccion = htmlspecialchars(strip_tags($this->direccion));
        $this->telefono = htmlspecialchars(strip_tags($this->telefono));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->tipo_habilitacion = htmlspecialchars(strip_tags($this->tipo_habilitacion));
        $this->id = htmlspecialchars(strip_tags($this->id));
        
        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":ruc", $this->ruc);
        $stmt->bindParam(":direccion", $this->direccion);
        $stmt->bindParam(":telefono", $this->telefono);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":tipo_habilitacion", $this->tipo_habilitacion);
        $stmt->bindParam(":certificados", $this->certificados);
        $stmt->bindParam(":activo", $this->activo);
        $stmt->bindParam(":id", $this->id);
        
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function leer() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE activo = 1 ORDER BY nombre";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
}
?>