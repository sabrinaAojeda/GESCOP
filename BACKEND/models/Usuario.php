<?php
class Usuario {
    private $conn;
    private $table_name = "usuarios";

    public $id;
    public $email;
    public $password;
    public $nombre;
    public $creado_en;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Login de usuario
    public function login() {
        $query = "SELECT id, nombre, password FROM " . $this->table_name . " WHERE email = ? LIMIT 0,1";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->email);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            
            // Verificar password
            if (password_verify($this->password, $row['password'])) {
                $this->id = $row['id'];
                $this->nombre = $row['nombre'];
                return true;
            }
        }
        return false;
    }

    // Crear nuevo usuario (para después)
    public function crear() {
        $query = "INSERT INTO " . $this->table_name . " SET email=:email, password=:password, nombre=:nombre";
        
        $stmt = $this->conn->prepare($query);
        
        // Hash password
        $this->password = password_hash($this->password, PASSWORD_DEFAULT);
        
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":password", $this->password);
        $stmt->bindParam(":nombre", $this->nombre);
        
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}
?>