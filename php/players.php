<?php
require("./header.php");

if ($input !== NULL && $input["code"] !== "") {
    require_once("./connect/connect.php");

    $code = $input["code"];
    $data = [];

    $stmt = $database->stmt_init();
    if (!$stmt = $database->prepare("SELECT users.*, groups.code, groups.round, groups.rolled, playersstatus.status FROM users INNER JOIN groups ON users.codeID = groups.id INNER JOIN playersstatus ON playersstatus.userID = users.id WHERE groups.code = ?")) {
        $data["status"] = "failed to connect";
        echo json_encode($data);
        exit;
    };
    $stmt->bind_param("s", $code);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $data["users"] = [];

    foreach ($result as $player){
        array_push($data["users"], $player);
    }

    $data["status"] = "ok";

    echo json_encode($data);
} else {
    echo json_encode("failed request");
}
