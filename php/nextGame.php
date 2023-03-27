<?php
require("./header.php");

if ($input !== NULL && $input["code"] !== "" && $input["round"] !== "" && $input["page"]!== "") {
    require_once("./connect/connect.php");

    $code = $input["code"];
    $round = intval($input["round"]) + 1;
    $rolled = null;
    
    if ($input["rolled"] !== "" && $input["rolled"] !== [] && $input["rolled"] !== null) {
        $rolled = json_encode($input["rolled"]);
    }
    
    $page = $input["page"];

    $data = [];

    $stmt = $database->stmt_init();
    if (!$stmt = $database->prepare("UPDATE groups SET round = ?, rolled = ?, actpage = ?  WHERE code = ?")) {
        $data["status"] = "failed to connect";
        echo json_encode($data);
        exit;
    };
    $stmt->bind_param("isss", $round, $rolled, $page, $code);
    $stmt->execute();

    $data["status"] = "ok";

    echo json_encode($data);
} else {
    echo json_encode("failed request");
}
