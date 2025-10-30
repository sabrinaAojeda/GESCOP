<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../config/database.php';
include_once '../../models/Equipamiento.php';

$database = new Database();
$db = $database->getConnection();
$equipamiento = new Equipamiento($db);

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        $stmt = $equipamiento->leer();
        $num = $stmt->rowCount();
        
        if($num > 0) {
            $equipamientos_arr = array();
            $equipamientos_arr["equipamientos"] = array();
            
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                array_push($equipamientos_arr["equipamientos"], $row);
            }
            
            http_response_code(200);
            echo json_encode($equipamientos_arr);
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "No se encontraron equipamientos"));
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        
        if(
            !empty($data->codigo) &&
            !empty($data->descripcion) &&
            !empty($data->tipo)
        ) {
            $equipamiento->codigo = $data->codigo;
            $equipamiento->descripcion = $data->descripcion;
            $equipamiento->tipo = $data->tipo;
            $equipamiento->vehiculo_asignado = $data->vehiculo_asignado;
            $equipamiento->estado = $data->estado;
            $equipamiento->ultima_revision = $data->ultima_revision;
            $equipamiento->proxima_revision = $data->proxima_revision;
            
            if($equipamiento->crear()) {
                http_response_code(201);
                echo json_encode(array("message" => "Equipamiento creado exitosamente"));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "No se pudo crear el equipamiento"));
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