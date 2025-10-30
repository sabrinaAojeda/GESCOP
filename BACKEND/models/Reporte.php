<?php
class Reporte {
    private $conn;
    private $table_name = "reportes";

    public $id;
    public $nombre;
    public $ruta;
    public $tipo;
    public $generado_en;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function crear() {
        $query = "INSERT INTO " . $this->table_name . " 
                  (nombre, ruta, tipo) 
                  VALUES (:nombre, :ruta, :tipo)";
        
        $stmt = $this->conn->prepare($query);
        
        $this->nombre = htmlspecialchars(strip_tags($this->nombre));
        $this->ruta = htmlspecialchars(strip_tags($this->ruta));
        $this->tipo = htmlspecialchars(strip_tags($this->tipo));
        
        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":ruta", $this->ruta);
        $stmt->bindParam(":tipo", $this->tipo);
        
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
            $this->ruta = $row['ruta'];
            $this->tipo = $row['tipo'];
            $this->generado_en = $row['generado_en'];
            return true;
        }
        return false;
    }

    public function leer() {
        $query = "SELECT * FROM " . $this->table_name . " ORDER BY generado_en DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function eliminar() {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        
        if ($stmt->execute()) {
            // También eliminar el archivo físico
            if (file_exists($this->ruta)) {
                unlink($this->ruta);
            }
            return true;
        }
        return false;
    }
}
?>