<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

require_once '../config/conexion.php';
require_once '../models/Habilitacion.php';
require_once '../models/Servicio.php';

class AlertasController {
    private $conn;
    private $habilitacion;
    private $servicio;

    public function __construct() {
        $this->conn = Conexion::getConexion();
        $this->habilitacion = new Habilitacion($this->conn);
        $this->servicio = new Servicio($this->conn);
    }

    // GET /alertas - Obtener todas las alertas
    public function obtenerAlertas() {
        try {
            $alertas = array();
            
            // 1. Alertas de habilitaciones próximas a vencer
            $stmtHabilitaciones = $this->habilitacion->obtenerProximasAVencer(30);
            $habilitaciones = $stmtHabilitaciones->fetchAll(PDO::FETCH_ASSOC);
            
            foreach ($habilitaciones as $hab) {
                $dias_restantes = $this->calcularDiasRestantes($hab['fecha_vencimiento']);
                $alertas[] = array(
                    'id' => 'hab_' . $hab['id'],
                    'tipo' => 'habilitacion',
                    'titulo' => 'Habilitación próxima a vencer',
                    'mensaje' => "La habilitación {$hab['tipo']} de {$hab['entidad_nombre']} vence en {$dias_restantes} días",
                    'entidad_tipo' => $hab['entidad_tipo'],
                    'entidad_id' => $hab['entidad_id'],
                    'entidad_nombre' => $hab['entidad_nombre'],
                    'fecha_vencimiento' => $hab['fecha_vencimiento'],
                    'dias_restantes' => $dias_restantes,
                    'prioridad' => $dias_restantes <= 7 ? 'alta' : ($dias_restantes <= 15 ? 'media' : 'baja'),
                    'fecha_creacion' => date('Y-m-d H:i:s')
                );
            }
            
            // 2. Alertas de servicios próximos a vencer
            $serviciosProximos = $this->obtenerServiciosProximosAVencer(30);
            foreach ($serviciosProximos as $serv) {
                $dias_restantes = $this->calcularDiasRestantes($serv['fecha_vencimiento']);
                $alertas[] = array(
                    'id' => 'serv_' . $serv['id'],
                    'tipo' => 'servicio',
                    'titulo' => 'Servicio próximo a vencer',
                    'mensaje' => "El servicio {$serv['nombre_servicio']} en {$serv['sede_nombre']} vence en {$dias_restantes} días",
                    'entidad_tipo' => 'servicio',
                    'entidad_id' => $serv['id'],
                    'entidad_nombre' => $serv['nombre_servicio'],
                    'fecha_vencimiento' => $serv['fecha_vencimiento'],
                    'dias_restantes' => $dias_restantes,
                    'prioridad' => $dias_restantes <= 7 ? 'alta' : ($dias_restantes <= 15 ? 'media' : 'baja'),
                    'fecha_creacion' => date('Y-m-d H:i:s')
                );
            }
            
            // 3. Alertas de empresas sin sedes
            $empresasSinSedes = $this->obtenerEmpresasSinSedes();
            foreach ($empresasSinSedes as $empresa) {
                $alertas[] = array(
                    'id' => 'emp_' . $empresa['id'],
                    'tipo' => 'empresa',
                    'titulo' => 'Empresa sin sedes',
                    'mensaje' => "La empresa {$empresa['nombre']} no tiene sedes registradas",
                    'entidad_tipo' => 'empresa',
                    'entidad_id' => $empresa['id'],
                    'entidad_nombre' => $empresa['nombre'],
                    'prioridad' => 'media',
                    'fecha_creacion' => date('Y-m-d H:i:s')
                );
            }
            
            // Ordenar alertas por prioridad (alta, media, baja)
            usort($alertas, function($a, $b) {
                $prioridades = ['alta' => 3, 'media' => 2, 'baja' => 1];
                return $prioridades[$b['prioridad']] - $prioridades[$a['prioridad']];
            });

            echo json_encode(array(
                "alertas" => $alertas,
                "total" => count($alertas),
                "resumen" => [
                    "alta" => count(array_filter($alertas, function($a) { return $a['prioridad'] === 'alta'; })),
                    "media" => count(array_filter($alertas, function($a) { return $a['prioridad'] === 'media'; })),
                    "baja" => count(array_filter($alertas, function($a) { return $a['prioridad'] === 'baja'; }))
                ]
            ));

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(array("mensaje" => "Error: " . $e->getMessage()));
        }
    }

    private function calcularDiasRestantes($fecha_vencimiento) {
        $fecha_vencimiento = new DateTime($fecha_vencimiento);
        $fecha_actual = new DateTime();
        $diferencia = $fecha_actual->diff($fecha_vencimiento);
        return $diferencia->invert ? 0 : $diferencia->days;
    }

    private function obtenerServiciosProximosAVencer($dias = 30) {
        $query = "SELECT s.*, se.nombre as sede_nombre 
                  FROM servicios s 
                  LEFT JOIN sedes se ON s.base_id = se.id 
                  WHERE s.fecha_vencimiento BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL ? DAY)
                  AND s.estado = 'activo'";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $dias);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    private function obtenerEmpresasSinSedes() {
        $query = "SELECT e.* 
                  FROM empresas e 
                  LEFT JOIN sedes s ON e.id = s.empresa_id AND s.activo = 1 
                  WHERE e.activo = 1 
                  AND s.id IS NULL";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

// Routing
$method = $_SERVER['REQUEST_METHOD'];
$controller = new AlertasController();

if ($method == 'GET') {
    $controller->obtenerAlertas();
} else {
    http_response_code(405);
    echo json_encode(array("mensaje" => "Método no permitido"));
}
?>