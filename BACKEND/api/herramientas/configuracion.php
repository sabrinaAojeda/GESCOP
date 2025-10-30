<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, PUT");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../config/database.php';
include_once '../../models/Configuracion.php';

$database = new Database();
$db = $database->getConnection();
$configuracion = new Configuracion($db);

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        $clave = $_GET['clave'] ?? '';
        
        if(!empty($clave)) {
            $valor = $configuracion->obtenerValor($clave);
            if($valor !== null) {
                http_response_code(200);
                echo json_encode(array("clave" => $clave, "valor" => $valor));
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "Configuración no encontrada"));
            }
        } else {
            $stmt = $configuracion->leer();
            $num = $stmt->rowCount();
            
            if($num > 0) {
                $configs_arr = array();
                $configs_arr["configuraciones"] = array();
                
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    array_push($configs_arr["configuraciones"], $row);
                }
                
                http_response_code(200);
                echo json_encode($configs_arr);
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "No se encontraron configuraciones"));
            }
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"));
        
        if(!empty($data->clave) && isset($data->valor)) {
            $configuracion->clave = $data->clave;
            $configuracion->valor = $data->valor;
            
            if($configuracion->actualizar()) {
                http_response_code(200);
                echo json_encode(array("message" => "Configuración actualizada exitosamente"));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "No se pudo actualizar la configuración"));
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