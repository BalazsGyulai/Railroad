<?php
require("./header.php");

if ($input !== NULL && $input["code"] !== "" && $input["id"] !== "") {

    $code = $input["code"];
    $id = $input["id"];

    $data = [];

    $stmt = $database->stmt_init();
    if (!$stmt = $database->prepare("SELECT status FROM playersstatus WHERE userID = ?")) {
        $data["status"] = "failed to connect";
        echo json_encode($data);
        exit;
    };
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result()->fetch_assoc()["status"];

    $data["player"] = $result;
    $data["status"] = "ok";

    echo json_encode($data);
} else {
    echo json_encode("failed request");
}
