<?php
require("./header.php");

if ($input !== NULL && $input["code"] !== "" && $input["page"] !== "") {

    $code = $input["code"];
    $page = $input["page"];

    $stmt = $database->stmt_init();
    if (!$stmt = $database->prepare("UPDATE groups SET actpage = ? WHERE code = ?")) {
        $data["status"] = "failed to connect";
        echo json_encode($data);
        exit;
    };
    $stmt->bind_param("ss", $page, $code);
    $stmt->execute();
    
    $data["status"] = "ok";

    echo json_encode($data);
} else {
    echo json_encode("failed request");
}
