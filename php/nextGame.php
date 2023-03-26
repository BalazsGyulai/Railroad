<?php
require("./header.php");

if ($input !== NULL && $input["code"] !== "" && $input["round"] !== "") {
    require_once("./connect/connect.php");

    $code = $input["code"];
    $round = intval($input["round"]) + 1;

    $data = [];

    $stmt = $database->stmt_init();
    if (!$stmt = $database->prepare("UPDATE groups SET round = ? WHERE code = ?")) {
        $data["status"] = "failed to connect";
        echo json_encode($data);
        exit;
    };
    $stmt->bind_param("is", $round, $code);
    $stmt->execute();

    $data["status"] = "ok";

    echo json_encode($data);
} else {
    echo json_encode("failed request");
}
