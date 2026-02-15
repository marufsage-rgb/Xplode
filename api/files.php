<?php
/**
 * XPLODE ERP - File Management System Backend
 * Optimized for Ezyro / Free Hosting Environments
 */

// Enable error reporting for debugging (Disable this in production)
error_reporting(E_ALL);
ini_set('display_errors', 0); // Set to 0 to prevent breaking JSON output

// --- 1. CONFIGURATION ---
define('DB_HOST', 'sql208.ezyro.com');
define('DB_NAME', 'ezyro_41087923_marufedge'); 
define('DB_USER', 'ezyro_41087923');      
define('DB_PASS', '96522902');          

// Absolute path to upload directory
$upload_dir = __DIR__ . '/../uploads/';

// --- 2. HEADERS & SECURITY ---
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

// --- 3. INITIALIZATION ---
if (!is_dir($upload_dir)) {
    @mkdir($upload_dir, 0755, true);
}

try {
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8", DB_USER, DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed. Did you create the database in Ezyro?', 'details' => $e->getMessage()]);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

// --- 4. API ROUTER ---
switch ($method) {
    case 'GET':
        if ($action === 'list') {
            $path = $_GET['path'] ?? '/';
            $folder_id = null;
            
            if ($path !== '/') {
                $stmt = $pdo->prepare("SELECT id FROM erp_folders WHERE path = ? LIMIT 1");
                $stmt->execute([$path]);
                $folder_id = $stmt->fetchColumn();
            }

            $stmt = $pdo->prepare("SELECT id, name, path, parent_id FROM erp_folders WHERE " . ($folder_id ? "parent_id = ?" : "parent_id IS NULL"));
            $stmt->execute($folder_id ? [$folder_id] : []);
            $folders = $stmt->fetchAll();

            $stmt = $pdo->prepare("SELECT id, filename, file_hash, content_type, size, upload_date, uploader_ip, version FROM erp_files WHERE " . ($folder_id ? "folder_id = ?" : "folder_id IS NULL"));
            $stmt->execute($folder_id ? [$folder_id] : []);
            $files = $stmt->fetchAll();

            echo json_encode(['folders' => $folders, 'files' => $files, 'status' => 'online']);
        }
        break;

    case 'POST':
        if ($action === 'upload') {
            $path = $_POST['path'] ?? '/';
            $folder_id = null;
            if ($path !== '/') {
                $stmt = $pdo->prepare("SELECT id FROM erp_folders WHERE path = ? LIMIT 1");
                $stmt->execute([$path]);
                $folder_id = $stmt->fetchColumn();
            }

            if (!empty($_FILES['file'])) {
                $file = $_FILES['file'];
                $filename = basename($file['name']);
                $hash = md5_file($file['tmp_name']);
                $target_filename = $hash . '_' . time() . '_' . $filename;
                $target_path = $upload_dir . $target_filename;

                if (move_uploaded_file($file['tmp_name'], $target_path)) {
                    $stmt = $pdo->prepare("INSERT INTO erp_files (folder_id, filename, file_hash, content_type, size, uploader_ip, local_path) VALUES (?, ?, ?, ?, ?, ?, ?)");
                    $stmt->execute([$folder_id, $filename, $hash, $file['type'], $file['size'], $_SERVER['REMOTE_ADDR'], $target_filename]);
                    echo json_encode(['success' => true]);
                } else {
                    echo json_encode(['error' => 'Failed to move file. Ensure /uploads/ folder exists and is writable (755).']);
                }
            }
        }
        break;

    case 'DELETE':
        $id = $_GET['id'] ?? null;
        if ($id) {
            $stmt = $pdo->prepare("DELETE FROM erp_files WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(['success' => true]);
        }
        break;
}
?>