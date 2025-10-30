<?php
class Personal {
    private $conn;
    private $table_name = "personal";

    public $id;
    public $nombre;
    public $apellido;
    public $cui;
    public $sector;
    public $seguro_vida;
    public $habilitacion;
    public $activo;
    public $proveedor_id;
    public $created_at;
    public $updated_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function crear() {
        $query = "INSERT INTO " . $this->table_name . " 
                  (nombre, apellido, cui, sector, seguro_vida, habilitacion, activo, proveedor_id) 
                  VALUES (:nombre, :apellido, :cui, :sector, :seguro_vida, :habilitacion, :activo, :proveedor_id)";
        
        $stmt = $this->conn->prepare($query);
        
        $this->nombre = htmlspecialchars(strip_tags($this->nombre));
        $this->apellido = htmlspecialchars(strip_tags($this->apellido));
        $this->cui = htmlspecialchars(strip_tags($this->cui));
        $this->sector = htmlspecialchars(strip_tags($this->sector));
        
        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":apellido", $this->apellido);
        $stmt->bindParam(":cui", $this->cui);
        $stmt->bindParam(":sector", $this->sector);
        $stmt->bindParam(":seguro_vida", $this->seguro_vida);
        $stmt->bindParam(":habilitacion", $this->habilitacion);
        $stmt->bindParam(":activo", $this->activo);
        $stmt->bindParam(":proveedor_id", $this->proveedor_id);
        
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function leerUno() {
        $query = "SELECT p.*, pr.nombre as proveedor_nombre 
                  FROM " . $this->table_name . " p
                  LEFT JOIN proveedores pr ON p.proveedor_id = pr.id
                  WHERE p.id = ? LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();
        
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($row) {
            $this->nombre = $row['nombre'];
            $this->apellido = $row['apellido'];
            $this->cui = $row['cui'];
            $this->sector = $row['sector'];
            $this->seguro_vida = $row['seguro_vida'];
            $this->habilitacion = $row['habilitacion'];
            $this->activo = $row['activo'];
            $this->proveedor_id = $row['proveedor_id'];
            $this->created_at = $row['created_at'];
            $this->updated_at = $row['updated_at'];
            return true;
        }
        return false;
    }

    public function actualizar() {
        $query = "UPDATE " . $this->table_name . " 
                  SET nombre = :nombre, apellido = :apellido, cui = :cui, 
                      sector = :sector, seguro_vida = :seguro_vida, 
                      habilitacion = :habilitacion, activo = :activo,
                      proveedor_id = :proveedor_id, updated_at = CURRENT_TIMESTAMP 
                  WHERE id = :id";
        
        $stmt = $this->conn->prepare($query);
        
        $this->nombre = htmlspecialchars(strip_tags($this->nombre));
        $this->apellido = htmlspecialchars(strip_tags($this->apellido));
        $this->cui = htmlspecialchars(strip_tags($this->cui));
        $this->sector = htmlspecialchars(strip_tags($this->sector));
        $this->id = htmlspecialchars(strip_tags($this->id));
        
        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":apellido", $this->apellido);
        $stmt->bindParam(":cui", $this->cui);
        $stmt->bindParam(":sector", $this->sector);
        $stmt->bindParam(":seguro_vida", $this->seguro_vida);
        $stmt->bindParam(":habilitacion", $this->habilitacion);
        $stmt->bindParam(":activo", $this->activo);
        $stmt->bindParam(":proveedor_id", $this->proveedor_id);
        $stmt->bindParam(":id", $this->id);
        
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function obtenerPorProveedor($proveedor_id) {
        $query = "SELECT p.*, pr.nombre as proveedor_nombre 
                  FROM " . $this->table_name . " p
                  LEFT JOIN proveedores pr ON p.proveedor_id = pr.id
                  WHERE p.proveedor_id = ? AND p.activo = 1 
                  ORDER BY p.nombre, p.apellido";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $proveedor_id);
        $stmt->execute();
        return $stmt;
    }

    public function leer() {
        $query = "SELECT p.*, pr.nombre as proveedor_nombre 
                  FROM " . $this->table_name . " p
                  LEFT JOIN proveedores pr ON p.proveedor_id = pr.id
                  WHERE p.activo = 1 
                  ORDER BY p.nombre, p.apellido";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
}
?>