<?php
require("./header.php");

if ($input !== NULL && $input["code"] !== "" && $input["actual"] !== "") {

    $code = $input["code"];
    $actual = intval($input["actual"]);

    $stmt = $database->stmt_init();
    if (!$stmt = $database->prepare("SELECT users.username, boards.userBoard FROM users INNER JOIN groups ON users.codeID = groups.groupid INNER JOIN boards ON users.id = boards.userID WHERE groups.code = ?")) {
        $data["status"] = "failed to connect";
        echo json_encode($data);
        exit;
    };
    $stmt->bind_param("s", $code);
    $stmt->execute();
    $result = $stmt->get_result();

    $board = [];

    foreach($result as $user) {
        $user["userBoard"] = json_decode($user["userBoard"]);
        array_push($board, $user);
    }

    $actual = $actual % count($board);

    if ($actual < 0){
        $actual *= -1;
    }

    // if ($actual < 0){
    //     $actual = count($board) - 1;
    // } else if ($actual > count($board)){
    //     $actual = 0;
    // }

    $data["users"] = $board[$actual % count($board)];
    // $data["users"] = $actual;
    // $data["users"] = -1 % 7;
    
    $data["status"] = "ok";

    echo json_encode($data);
} else {
    echo json_encode("failed request");
}
