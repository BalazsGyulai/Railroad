<?php
header('Access-Control-Allow-Origin: *');
require("./header.php");

if ($input !== NULL && $input["code"] !== "") {
    require_once("./connect/connect.php");

    $code = $input["code"];
    $data = [];

    $stmt = $database->stmt_init();
    if (!$stmt = $database->prepare("SELECT rolled FROM groups WHERE code = ?")) {
        $data["status"] = "failed to connect";
        echo json_encode($data);
        exit;
    };
    $stmt->bind_param("s", $code);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $data["rolled"] = $result->fetch_assoc();

    $data["status"] = "ok";

    echo json_encode($data);
} else {
    echo json_encode("failed request");
}
