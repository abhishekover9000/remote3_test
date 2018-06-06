<?php

use Slim\Http\Request;
use Slim\Http\Response;
$cors = new \CorsSlim\CorsSlim();

// Routes

$app->add($cors);

$app->get('/ipinfo/{ip1}/{ip2}/{ip3}/{ip4}', function ($request, $response, $args) {
 $ip1 = (string)$args['ip1'];
 $ip2 = (string)$args['ip2'];
 $ip3 = (string)$args['ip3'];
 $ip4 = (string)$args['ip4'];//+'.'+(string)$args['ip2']+'.'+(string)$args['ip3']+'.'+(string)$args['ip4'];

 $access_key= '1c64696d1c527be6109b4fd4bbf16b42';
 $ch = curl_init();
 $options = array(
    CURLOPT_RETURNTRANSFER => true,   // return web page
    CURLOPT_HEADER         => false,  // don't return headers
    CURLOPT_HTTPHEADER => array( 'Content-Type: application/json'),
    CURLOPT_URL        => "http://api.ipstack.com/$ip1.$ip2.$ip3.$ip4?access_key=$access_key");

 //curl_setopt($ch, CURLOPT_URL, "http://api.ipstack.com/$ip1.$ip2.$ip3.$ip4?access_key=$access_key");
 //curl_setopt($ch, CURLOPT_HTTPHEADER, array( 'Content-Type: application/json'));
 //curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Return, do not echo result
curl_setopt_array($ch, $options);
$content  = curl_exec($ch);
curl_close($ch);

$serialized_content =  json_encode(json_decode($content, true));
echo $serialized_content;

// Serialize
//$response->getBody()->write($serialized_content);

 //echo $raw_data;
//return json_encode($raw_data);
//$response_data->getBody()->write("The data is, $response_data");
 //return $response_data;
});
