<?php
header('Access-Control-Allow-Origin: *');
require("./header.php");

if ($input !== NULL && $input["code"] !== "" && $input["round"] !== "") {
    require_once("./connect/connect.php");

    $code = $input["code"];
    $round = $input["round"];
    $page = "join";

    $stmt = $database->stmt_init();
    if (!$stmt = $database->prepare("UPDATE groups SET round = ?, actpage = ? WHERE code = ?")) {
        $data["status"] = "failed to connect";
        echo json_encode($data);
        exit;
    };
    $stmt->bind_param("isi", $round, $page, $code);
    $stmt->execute();
    
    $data["status"] = "ok";

    echo json_encode($data);
} else {
    echo json_encode("failed request");
}
