<?php

$minion = $api_path[3];

if (!empty($api_path[4])) {
    $dmod = $api_path[4];
    if (file_exists(__DIR__ . '/' . $dmod . '/' . $api_method . '.php')) {
        include(__DIR__ . '/' . $dmod . '/' . $api_method . '.php');
    } else {
        apiDie('oh no', 405);
    }
} else {
    if (file_exists(__DIR__ . '/' . $api_method . '.php')) {
        include(__DIR__ . '/' . $api_method . '.php');
    } else {
        apiDie('oops!', 405);
    }
}