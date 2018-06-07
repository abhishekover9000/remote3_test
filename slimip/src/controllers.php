<?php

use PsrHttpMessageServerRequestInterface as Request;
use PsrHttpMessageResponseInterface as Response;


class IPController{
   protected $container;

   // constructor receives container instance
   public function __construct($container) {
       $this->container = $container;
   }

   public static function ipfy($request, $response, $args) {
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

      curl_setopt_array($ch, $options);
      $content  = curl_exec($ch);
      curl_close($ch);

      $serialized_content =  json_encode(json_decode($content, true));
      echo $serialized_content;
   }
}
