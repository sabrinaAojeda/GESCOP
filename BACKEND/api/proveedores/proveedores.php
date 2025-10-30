<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../config/database.php';
include_once '../../models/Proveedor.php';

$database = new Database();
$db = $database->getConnection();
$proveedor = new Proveedor($db);

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        $stmt = $proveedor->leer();
        $num = $stmt->rowCount();
        
        if($num > 0) {
            $proveedores_arr = array();
            $proveedores_arr["proveedores"] = array();
            
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                array_push($proveedores_arr["proveedores"], $row);
            }
            
            http_response_code(200);
            echo json_encode($proveedores_arr);
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "No se encontraron proveedores"));
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        
        if(!empty($data->nombre) && !empty($data->cuit)) {
            $proveedor->nombre = $data->nombre;
            $proveedor->cuit = $data->cuit;
            $proveedor->direccion = $data->direccion;
            $proveedor->telefono = $data->telefono;
            $proveedor->email = $data->email;
            $proveedor->contacto = $data->contacto;
            $proveedor->rubro = $data->rubro;
            $proveedor->estado = $data->estado;
            
            if($proveedor->crear()) {
                http_response_code(201);
                echo json_encode(array("message" => "Proveedor creado exitosamente"));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "No se pudo crear el proveedor"));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Datos incompletos"));
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(array("message" => "Método no permitido"));
        break;
}
?>