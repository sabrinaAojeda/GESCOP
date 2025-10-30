<?php
class Habilitacion {
    private $conn;
    private $table_name = "habilitaciones";

    public $id;
    public $entidad_tipo;
    public $entidad_id;
    public $tipo;
    public $archivo;
    public $fecha_emision;
    public $fecha_vencimiento;
    public $estado;
    public $created_at;
    public $updated_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function crear() {
        $query = "INSERT INTO " . $this->table_name . " 
                  (entidad_tipo, entidad_id, tipo, archivo, fecha_emision, fecha_vencimiento, estado) 
                  VALUES (:entidad_tipo, :entidad_id, :tipo, :archivo, :fecha_emision, :fecha_vencimiento, :estado)";
        
        $stmt = $this->conn->prepare($query);
        
        $this->entidad_tipo = htmlspecialchars(strip_tags($this->entidad_tipo));
        $this->tipo = htmlspecialchars(strip_tags($this->tipo));
        
        $stmt->bindParam(":entidad_tipo", $this->entidad_tipo);
        $stmt->bindParam(":entidad_id", $this->entidad_id);
        $stmt->bindParam(":tipo", $this->tipo);
        $stmt->bindParam(":archivo", $this->archivo);
        $stmt->bindParam(":fecha_emision", $this->fecha_emision);
        $stmt->bindParam(":fecha_vencimiento", $this->fecha_vencimiento);
        $stmt->bindParam(":estado", $this->estado);
        
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
            $this->entidad_tipo = $row['entidad_tipo'];
            $this->entidad_id = $row['entidad_id'];
            $this->tipo = $row['tipo'];
            $this->archivo = $row['archivo'];
            $this->fecha_emision = $row['fecha_emision'];
            $this->fecha_vencimiento = $row['fecha_vencimiento'];
            $this->estado = $row['estado'];
            $this->created_at = $row['created_at'];
            $this->updated_at = $row['updated_at'];
            return true;
        }
        return false;
    }

    public function actualizar() {
        $query = "UPDATE " . $this->table_name . " 
                  SET entidad_tipo = :entidad_tipo, entidad_id = :entidad_id, 
                      tipo = :tipo, archivo = :archivo, fecha_emision = :fecha_emision,
                      fecha_vencimiento = :fecha_vencimiento, estado = :estado,
                      updated_at = CURRENT_TIMESTAMP 
                  WHERE id = :id";
        
        $stmt = $this->conn->prepare($query);
        
        $this->entidad_tipo = htmlspecialchars(strip_tags($this->entidad_tipo));
        $this->tipo = htmlspecialchars(strip_tags($this->tipo));
        $this->id = htmlspecialchars(strip_tags($this->id));
        
        $stmt->bindParam(":entidad_tipo", $this->entidad_tipo);
        $stmt->bindParam(":entidad_id", $this->entidad_id);
        $stmt->bindParam(":tipo", $this->tipo);
        $stmt->bindParam(":archivo", $this->archivo);
        $stmt->bindParam(":fecha_emision", $this->fecha_emision);
        $stmt->bindParam(":fecha_vencimiento", $this->fecha_vencimiento);
        $stmt->bindParam(":estado", $this->estado);
        $stmt->bindParam(":id", $this->id);
        
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function eliminar() {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function obtenerPorEntidad($entidad_tipo, $entidad_id) {
        $query = "SELECT * FROM " . $this->table_name . " 
                  WHERE entidad_tipo = ? AND entidad_id = ? 
                  ORDER BY fecha_vencimiento DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $entidad_tipo);
        $stmt->bindParam(2, $entidad_id);
        $stmt->execute();
        return $stmt;
    }

    public function obtenerProximasAVencer($dias = 30) {
        $query = "SELECT h.*, 
                  CASE 
                    WHEN h.entidad_tipo = 'empresa' THEN e.nombre
                    WHEN h.entidad_tipo = 'sede' THEN s.nombre
                    WHEN h.entidad_tipo = 'proveedor' THEN p.nombre
                    WHEN h.entidad_tipo = 'personal' THEN CONCAT(per.nombre, ' ', per.apellido)
                  END as entidad_nombre
                  FROM " . $this->table_name . " h
                  LEFT JOIN empresas e ON h.entidad_tipo = 'empresa' AND h.entidad_id = e.id
                  LEFT JOIN sedes s ON h.entidad_tipo = 'sede' AND h.entidad_id = s.id
                  LEFT JOIN proveedores p ON h.entidad_tipo = 'proveedor' AND h.entidad_id = p.id
                  LEFT JOIN personal per ON h.entidad_tipo = 'personal' AND h.entidad_id = per.id
                  WHERE h.fecha_vencimiento BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL ? DAY)
                  AND h.estado = 'activo'
                  ORDER BY h.fecha_vencimiento ASC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $dias);
        $stmt->execute();
        return $stmt;
    }

    public function leer() {
        $query = "SELECT h.*,
                  CASE 
                    WHEN h.entidad_tipo = 'empresa' THEN e.nombre
                    WHEN h.entidad_tipo = 'sede' THEN s.nombre
                    WHEN h.entidad_tipo = 'proveedor' THEN p.nombre
                    WHEN h.entidad_tipo = 'personal' THEN CONCAT(per.nombre, ' ', per.apellido)
                  END as entidad_nombre
                  FROM " . $this->table_name . " h
                  LEFT JOIN empresas e ON h.entidad_tipo = 'empresa' AND h.entidad_id = e.id
                  LEFT JOIN sedes s ON h.entidad_tipo = 'sede' AND h.entidad_id = s.id
                  LEFT JOIN proveedores p ON h.entidad_tipo = 'proveedor' AND h.entidad_id = p.id
                  LEFT JOIN personal per ON h.entidad_tipo = 'personal' AND h.entidad_id = per.id
                  ORDER BY h.fecha_vencimiento DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
}
?>