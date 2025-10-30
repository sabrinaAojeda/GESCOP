<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../config/database.php';
include_once '../../models/Personal.php';

$database = new Database();
$db = $database->getConnection();
$personal = new Personal($db);

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        $stmt = $personal->leer();
        $num = $stmt->rowCount();
        
        if($num > 0) {
            $personal_arr = array();
            $personal_arr["personal"] = array();
            
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                array_push($personal_arr["personal"], $row);
            }
            
            http_response_code(200);
            echo json_encode($personal_arr);
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "No se encontró personal"));
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        
        if(
            !empty($data->dni) &&
            !empty($data->nombre) &&
            !empty($data->apellido)
        ) {
            $personal->dni = $data->dni;
            $personal->nombre = $data->nombre;
            $personal->apellido = $data->apellido;
            $personal->telefono = $data->telefono;
            $personal->email = $data->email;
            $personal->cargo = $data->cargo;
            $personal->sector = $data->sector;
            $personal->fecha_ingreso = $data->fecha_ingreso;
            $personal->estado = $data->estado;
            
            if($personal->crear()) {
                http_response_code(201);
                echo json_encode(array("message" => "Personal creado exitosamente"));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "No se pudo crear el personal"));
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