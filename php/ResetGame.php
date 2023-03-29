<?php
require("./header.php");

if ($input !== NULL && $input["round"] !== "" && $input["code"] !== "" && $input["page"] !== "") {
    require_once("./connect/connect.php");

    $round = intval($input["round"]);
    $code = $input["code"];
    $page = $input["page"];
    $rolled = NULL;

    $stmt = $database->stmt_init();
    if (!$stmt = $database->prepare("UPDATE groups SET round = ?, rolled = ?, actpage = ? WHERE code = ?")) {
        $data["status"] = "failed to connect";
        echo json_encode($data);
        exit;
    };
    $stmt->bind_param("isss", $round, $rolled, $page, $code);
    $stmt->execute();
    $stmt->close();

    $stmt = $database->stmt_init();
    if (!$stmt = $database->prepare("SELECT id FROM users, groups WHERE users.codeID = groups.groupid AND groups.code = ?")) {
        $data["status"] = "failed to connect";
        echo json_encode($data);
        exit;
    };
    $stmt->bind_param("s", $code);
    $stmt->execute();
    $result = $stmt->get_result();

    foreach ($result as $id){
        $stmt2 = $database->stmt_init();
        if (!$stmt2 = $database->prepare("UPDATE boards SET userBoard = ? WHERE userID = ?")) {
            $data["status"] = "failed to connect";
            echo json_encode($data);
            exit;
        };
        $stmt2->bind_param("si", $rolled, $id["id"]);
        $stmt2->execute();
        $stmt2->close();
    }
    $stmt->close();

    $data["status"] = "ok";

    echo json_encode($data);
} else {
    echo json_encode("failed request");
}
