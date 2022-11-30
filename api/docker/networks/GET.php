<?php

if (empty($api_path[5])) {
    $call = [
        'client' => 'local',
        'tgt' => $minion,
        'fun' => 'docker.networks'
    ];
} else {
    $call = [
        'client' => 'local',
        'tgt' => $minion,
        'fun' => 'docker.networks',
        'kwarg' => [
            'name' => $api_path[5]
        ]
    ];
}
$data = json_decode(saltCall($call), true)['return'][0];
if ($data[$minion] == "'docker.networks' is not available.") {
    apiDie(['error', $data], 501);
}
apiDie($data[$minion], 200);

