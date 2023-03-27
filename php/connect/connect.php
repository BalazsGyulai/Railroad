<?php
header('Access-Control-Allow-Origin: *');
define("DB_HOST", "localhost");
define('DB_USER', '1126_railroadink');
define('DB_PASSWORD', 'Gyu0531Ba');
define('DB_NAME', '1126_railroadink');

@$database = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

if (mysqli_connect_errno()) {
    echo json_encode("failed to connect");
    exit;
}
