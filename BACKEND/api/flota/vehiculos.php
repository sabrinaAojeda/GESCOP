<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../config/database.php';
include_once '../../models/Vehiculo.php';

$database = new Database();
$db = $database->getConnection();
$vehiculo = new Vehiculo($db);

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        // Obtener un vehículo específico o todos
        if(isset($_GET['interno'])) {
            $vehiculo->interno = $_GET['interno'];
            if($vehiculo->leerUno()) {
                http_response_code(200);
                echo json_encode(array(
                    "interno" => $vehiculo->interno,
                    "año" => $vehiculo->año,
                    "dominio" => $vehiculo->dominio,
                    "modelo" => $vehiculo->modelo,
                    "eq_incorporado" => $vehiculo->eq_incorporado,
                    "sector" => $vehiculo->sector,
                    "chofer" => $vehiculo->chofer,
                    "estado" => $vehiculo->estado,
                    "observaciones" => $vehiculo->observaciones,
                    "vtv_vencimiento" => $vehiculo->vtv_vencimiento,
                    "vtv_estado" => $vehiculo->vtv_estado,
                    "hab_vencimiento" => $vehiculo->hab_vencimiento,
                    "hab_estado" => $vehiculo->hab_estado,
                    "seguro_vencimiento" => $vehiculo->seguro_vencimiento,
                    "tipo" => $vehiculo->tipo
                ));
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "Vehículo no encontrado"));
            }
        } else {
            // Obtener todos los vehículos
            $stmt = $vehiculo->leer();
            $num = $stmt->rowCount();
            
            if($num > 0) {
                $vehiculos_arr = array();
                $vehiculos_arr["vehiculos"] = array();
                
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    array_push($vehiculos_arr["vehiculos"], $row);
                }
                
                http_response_code(200);
                echo json_encode($vehiculos_arr);
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "No se encontraron vehículos"));
            }
        }
        break;

    case 'POST':
        // Crear nuevo vehículo
        $data = json_decode(file_get_contents("php://input"));
        
        if(
            !empty($data->interno) &&
            !empty($data->dominio) &&
            !empty($data->modelo) &&
            !empty($data->estado)
        ) {
            $vehiculo->interno = $data->interno;
            $vehiculo->año = $data->año;
            $vehiculo->dominio = $data->dominio;
            $vehiculo->modelo = $data->modelo;
            $vehiculo->eq_incorporado = $data->eq_incorporado;
            $vehiculo->sector = $data->sector;
            $vehiculo->chofer = $data->chofer;
            $vehiculo->estado = $data->estado;
            $vehiculo->observaciones = $data->observaciones;
            $vehiculo->vtv_vencimiento = $data->vtv_vencimiento;
            $vehiculo->vtv_estado = $data->vtv_estado;
            $vehiculo->hab_vencimiento = $data->hab_vencimiento;
            $vehiculo->hab_estado = $data->hab_estado;
            $vehiculo->seguro_vencimiento = $data->seguro_vencimiento;
            $vehiculo->tipo = $data->tipo;
            
            if($vehiculo->crear()) {
                http_response_code(201);
                echo json_encode(array("message" => "Vehículo creado exitosamente"));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "No se pudo crear el vehículo"));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Datos incompletos"));
        }
        break;

    case 'PUT':
        // Actualizar vehículo
        $data = json_decode(file_get_contents("php://input"));
        
        if(!empty($data->interno)) {
            $vehiculo->interno = $data->interno;
            $vehiculo->año = $data->año;
            $vehiculo->dominio = $data->dominio;
            $vehiculo->modelo = $data->modelo;
            $vehiculo->eq_incorporado = $data->eq_incorporado;
            $vehiculo->sector = $data->sector;
            $vehiculo->chofer = $data->chofer;
            $vehiculo->estado = $data->estado;
            $vehiculo->observaciones = $data->observaciones;
            $vehiculo->vtv_vencimiento = $data->vtv_vencimiento;
            $vehiculo->vtv_estado = $data->vtv_estado;
            $vehiculo->hab_vencimiento = $data->hab_vencimiento;
            $vehiculo->hab_estado = $data->hab_estado;
            $vehiculo->seguro_vencimiento = $data->seguro_vencimiento;
            $vehiculo->tipo = $data->tipo;
            
            if($vehiculo->actualizar()) {
                http_response_code(200);
                echo json_encode(array("message" => "Vehículo actualizado exitosamente"));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "No se pudo actualizar el vehículo"));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Interno requerido"));
        }
        break;

    case 'DELETE':
        // Eliminar vehículo
        $data = json_decode(file_get_contents("php://input"));
        
        if(!empty($data->interno)) {
            $vehiculo->interno = $data->interno;
            
            if($vehiculo->eliminar()) {
                http_response_code(200);
                echo json_encode(array("message" => "Vehículo eliminado exitosamente"));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "No se pudo eliminar el vehículo"));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Interno requerido"));
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(array("message" => "Método no permitido"));
        break;
}
?>