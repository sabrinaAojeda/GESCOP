<?php
class Documento {
    private $conn;
    private $table_name = "documentos";

    public $id;
    public $entidad_tipo;
    public $entidad_id;
    public $nombre;
    public $ruta;
    public $tipo;
    public $tamaño;
    public $descripcion;
    public $created_at;
    public $updated_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function crear() {
        $query = "INSERT INTO " . $this->table_name . " 
                  (entidad_tipo, entidad_id, nombre, ruta, tipo, tamaño, descripcion) 
                  VALUES (:entidad_tipo, :entidad_id, :nombre, :ruta, :tipo, :tamaño, :descripcion)";
        
        $stmt = $this->conn->prepare($query);
        
        $this->entidad_tipo = htmlspecialchars(strip_tags($this->entidad_tipo));
        $this->nombre = htmlspecialchars(strip_tags($this->nombre));
        $this->ruta = htmlspecialchars(strip_tags($this->ruta));
        $this->tipo = htmlspecialchars(strip_tags($this->tipo));
        $this->descripcion = htmlspecialchars(strip_tags($this->descripcion));
        
        $stmt->bindParam(":entidad_tipo", $this->entidad_tipo);
        $stmt->bindParam(":entidad_id", $this->entidad_id);
        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":ruta", $this->ruta);
        $stmt->bindParam(":tipo", $this->tipo);
        $stmt->bindParam(":tamaño", $this->tamaño);
        $stmt->bindParam(":descripcion", $this->descripcion);
        
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
            $this->nombre = $row['nombre'];
            $this->ruta = $row['ruta'];
            $this->tipo = $row['tipo'];
            $this->tamaño = $row['tamaño'];
            $this->descripcion = $row['descripcion'];
            $this->created_at = $row['created_at'];
            $this->updated_at = $row['updated_at'];
            return true;
        }
        return false;
    }

    public function actualizar() {
        $query = "UPDATE " . $this->table_name . " 
                  SET entidad_tipo = :entidad_tipo, entidad_id = :entidad_id, 
                      nombre = :nombre, ruta = :ruta, tipo = :tipo, 
                      tamaño = :tamaño, descripcion = :descripcion,
                      updated_at = CURRENT_TIMESTAMP 
                  WHERE id = :id";
        
        $stmt = $this->conn->prepare($query);
        
        $this->entidad_tipo = htmlspecialchars(strip_tags($this->entidad_tipo));
        $this->nombre = htmlspecialchars(strip_tags($this->nombre));
        $this->ruta = htmlspecialchars(strip_tags($this->ruta));
        $this->tipo = htmlspecialchars(strip_tags($this->tipo));
        $this->descripcion = htmlspecialchars(strip_tags($this->descripcion));
        $this->id = htmlspecialchars(strip_tags($this->id));
        
        $stmt->bindParam(":entidad_tipo", $this->entidad_tipo);
        $stmt->bindParam(":entidad_id", $this->entidad_id);
        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":ruta", $this->ruta);
        $stmt->bindParam(":tipo", $this->tipo);
        $stmt->bindParam(":tamaño", $this->tamaño);
        $stmt->bindParam(":descripcion", $this->descripcion);
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
                  ORDER BY created_at DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $entidad_tipo);
        $stmt->bindParam(2, $entidad_id);
        $stmt->execute();
        return $stmt;
    }

    public function leer() {
        $query = "SELECT d.*,
                  CASE 
                    WHEN d.entidad_tipo = 'empresa' THEN e.nombre
                    WHEN d.entidad_tipo = 'sede' THEN s.nombre
                    WHEN d.entidad_tipo = 'proveedor' THEN p.nombre
                    WHEN d.entidad_tipo = 'personal' THEN CONCAT(per.nombre, ' ', per.apellido)
                  END as entidad_nombre
                  FROM " . $this->table_name . " d
                  LEFT JOIN empresas e ON d.entidad_tipo = 'empresa' AND d.entidad_id = e.id
                  LEFT JOIN sedes s ON d.entidad_tipo = 'sede' AND d.entidad_id = s.id
                  LEFT JOIN proveedores p ON d.entidad_tipo = 'proveedor' AND d.entidad_id = p.id
                  LEFT JOIN personal per ON d.entidad_tipo = 'personal' AND d.entidad_id = per.id
                  ORDER BY d.created_at DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
}
?>