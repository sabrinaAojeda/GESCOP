<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../config/database.php';
include_once '../../models/Vehiculo.php';
include_once '../../models/VehiculoVendido.php';
include_once '../../models/Equipamiento.php';

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];
$tipo = $_GET['tipo'] ?? '';

switch($method) {
    case 'GET':
        switch($tipo) {
            case 'vehiculos_estado':
                reporteVehiculosPorEstado($db);
                break;
            case 'documentos_vencidos':
                reporteDocumentosVencidos($db);
                break;
            case 'ventas_mensuales':
                reporteVentasMensuales($db);
                break;
            case 'equipamiento_estado':
                reporteEquipamientoPorEstado($db);
                break;
            default:
                http_response_code(400);
                echo json_encode(array("message" => "Tipo de reporte no válido"));
                break;
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(array("message" => "Método no permitido"));
        break;
}

function reporteVehiculosPorEstado($db) {
    $query = "SELECT estado, COUNT(*) as cantidad FROM vehiculos GROUP BY estado";
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    $resultados = array();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $resultados[] = $row;
    }
    
    http_response_code(200);
    echo json_encode(array(
        "reporte" => "Vehiculos por Estado",
        "data" => $resultados
    ));
}

function reporteDocumentosVencidos($db) {
    $query = "SELECT COUNT(*) as vencidos FROM vehiculos 
              WHERE vtv_vencimiento < CURDATE() OR seguro_vencimiento < CURDATE() 
              OR hab_vencimiento < CURDATE()";
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
    http_response_code(200);
    echo json_encode(array(
        "reporte" => "Documentos Vencidos",
        "total_vencidos" => $row['vencidos']
    ));
}

function reporteVentasMensuales($db) {
    $query = "SELECT YEAR(fecha_venta) as año, MONTH(fecha_venta) as mes, 
                     COUNT(*) as cantidad, SUM(precio) as total 
              FROM vehiculos_vendidos 
              GROUP BY YEAR(fecha_venta), MONTH(fecha_venta) 
              ORDER BY año DESC, mes DESC";
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    $resultados = array();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $resultados[] = $row;
    }
    
    http_response_code(200);
    echo json_encode(array(
        "reporte" => "Ventas Mensuales",
        "data" => $resultados
    ));
}

function reporteEquipamientoPorEstado($db) {
    $query = "SELECT estado, COUNT(*) as cantidad FROM equipamientos GROUP BY estado";
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    $resultados = array();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $resultados[] = $row;
    }
    
    http_response_code(200);
    echo json_encode(array(
        "reporte" => "Equipamiento por Estado",
        "data" => $resultados
    ));
}
?>