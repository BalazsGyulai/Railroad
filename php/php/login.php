<?php
require("./header.php");


if ($input !== NULL && $input["email"] !== "" && $input["userName"] !== "") {

    $userName = $input["userName"];
    $email = $input["email"];

    $data = [];

    // is there a player
    $stmt = $database->stmt_init();
    if (!$stmt = $database->prepare("SELECT users.*, groups.code, groups.round, groups.rolled FROM users INNER JOIN groups ON users.codeID = groups.groupid WHERE users.email = ? AND users.username = ?")) {
        $data["status"] = "failed to connect";
        echo json_encode($data);
        exit;
    };
    $stmt->bind_param("ss", $email, $userName);
    $stmt->execute();
    $result = $stmt->get_result();
    $num = $result->num_rows;

    if ($num == 0) {
        if ($input["group"] === "") {
            $group = uniqid($userName);
            $rank = "admin";

            // create group
            $stmt1 = $database->stmt_init();
            if (!$stmt1 = $database->prepare("INSERT INTO groups(code, round) VALUES(?,?)")) {
                $data["status"] = "failed to connect";
                echo json_encode($data);
                exit;
            };
            $round = 0;
            $stmt1->bind_param("si", $group, $round);
            $stmt1->execute();

            // select group id
            $stmt2 = $database->stmt_init();
            if (!$stmt2 = $database->prepare("SELECT groupid FROM groups WHERE code = ?")) {
                $data["status"] = "failed to connect";
                echo json_encode($data);
                exit;
            };
            $stmt2->bind_param("s", $group);
            $stmt2->execute();
            $id = $stmt2->get_result()->fetch_assoc()["groupid"];


            $stmt3 = $database->stmt_init();
            if (!$stmt3 = $database->prepare("INSERT INTO users(username, email, codeID, rank) VALUES(?,?,?,?)")) {
                $data["status"] = "failed to connect";
                echo json_encode($data);
                exit;
            };

            $stmt3->bind_param("ssis", $userName, $email, $id, $rank);
            $stmt3->execute();
            $insertedID = $stmt3->insert_id;

            $stmt5 = $database->stmt_init();
            if (!$stmt5 = $database->prepare("INSERT INTO playersstatus(userID) VALUES(?)")) {
                $data["status"] = "failed to connect";
                echo json_encode($data);
                exit;
            };
            $stmt5->bind_param("i", $insertedID);
            $stmt5->execute();

            $stmt6 = $database->stmt_init();
            if (!$stmt6 = $database->prepare("INSERT INTO boards(userID) VALUES (?)")) {
                $data["status"] = "failed to connect";
                echo json_encode($data);
                exit;
            };

            $stmt6->bind_param("i", $insertedID);
            $stmt6->execute();

            $stmt7 = $database->stmt_init();
            if (!$stmt7 = $database->prepare("SELECT users.*, groups.code, groups.round, groups.rolled FROM users INNER JOIN groups ON users.codeID = groups.groupid WHERE users.email = ? AND users.username = ?")) {
                $data["status"] = "failed to connect";
                echo json_encode($data);
                exit;
            };
            $stmt7->bind_param("ss", $email, $userName);
            $stmt7->execute();
            $result7 = $stmt7->get_result();

            $data["userInfos"] = $result7->fetch_assoc();
        } else {
            $group = trim($input["group"]);
            $rank = "player";

            $stmt2 = $database->stmt_init();
            if (!$stmt2 = $database->prepare("SELECT groupid FROM groups WHERE code = ?")) {
                $data["status"] = "failed to connect";
                echo json_encode($data);
                exit;
            };
            $stmt2->bind_param("s", $group);
            $stmt2->execute();
            $id = $stmt2->get_result()->fetch_assoc()["groupid"];

            $stmt3 = $database->stmt_init();
            if (!$stmt3 = $database->prepare("INSERT INTO users(username, email, codeID, rank) VALUES(?,?,?, ?)")) {
                $data["status"] = "failed to connect";
                echo json_encode($data);
                exit;
            };

            $stmt3->bind_param("ssis", $email, $userName, $id, $rank);
            $stmt3->execute();

            $stmt4 = $database->stmt_init();
            if (!$stmt4 = $database->prepare("SELECT users.*, groups.code, groups.round, groups.rolled  FROM users INNER JOIN groups ON users.codeID = groups.groupid WHERE users.email = ? AND users.username = ?")) {
                $data["status"] = "failed to connect";
                echo json_encode($data);
                exit;
            };
            $stmt4->bind_param("ss", $email, $userName);
            $stmt4->execute();
            $result2 = $stmt4->get_result();

            $data["userInfos"] = $result2->fetch_assoc();

            $stmt5 = $database->stmt_init();
            if (!$stmt5 = $database->prepare("INSERT INTO playersstatus(userID) VALUES(?)")) {
                $data["status"] = "failed to connect";
                echo json_encode($data);
                exit;
            };
            $stmt5->bind_param("i", $data["userInfos"]["id"]);
            $stmt5->execute();

            $stmt6 = $database->stmt_init();
            if (!$stmt6 = $database->prepare("INSERT INTO boards(userID) VALUES (?)")) {
                $data["status"] = "failed to connect";
                echo json_encode($data);
                exit;
            };
            $stmt6->bind_param("i", $data["userInfos"]["id"]);
            $stmt6->execute();
        }
    } else {
        $data["userInfos"] = $result->fetch_assoc();
    }

    $data["status"] = "ok";

    echo json_encode($data);
} else {
    echo json_encode("failed request");
}
