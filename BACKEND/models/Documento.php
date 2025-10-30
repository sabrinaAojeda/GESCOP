<?php
class Documento {
    private $conn;
    private $table_name = "documentos";

    public $id;
    public $vehiculo_id;
    public $tipo;
    public $nombre;
    public $ruta_archivo;
    public $fecha_vencimiento;
    public $estado;
    public $observaciones;
    public $fecha_creacion;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function crear() {
        $query = "INSERT INTO " . $this->table_name . " 
                 SET vehiculo_id=:vehiculo_id, tipo=:tipo, nombre=:nombre, 
                     ruta_archivo=:ruta_archivo, fecha_vencimiento=:fecha_vencimiento, 
                     estado=:estado, observaciones=:observaciones";
        
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(":vehiculo_id", $this->vehiculo_id);
        $stmt->bindParam(":tipo", $this->tipo);
        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":ruta_archivo", $this->ruta_archivo);
        $stmt->bindParam(":fecha_vencimiento", $this->fecha_vencimiento);
        $stmt->bindParam(":estado", $this->estado);
        $stmt->bindParam(":observaciones", $this->observaciones);
        
        return $stmt->execute();
    }

    public function leer() {
        $query = "SELECT d.*, v.dominio as vehiculo_dominio 
                  FROM " . $this->table_name . " d 
                  LEFT JOIN vehiculos v ON d.vehiculo_id = v.interno 
                  ORDER BY d.fecha_vencimiento";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
}
?>