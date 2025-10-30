<?php
class Alerta {
    private $conn;
    private $table_name = "alertas";

    public $id;
    public $tipo;
    public $mensaje;
    public $vehiculo_id;
    public $fecha_generada;
    public $fecha_vista;
    public $estado;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function crear() {
        $query = "INSERT INTO " . $this->table_name . " 
                 SET tipo=:tipo, mensaje=:mensaje, vehiculo_id=:vehiculo_id, 
                     estado=:estado";
        
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(":tipo", $this->tipo);
        $stmt->bindParam(":mensaje", $this->mensaje);
        $stmt->bindParam(":vehiculo_id", $this->vehiculo_id);
        $stmt->bindParam(":estado", $this->estado);
        
        return $stmt->execute();
    }

    public function leer() {
        $query = "SELECT a.*, v.dominio as vehiculo_dominio 
                  FROM " . $this->table_name . " a 
                  LEFT JOIN vehiculos v ON a.vehiculo_id = v.interno 
                  ORDER BY a.fecha_generada DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function leerPendientes() {
        $query = "SELECT a.*, v.dominio as vehiculo_dominio 
                  FROM " . $this->table_name . " a 
                  LEFT JOIN vehiculos v ON a.vehiculo_id = v.interno 
                  WHERE a.estado = 'pendiente' 
                  ORDER BY a.fecha_generada DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
}
?>