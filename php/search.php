
<?php

include "functions.php";

$city= modify($_GET["city"]);
$type= modify($_GET["type"]);

if(($city) and ($type))
{
    $result=search(array('Ciudad' => $city, 'Tipo' => $type)); 
}
elseif ($city)
{
    $result=search(array('Ciudad' => $city));
}
elseif ($type)
{
    $result=search(array('Tipo' => $type));
}



echo json_encode($result);