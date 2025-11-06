<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

require_once '../config/database.php';

// Routing básico
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$segments = explode('/', trim($path, '/'));

if (count($segments) >= 3 && $segments[1] == 'api') {
    $endpoint = $segments[2];
    
    switch ($endpoint) {
        case 'auth':
            require_once 'auth.php';
            break;
        case 'empresas':
            require_once 'empresas/habilitaciones.php';
            break;
        case 'vehiculos':
            require_once 'flota/vehiculos.php';
            break;
        // Agrega más endpoints según necesites
        default:
            http_response_code(404);
            echo json_encode(['error' => 'Endpoint no encontrado']);
            break;
    }
}
?>