<?php
header('Access-Control-Allow-Origin: *');
$input = json_decode(file_get_contents('php://input'), true);

require_once("../connect/connect.php");

function dd($value)
{
    echo "<pre>";
    var_dump($value);
    echo "</pre>";

    die();
}
