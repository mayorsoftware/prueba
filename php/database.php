
<?php

include "functions.php";

$id=$_GET["id"];

$action=$_GET["action"];

if($action=="save")
{
    $property=search(array('Id' => $id))[0]; 
   
    $result = save($property);
}

if($action=="select")
{
   
    $result = select();
}


echo json_encode($result);