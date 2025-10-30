<?php
class Proveedor {
    private $conn;
    private $table_name = "proveedores";

    public $id;
    public $nombre;
    public $ruc;
    public $direccion;
    public $telefono;
    public $email;
    public $sector_servicio;
    public $localidad;
    public $seguro_RT;
    public $habilitacion_personal;
    public $habilitacion_vehiculo;
    public $activo;
    public $created_at;
    public $updated_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function crear() {
        $query = "INSERT INTO " . $this->table_name . " 
                  (nombre, ruc, direccion, telefono, email, sector_servicio, localidad, seguro_RT, habilitacion_personal, habilitacion_vehiculo, activo) 
                  VALUES (:nombre, :ruc, :direccion, :telefono, :email, :sector_servicio, :localidad, :seguro_RT, :habilitacion_personal, :habilitacion_vehiculo, :activo)";
        
        $stmt = $this->conn->prepare($query);
        
        $this->nombre = htmlspecialchars(strip_tags($this->nombre));
        $this->ruc = htmlspecialchars(strip_tags($this->ruc));
        $this->direccion = htmlspecialchars(strip_tags($this->direccion));
        $this->telefono = htmlspecialchars(strip_tags($this->telefono));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->sector_servicio = htmlspecialchars(strip_tags($this->sector_servicio));
        $this->localidad = htmlspecialchars(strip_tags($this->localidad));
        
        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":ruc", $this->ruc);
        $stmt->bindParam(":direccion", $this->direccion);
        $stmt->bindParam(":telefono", $this->telefono);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":sector_servicio", $this->sector_servicio);
        $stmt->bindParam(":localidad", $this->localidad);
        $stmt->bindParam(":seguro_RT", $this->seguro_RT);
        $stmt->bindParam(":habilitacion_personal", $this->habilitacion_personal);
        $stmt->bindParam(":habilitacion_vehiculo", $this->habilitacion_vehiculo);
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
            $this->sector_servicio = $row['sector_servicio'];
            $this->localidad = $row['localidad'];
            $this->seguro_RT = $row['seguro_RT'];
            $this->habilitacion_personal = $row['habilitacion_personal'];
            $this->habilitacion_vehiculo = $row['habilitacion_vehiculo'];
            $this->activo = $row['activo'];
            $this->created_at = $row['created_at'];
            $this->updated_at = $row['updated_at'];
            return true;
        }
        return false;
    }

    public function actualizar() {
        $query = "UPDATE " . $this->table_name . " 
                  SET nombre = :nombre, ruc = :ruc, direccion = :direccion, 
                      telefono = :telefono, email = :email, sector_servicio = :sector_servicio,
                      localidad = :localidad, seguro_RT = :seguro_RT, 
                      habilitacion_personal = :habilitacion_personal, 
                      habilitacion_vehiculo = :habilitacion_vehiculo,
                      activo = :activo, updated_at = CURRENT_TIMESTAMP 
                  WHERE id = :id";
        
        $stmt = $this->conn->prepare($query);
        
        $this->nombre = htmlspecialchars(strip_tags($this->nombre));
        $this->ruc = htmlspecialchars(strip_tags($this->ruc));
        $this->direccion = htmlspecialchars(strip_tags($this->direccion));
        $this->telefono = htmlspecialchars(strip_tags($this->telefono));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->sector_servicio = htmlspecialchars(strip_tags($this->sector_servicio));
        $this->localidad = htmlspecialchars(strip_tags($this->localidad));
        $this->id = htmlspecialchars(strip_tags($this->id));
        
        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":ruc", $this->ruc);
        $stmt->bindParam(":direccion", $this->direccion);
        $stmt->bindParam(":telefono", $this->telefono);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":sector_servicio", $this->sector_servicio);
        $stmt->bindParam(":localidad", $this->localidad);
        $stmt->bindParam(":seguro_RT", $this->seguro_RT);
        $stmt->bindParam(":habilitacion_personal", $this->habilitacion_personal);
        $stmt->bindParam(":habilitacion_vehiculo", $this->habilitacion_vehiculo);
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