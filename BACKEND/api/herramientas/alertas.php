<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../config/database.php';
include_once '../../models/Alerta.php';

$database = new Database();
$db = $database->getConnection();
$alerta = new Alerta($db);

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        $tipo = $_GET['tipo'] ?? 'todas';
        
        if($tipo === 'pendientes') {
            $stmt = $alerta->leerPendientes();
        } else {
            $stmt = $alerta->leer();
        }
        
        $num = $stmt->rowCount();
        
        if($num > 0) {
            $alertas_arr = array();
            $alertas_arr["alertas"] = array();
            
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                array_push($alertas_arr["alertas"], $row);
            }
            
            http_response_code(200);
            echo json_encode($alertas_arr);
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "No se encontraron alertas"));
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        
        if(!empty($data->tipo) && !empty($data->mensaje)) {
            $alerta->tipo = $data->tipo;
            $alerta->mensaje = $data->mensaje;
            $alerta->vehiculo_id = $data->vehiculo_id;
            $alerta->estado = 'pendiente';
            
            if($alerta->crear()) {
                http_response_code(201);
                echo json_encode(array("message" => "Alerta creada exitosamente"));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "No se pudo crear la alerta"));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Datos incompletos"));
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"));
        
        if(!empty($data->id)) {
            // Marcar alerta como vista
            $query = "UPDATE alertas SET estado = 'vista', fecha_vista = NOW() WHERE id = ?";
            $stmt = $db->prepare($query);
            $stmt->bindParam(1, $data->id);
            
            if($stmt->execute()) {
                http_response_code(200);
                echo json_encode(array("message" => "Alerta marcada como vista"));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "No se pudo actualizar la alerta"));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "ID requerido"));
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(array("message" => "Método no permitido"));
        break;
}
?>