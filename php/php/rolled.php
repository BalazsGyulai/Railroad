<?php
require("./header.php");

if ($input !== NULL && $input["code"] !== "" && $input["id"] !== "") {

    $code = $input["code"];
    $id = $input["id"];
    $data = [];

    $stmt = $database->stmt_init();
    if (!$stmt = $database->prepare("SELECT rolled, round FROM groups WHERE code = ?")) {
        $data["status"] = "failed to connect";
        echo json_encode($data);
        exit;
    };
    $stmt->bind_param("s", $code);
    $stmt->execute();
    $result = $stmt->get_result()->fetch_assoc();

    $rolled = json_decode($result["rolled"]);
    $round = $result["round"];

    $stmt->close();

    $stmt = $database->stmt_init();
    if (!$stmt = $database->prepare("SELECT userBoard FROM boards WHERE userID = ?")) {
        $data["status"] = "failed to connect";
        echo json_encode($data);
        exit;
    };
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $board = json_decode($stmt->get_result()->fetch_assoc()["userBoard"]);

    $stmt->close();

    if ($board !== null) {
        for ($y = 0; $y < count($board); $y++) {
            for ($x = 0; $x < count($board[$y]); $x++) {
                if ($board[$y][$x] !== null) {
                    $i = 0;
                    $found = false;

                    while ($i < count($rolled) && !$found) {
                        if ($rolled[$i]->name === $board[$y][$x]->name && $rolled[$i]->round === $board[$y][$x]->round) {
                            $found = true;
                            array_splice($rolled, $i, 1);
                        }

                        $i++;
                    }
                }
            }
        }
    }

    $data["rolled"] = $rolled;

    $data["status"] = "ok";

    echo json_encode($data);
} else {
    echo json_encode("failed request");
}
