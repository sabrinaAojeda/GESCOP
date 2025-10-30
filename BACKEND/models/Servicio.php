<?php
class Servicio {
    private $conn;
    private $table_name = "servicios";

    public $id;
    public $base_id;
    public $nombre_servicio;
    public $tipo_servicio;
    public $descripcion;
    public $estado;
    public $fecha_inicio;
    public $fecha_vencimiento;
    public $created_at;
    public $updated_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function crear() {
        $query = "INSERT INTO " . $this->table_name . " 
                  (base_id, nombre_servicio, tipo_servicio, descripcion, estado, fecha_inicio, fecha_vencimiento) 
                  VALUES (:base_id, :nombre_servicio, :tipo_servicio, :descripcion, :estado, :fecha_inicio, :fecha_vencimiento)";
        
        $stmt = $this->conn->prepare($query);
        
        $this->nombre_servicio = htmlspecialchars(strip_tags($this->nombre_servicio));
        $this->tipo_servicio = htmlspecialchars(strip_tags($this->tipo_servicio));
        $this->descripcion = htmlspecialchars(strip_tags($this->descripcion));
        $this->estado = htmlspecialchars(strip_tags($this->estado));
        
        $stmt->bindParam(":base_id", $this->base_id);
        $stmt->bindParam(":nombre_servicio", $this->nombre_servicio);
        $stmt->bindParam(":tipo_servicio", $this->tipo_servicio);
        $stmt->bindParam(":descripcion", $this->descripcion);
        $stmt->bindParam(":estado", $this->estado);
        $stmt->bindParam(":fecha_inicio", $this->fecha_inicio);
        $stmt->bindParam(":fecha_vencimiento", $this->fecha_vencimiento);
        
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function leerUno() {
        $query = "SELECT s.*, se.nombre as sede_nombre 
                  FROM " . $this->table_name . " s
                  LEFT JOIN sedes se ON s.base_id = se.id
                  WHERE s.id = ? LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();
        
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($row) {
            $this->base_id = $row['base_id'];
            $this->nombre_servicio = $row['nombre_servicio'];
            $this->tipo_servicio = $row['tipo_servicio'];
            $this->descripcion = $row['descripcion'];
            $this->estado = $row['estado'];
            $this->fecha_inicio = $row['fecha_inicio'];
            $this->fecha_vencimiento = $row['fecha_vencimiento'];
            $this->created_at = $row['created_at'];
            $this->updated_at = $row['updated_at'];
            return true;
        }
        return false;
    }

    public function actualizar() {
        $query = "UPDATE " . $this->table_name . " 
                  SET base_id = :base_id, nombre_servicio = :nombre_servicio, 
                      tipo_servicio = :tipo_servicio, descripcion = :descripcion,
                      estado = :estado, fecha_inicio = :fecha_inicio, 
                      fecha_vencimiento = :fecha_vencimiento, updated_at = CURRENT_TIMESTAMP 
                  WHERE id = :id";
        
        $stmt = $this->conn->prepare($query);
        
        $this->nombre_servicio = htmlspecialchars(strip_tags($this->nombre_servicio));
        $this->tipo_servicio = htmlspecialchars(strip_tags($this->tipo_servicio));
        $this->descripcion = htmlspecialchars(strip_tags($this->descripcion));
        $this->estado = htmlspecialchars(strip_tags($this->estado));
        $this->id = htmlspecialchars(strip_tags($this->id));
        
        $stmt->bindParam(":base_id", $this->base_id);
        $stmt->bindParam(":nombre_servicio", $this->nombre_servicio);
        $stmt->bindParam(":tipo_servicio", $this->tipo_servicio);
        $stmt->bindParam(":descripcion", $this->descripcion);
        $stmt->bindParam(":estado", $this->estado);
        $stmt->bindParam(":fecha_inicio", $this->fecha_inicio);
        $stmt->bindParam(":fecha_vencimiento", $this->fecha_vencimiento);
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

    public function obtenerPorBase($base_id) {
        $query = "SELECT s.*, se.nombre as sede_nombre 
                  FROM " . $this->table_name . " s
                  LEFT JOIN sedes se ON s.base_id = se.id
                  WHERE s.base_id = ? 
                  ORDER BY s.fecha_inicio DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $base_id);
        $stmt->execute();
        return $stmt;
    }

    public function leer() {
        $query = "SELECT s.*, se.nombre as sede_nombre, e.nombre as empresa_nombre 
                  FROM " . $this->table_name . " s
                  LEFT JOIN sedes se ON s.base_id = se.id
                  LEFT JOIN empresas e ON se.empresa_id = e.id
                  ORDER BY s.fecha_inicio DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
}
?>