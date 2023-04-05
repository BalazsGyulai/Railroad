<?php
require("./header.php");

if ($input !== NULL && $input["code"] !== "" && $input["id"] !== "" && $input["status"] !== "") {

    $code = $input["code"];
    $id = $input["id"];
    $status =  $input["status"];

    $data = [];

    if ($status === "allready") {
        $stmt = $database->stmt_init();
        if (!$stmt = $database->prepare("SELECT id FROM users LEFT JOIN groups ON users.codeID = groups.groupid WHERE groups.code = ?")) {
            $data["status"] = "failed to connect";
            echo json_encode($data);
            exit;
        };
        $stmt->bind_param("s", $code);
        $stmt->execute();
        $result = $stmt->get_result();

        $status = "ready";

        foreach ($result as $player) {
            $stmt2 = $database->stmt_init();
            if (!$stmt2 = $database->prepare("UPDATE playersstatus SET status = ? WHERE userID = ?")) {
                $data["status"] = "failed to connect";
                echo json_encode($data);
                exit;
            };
            $stmt2->bind_param("si", $status, $player["id"]);
            $stmt2->execute();
            $stmt2->close();
        }

        $stmt->close();
    } else if ($status === "allunready") {
        $stmt = $database->stmt_init();
        if (!$stmt = $database->prepare("SELECT id FROM users LEFT JOIN groups ON users.codeID = groups.groupid WHERE groups.code = ?")) {
            $data["status"] = "failed to connect";
            echo json_encode($data);
            exit;
        };
        $stmt->bind_param("s", $code);
        $stmt->execute();
        $result = $stmt->get_result();

        $status = "unready";

        foreach ($result as $player) {
            $stmt2 = $database->stmt_init();
            if (!$stmt2 = $database->prepare("UPDATE playersstatus SET status = ? WHERE userID = ?")) {
                $data["status"] = "failed to connect";
                echo json_encode($data);
                exit;
            };
            $stmt2->bind_param("si", $status, $player["id"]);
            $stmt2->execute();
            $stmt2->close();
        }

        $stmt->close();
    } else {

        $stmt = $database->stmt_init();
        if (!$stmt = $database->prepare("UPDATE playersstatus SET status = ? WHERE userID = ?")) {
            $data["status"] = "failed to connect";
            echo json_encode($data);
            exit;
        };
        $stmt->bind_param("si", $status, $id);
        $stmt->execute();
        $stmt->close();
    }
    $data["status"] = "ok";

    echo json_encode($data);
} else {
    echo json_encode("failed request");
}
