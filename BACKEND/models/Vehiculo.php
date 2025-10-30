<?php
class Vehiculo {
    private $conn;
    private $table_name = "vehiculos";

    // Propiedades según Rodado y Maquinaria + Lista de Vehículos
    public $interno;
    public $año;
    public $dominio;
    public $modelo;
    public $eq_incorporado;
    public $sector;
    public $chofer;
    public $estado;
    public $observaciones;
    public $vtv_vencimiento;
    public $vtv_estado;
    public $hab_vencimiento;
    public $hab_estado;
    public $seguro_vencimiento;
    public $tipo; // Rodado, Maquinaria

    public function __construct($db) {
        $this->conn = $db;
    }

    // Crear vehículo
    public function crear() {
        $query = "INSERT INTO " . $this->table_name . " 
                SET interno=:interno, año=:año, dominio=:dominio, modelo=:modelo, 
                    eq_incorporado=:eq_incorporado, sector=:sector, chofer=:chofer, 
                    estado=:estado, observaciones=:observaciones, vtv_vencimiento=:vtv_vencimiento, 
                    vtv_estado=:vtv_estado, hab_vencimiento=:hab_vencimiento, 
                    hab_estado=:hab_estado, seguro_vencimiento=:seguro_vencimiento, tipo=:tipo";
        
        $stmt = $this->conn->prepare($query);
        
        // Bind parameters
        $stmt->bindParam(":interno", $this->interno);
        $stmt->bindParam(":año", $this->año);
        $stmt->bindParam(":dominio", $this->dominio);
        $stmt->bindParam(":modelo", $this->modelo);
        $stmt->bindParam(":eq_incorporado", $this->eq_incorporado);
        $stmt->bindParam(":sector", $this->sector);
        $stmt->bindParam(":chofer", $this->chofer);
        $stmt->bindParam(":estado", $this->estado);
        $stmt->bindParam(":observaciones", $this->observaciones);
        $stmt->bindParam(":vtv_vencimiento", $this->vtv_vencimiento);
        $stmt->bindParam(":vtv_estado", $this->vtv_estado);
        $stmt->bindParam(":hab_vencimiento", $this->hab_vencimiento);
        $stmt->bindParam(":hab_estado", $this->hab_estado);
        $stmt->bindParam(":seguro_vencimiento", $this->seguro_vencimiento);
        $stmt->bindParam(":tipo", $this->tipo);
        
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    // Leer todos los vehículos
    public function leer() {
        $query = "SELECT * FROM " . $this->table_name . " ORDER BY interno";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Leer un solo vehículo
    public function leerUno() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE interno = ? LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->interno);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if($row) {
            $this->interno = $row['interno'];
            $this->año = $row['año'];
            $this->dominio = $row['dominio'];
            $this->modelo = $row['modelo'];
            $this->eq_incorporado = $row['eq_incorporado'];
            $this->sector = $row['sector'];
            $this->chofer = $row['chofer'];
            $this->estado = $row['estado'];
            $this->observaciones = $row['observaciones'];
            $this->vtv_vencimiento = $row['vtv_vencimiento'];
            $this->vtv_estado = $row['vtv_estado'];
            $this->hab_vencimiento = $row['hab_vencimiento'];
            $this->hab_estado = $row['hab_estado'];
            $this->seguro_vencimiento = $row['seguro_vencimiento'];
            $this->tipo = $row['tipo'];
            return true;
        }
        return false;
    }

    // Actualizar vehículo
    public function actualizar() {
        $query = "UPDATE " . $this->table_name . " 
                SET año=:año, dominio=:dominio, modelo=:modelo, eq_incorporado=:eq_incorporado, 
                    sector=:sector, chofer=:chofer, estado=:estado, observaciones=:observaciones, 
                    vtv_vencimiento=:vtv_vencimiento, vtv_estado=:vtv_estado, 
                    hab_vencimiento=:hab_vencimiento, hab_estado=:hab_estado, 
                    seguro_vencimiento=:seguro_vencimiento, tipo=:tipo
                WHERE interno = :interno";
        
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(":interno", $this->interno);
        $stmt->bindParam(":año", $this->año);
        $stmt->bindParam(":dominio", $this->dominio);
        $stmt->bindParam(":modelo", $this->modelo);
        $stmt->bindParam(":eq_incorporado", $this->eq_incorporado);
        $stmt->bindParam(":sector", $this->sector);
        $stmt->bindParam(":chofer", $this->chofer);
        $stmt->bindParam(":estado", $this->estado);
        $stmt->bindParam(":observaciones", $this->observaciones);
        $stmt->bindParam(":vtv_vencimiento", $this->vtv_vencimiento);
        $stmt->bindParam(":vtv_estado", $this->vtv_estado);
        $stmt->bindParam(":hab_vencimiento", $this->hab_vencimiento);
        $stmt->bindParam(":hab_estado", $this->hab_estado);
        $stmt->bindParam(":seguro_vencimiento", $this->seguro_vencimiento);
        $stmt->bindParam(":tipo", $this->tipo);
        
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    // Eliminar vehículo
    public function eliminar() {
        $query = "DELETE FROM " . $this->table_name . " WHERE interno = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->interno);
        
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}
?>