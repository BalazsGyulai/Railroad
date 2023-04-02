<?php
require("./header.php");

if ($input !== NULL && $input["id"] !== "") {

    $id = $input["id"];

    $stmt = $database->stmt_init();
    if (!$stmt = $database->prepare("SELECT userBoard FROM boards WHERE userID = ?")) {
        $data["status"] = "failed to connect";
        echo json_encode($data);
        exit;
    };
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result()->fetch_assoc();

    $data["board"] = $result;
    $data["status"] = "ok";

    echo json_encode($data);
} else {
    echo json_encode("failed request");
}
