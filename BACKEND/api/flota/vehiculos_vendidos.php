<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../config/database.php';
include_once '../../models/VehiculoVendido.php';

$database = new Database();
$db = $database->getConnection();
$vehiculoVendido = new VehiculoVendido($db);

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        $stmt = $vehiculoVendido->leer();
        $num = $stmt->rowCount();
        
        if($num > 0) {
            $vehiculos_arr = array();
            $vehiculos_arr["vehiculos_vendidos"] = array();
            
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                array_push($vehiculos_arr["vehiculos_vendidos"], $row);
            }
            
            http_response_code(200);
            echo json_encode($vehiculos_arr);
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "No se encontraron vehículos vendidos"));
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        
        if(
            !empty($data->interno) &&
            !empty($data->dominio) &&
            !empty($data->marca_modelo) &&
            !empty($data->fecha_venta)
        ) {
            $vehiculoVendido->interno = $data->interno;
            $vehiculoVendido->dominio = $data->dominio;
            $vehiculoVendido->marca_modelo = $data->marca_modelo;
            $vehiculoVendido->fecha_venta = $data->fecha_venta;
            $vehiculoVendido->comprador = $data->comprador;
            $vehiculoVendido->precio = $data->precio;
            $vehiculoVendido->estado_documentacion = $data->estado_documentacion;
            
            if($vehiculoVendido->crear()) {
                http_response_code(201);
                echo json_encode(array("message" => "Vehículo vendido registrado exitosamente"));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "No se pudo registrar el vehículo vendido"));
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