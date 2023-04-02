<?php
require("./header.php");

$host = "localhost";
$port = 4000;
set_time_limit(0);

$socket = socket_create(AF_INET, SOCK_STREAM, 0) or die("Could not create socket\n");
$result = socket_bind($socket, $host, $port) or die ("Could not bind socket\n");
$result = socket_listen($socket, 3) or die("Could not set up socket listener\n");
$spawn = socket_accept($socket) or die("Could not accept incoming connection\n");

// $input = socket_read($spawn, 1024) or die("Could not read input\n");
// $output = strrev($input) . "\n";
socket_write($spawn, $output, "Server") or die("Could not write output\n");

socket_close($spawn);
socket_close($socket);
// phpinfo();
// exit;


// if ($input !== NULL && $input["code"] !== "") {
//     require_once("./connect/connect.php");

//     $code = $input["code"];
//     $data = [];

//     $stmt = $database->stmt_init();
//     if (!$stmt = $database->prepare("SELECT actpage, round FROM groups WHERE code = ?")) {
//         $data["status"] = "failed to connect";
//         echo json_encode($data);
//         exit;
//     };
//     $stmt->bind_param("s", $code);
//     $stmt->execute();
//     $result = $stmt->get_result();
    
//     $data["page"] = $result->fetch_assoc();

//     $data["status"] = "ok";

//     echo json_encode($data);
// } else {
//     echo json_encode("failed request");
// }
