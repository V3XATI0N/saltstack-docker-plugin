<?php

$call = [
    'client' => 'local',
    'tgt' => $minion,
    'fun' => 'docker.volumes'
];
$data = json_decode(saltCall($call), true)['return'][0];
if ($data[$minion] == "'docker.volumes' is not available.") {
    apiDie(['error', $data], 501);
}
if (!empty($api_path[5])) {
    foreach ($data[$minion]['Volumes'] as $imgData) {
        if ($imgData[Name] == urldecode($api_path[5])) {
            apiDie($imgData, 200);
        }
    }
    apiDie('no such volume found', 404);
} else {
    apiDie($data[$minion]['Volumes'], 200);
}

