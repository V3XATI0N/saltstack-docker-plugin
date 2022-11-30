<?php

if (empty($api_path[5])) {
    $call = [
        'client' => 'local',
        'tgt' => $minion,
        'fun' => 'docker.list_containers',
        'kwarg' => [
            'all' => true
        ]
    ];
} else {
    $container = $api_path[5];
    $call = [
        'client' => 'local',
        'tgt' => $minion,
        'fun' => 'docker.inspect',
        'kwarg' => [
            'name' => $container
        ]
    ];
}
$data = json_decode(saltCall($call), true)['return'][0];
if ($data[$minion] == "'docker.list_containers' is not available.") {
    apiDie(['error', $data], 501);
}
apiDie($data[$minion], 200);