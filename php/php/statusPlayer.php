<?php
require("./header.php");

if ($input !== NULL && $input["code"] !== "" && $input["id"] !== "" && $input["status"] !== "") {

    $code = $input["code"];
    $id = $input["id"];
    $status =  $input["status"];

    $data = [];

    $stmt = $database->stmt_init();
    if (!$stmt = $database->prepare("UPDATE playersstatus SET status = ? WHERE userID = ?")) {
        $data["status"] = "failed to connect";
        echo json_encode($data);
        exit;
    };
    $stmt->bind_param("si", $status, $id);
    $stmt->execute();

    $data["status"] = "ok";

    echo json_encode($data);
} else {
    echo json_encode("failed request");
}
