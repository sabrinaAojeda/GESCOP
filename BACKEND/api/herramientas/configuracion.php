<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, PUT');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

require_once '../config/conexion.php';
require_once '../models/Configuration.php';

class ConfiguracionController {
    private $configuracion;
    private $conn;

    public function __construct() {
        $this->conn = Conexion::getConexion();
        $this->configuracion = new Configuration($this->conn);
    }

    // GET /configuracion - Obtener todas las configuraciones
    public function obtenerConfiguracion() {
        try {
            $query = "SELECT * FROM configuraciones ORDER BY clave";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            $configuraciones = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $config = array();
            foreach ($configuraciones as $conf) {
                $config[$conf['clave']] = array(
                    "valor" => $conf['valor'],
                    "descripcion" => $conf['descripcion'],
                    "actualizado_en" => $conf['actualizado_en']
                );
            }

            // Configuración por defecto si no existe
            $configDefaults = [
                'reporte_frecuencia' => ['valor' => '7', 'descripcion' => 'Frecuencia en días para generar reportes automáticos'],
                'reporte_formato' => ['valor' => 'csv', 'descripcion' => 'Formato de reporte (csv o pdf)'],
                'alertas_dias_previos' => ['valor' => '30', 'descripcion' => 'Días previos para alertas de vencimiento'],
                'alertas_habilitaciones' => ['valor' => '1', 'descripcion' => 'Activar alertas para habilitaciones'],
                'alertas_servicios' => ['valor' => '1', 'descripcion' => 'Activar alertas para servicios']
            ];

            // Asegurar que todas las configuraciones existan
            foreach ($configDefaults as $clave => $default) {
                if (!isset($config[$clave])) {
                    $this->crearConfiguracion($clave, $default['valor'], $default['descripcion']);
                    $config[$clave] = $default;
                    $config[$clave]['actualizado_en'] = date('Y-m-d H:i:s');
                }
            }

            echo json_encode(array(
                "configuraciones" => $config
            ));

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(array("mensaje" => "Error: " . $e->getMessage()));
        }
    }

    // PUT /configuracion - Actualizar configuraciones
    public function actualizarConfiguracion() {
        try {
            $data = json_decode(file_get_contents("php://input"), true);
            
            if (empty($data)) {
                http_response_code(400);
                echo json_encode(array("mensaje" => "No se proporcionaron datos para actualizar"));
                return;
            }

            $actualizadas = 0;
            $errores = array();

            foreach ($data as $clave => $valor) {
                // Verificar si existe
                $queryCheck = "SELECT id FROM configuraciones WHERE clave = ?";
                $stmtCheck = $this->conn->prepare($queryCheck);
                $stmtCheck->execute([$clave]);
                
                if ($stmtCheck->rowCount() > 0) {
                    // Actualizar
                    $query = "UPDATE configuraciones SET valor = ?, actualizado_en = NOW() WHERE clave = ?";
                    $stmt = $this->conn->prepare($query);
                    if ($stmt->execute([$valor, $clave])) {
                        $actualizadas++;
                    } else {
                        $errores[] = $clave;
                    }
                } else {
                    // Insertar
                    $query = "INSERT INTO configuraciones (clave, valor) VALUES (?, ?)";
                    $stmt = $this->conn->prepare($query);
                    if ($stmt->execute([$clave, $valor])) {
                        $actualizadas++;
                    } else {
                        $errores[] = $clave;
                    }
                }
            }

            $respuesta = array("mensaje" => "Configuración actualizada exitosamente");
            if ($actualizadas > 0) {
                $respuesta["actualizadas"] = $actualizadas;
            }
            if (!empty($errores)) {
                $respuesta["errores"] = $errores;
            }

            echo json_encode($respuesta);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(array("mensaje" => "Error: " . $e->getMessage()));
        }
    }

    private function crearConfiguracion($clave, $valor, $descripcion = '') {
        $query = "INSERT INTO configuraciones (clave, valor, descripcion) VALUES (?, ?, ?)";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute([$clave, $valor, $descripcion]);
    }

    // GET /configuracion/[clave] - Obtener configuración específica
    public function obtenerConfiguracionEspecifica($clave) {
        try {
            $query = "SELECT * FROM configuraciones WHERE clave = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->execute([$clave]);
            $configuracion = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($configuracion) {
                echo json_encode(array(
                    "configuracion" => array(
                        "clave" => $configuracion['clave'],
                        "valor" => $configuracion['valor'],
                        "descripcion" => $configuracion['descripcion'],
                        "actualizado_en" => $configuracion['actualizado_en']
                    )
                ));
            } else {
                http_response_code(404);
                echo json_encode(array("mensaje" => "Configuración no encontrada"));
            }

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(array("mensaje" => "Error: " . $e->getMessage()));
        }
    }
}

// Routing
$method = $_SERVER['REQUEST_METHOD'];
$controller = new ConfiguracionController();

$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH);
$base_path = '/BACKEND/api/herramientas/configuracion.php';
$relative_path = str_replace($base_path, '', $path);

if ($relative_path == '' || $relative_path == '/') {
    switch($method) {
        case 'GET':
            $controller->obtenerConfiguracion();
            break;
        case 'PUT':
            $controller->actualizarConfiguracion();
            break;
        default:
            http_response_code(405);
            echo json_encode(array("mensaje" => "Método no permitido"));
            break;
    }
} elseif (preg_match('/\/([a-zA-Z_]+)/', $relative_path, $matches)) {
    $clave = $matches[1];
    if ($method == 'GET') {
        $controller->obtenerConfiguracionEspecifica($clave);
    } else {
        http_response_code(405);
        echo json_encode(array("mensaje" => "Método no permitido"));
    }
} else {
    http_response_code(404);
    echo json_encode(array("mensaje" => "Endpoint no encontrado"));
}
?>