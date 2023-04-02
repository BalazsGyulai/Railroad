<?php
require("./header.php");

if ($input !== NULL && $input["id"] !== "" && $input["board"] !== "") {

    $id = $input["id"];
    $board = json_encode($input["board"]);

    $stmt = $database->stmt_init();
    if (!$stmt = $database->prepare("UPDATE boards SET userBoard = ? WHERE userID = ?")) {
        $data["status"] = "failed to connect";
        echo json_encode($data);
        exit;
    };
    $stmt->bind_param("si", $board, $id);
    $stmt->execute();

    $data["status"] = "ok";

    echo json_encode($data);
} else {
    echo json_encode("failed request");
}
