<?php
class Sede {
    private $conn;
    private $table_name = "sedes";

    public $id;
    public $nombre;
    public $direccion;
    public $telefono;
    public $email;
    public $empresa_id;
    public $tipo_predio;
    public $servicio_principal;
    public $habilitada;
    public $activo;
    public $created_at;
    public $updated_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function crear() {
        $query = "INSERT INTO " . $this->table_name . " 
                  (nombre, direccion, telefono, email, empresa_id, tipo_predio, servicio_principal, habilitada, activo) 
                  VALUES (:nombre, :direccion, :telefono, :email, :empresa_id, :tipo_predio, :servicio_principal, :habilitada, :activo)";
        
        $stmt = $this->conn->prepare($query);
        
        $this->nombre = htmlspecialchars(strip_tags($this->nombre));
        $this->direccion = htmlspecialchars(strip_tags($this->direccion));
        $this->telefono = htmlspecialchars(strip_tags($this->telefono));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->tipo_predio = htmlspecialchars(strip_tags($this->tipo_predio));
        $this->servicio_principal = htmlspecialchars(strip_tags($this->servicio_principal));
        
        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":direccion", $this->direccion);
        $stmt->bindParam(":telefono", $this->telefono);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":empresa_id", $this->empresa_id);
        $stmt->bindParam(":tipo_predio", $this->tipo_predio);
        $stmt->bindParam(":servicio_principal", $this->servicio_principal);
        $stmt->bindParam(":habilitada", $this->habilitada);
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
            $this->direccion = $row['direccion'];
            $this->telefono = $row['telefono'];
            $this->email = $row['email'];
            $this->empresa_id = $row['empresa_id'];
            $this->tipo_predio = $row['tipo_predio'];
            $this->servicio_principal = $row['servicio_principal'];
            $this->habilitada = $row['habilitada'];
            $this->activo = $row['activo'];
            $this->created_at = $row['created_at'];
            $this->updated_at = $row['updated_at'];
            return true;
        }
        return false;
    }

    public function actualizar() {
        $query = "UPDATE " . $this->table_name . " 
                  SET nombre = :nombre, direccion = :direccion, telefono = :telefono, 
                      email = :email, empresa_id = :empresa_id, tipo_predio = :tipo_predio,
                      servicio_principal = :servicio_principal, habilitada = :habilitada,
                      activo = :activo, updated_at = CURRENT_TIMESTAMP 
                  WHERE id = :id";
        
        $stmt = $this->conn->prepare($query);
        
        $this->nombre = htmlspecialchars(strip_tags($this->nombre));
        $this->direccion = htmlspecialchars(strip_tags($this->direccion));
        $this->telefono = htmlspecialchars(strip_tags($this->telefono));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->tipo_predio = htmlspecialchars(strip_tags($this->tipo_predio));
        $this->servicio_principal = htmlspecialchars(strip_tags($this->servicio_principal));
        $this->id = htmlspecialchars(strip_tags($this->id));
        
        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":direccion", $this->direccion);
        $stmt->bindParam(":telefono", $this->telefono);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":empresa_id", $this->empresa_id);
        $stmt->bindParam(":tipo_predio", $this->tipo_predio);
        $stmt->bindParam(":servicio_principal", $this->servicio_principal);
        $stmt->bindParam(":habilitada", $this->habilitada);
        $stmt->bindParam(":activo", $this->activo);
        $stmt->bindParam(":id", $this->id);
        
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function obtenerPorEmpresa($empresa_id) {
        $query = "SELECT * FROM " . $this->table_name . " 
                  WHERE empresa_id = ? AND activo = 1 
                  ORDER BY nombre";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $empresa_id);
        $stmt->execute();
        return $stmt;
    }

    public function leer() {
        $query = "SELECT s.*, e.nombre as empresa_nombre 
                  FROM " . $this->table_name . " s
                  LEFT JOIN empresas e ON s.empresa_id = e.id
                  WHERE s.activo = 1 
                  ORDER BY s.nombre";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
}
?>