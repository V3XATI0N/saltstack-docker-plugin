<?php

$call = [
    'client' => 'local',
    'tgt' => $minion,
    'fun' => 'docker.images',
    'kwarg' => [
        'verbose' => true,
        'all' => true
    ]
];
$data = json_decode(saltCall($call), true)['return'][0];
if ($data[$minion] == "'docker.images' is not available.") {
    apiDie(['error', $data], 501);
}
if (!empty($api_path[5])) {
    foreach ($data[$minion] as $imgId => $imgData) {
        if ($imgId == urldecode($api_path[5])) {
            apiDie($imgData, 200);
        }
    }
    apiDie('no such image found', 404);
} else {
    apiDie($data[$minion], 200);
}

