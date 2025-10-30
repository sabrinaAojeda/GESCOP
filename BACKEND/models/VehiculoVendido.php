<?php
class VehiculoVendido {
    private $conn;
    private $table_name = "vehiculos_vendidos";

    public $id;
    public $interno;
    public $dominio;
    public $marca_modelo;
    public $fecha_venta;
    public $comprador;
    public $precio;
    public $estado_documentacion;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function crear() {
        $query = "INSERT INTO " . $this->table_name . " 
                 SET interno=:interno, dominio=:dominio, marca_modelo=:marca_modelo, 
                     fecha_venta=:fecha_venta, comprador=:comprador, precio=:precio, 
                     estado_documentacion=:estado_documentacion";
        
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(":interno", $this->interno);
        $stmt->bindParam(":dominio", $this->dominio);
        $stmt->bindParam(":marca_modelo", $this->marca_modelo);
        $stmt->bindParam(":fecha_venta", $this->fecha_venta);
        $stmt->bindParam(":comprador", $this->comprador);
        $stmt->bindParam(":precio", $this->precio);
        $stmt->bindParam(":estado_documentacion", $this->estado_documentacion);
        
        return $stmt->execute();
    }

    public function leer() {
        $query = "SELECT * FROM " . $this->table_name . " ORDER BY fecha_venta DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
}
?>