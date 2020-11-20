
<?php

include "functions.php";

$q=$_GET["q"];


if($q=="cities")
{
    $result=getData("Ciudad");
    
}

if($q=="types")
{
    $result=getData("Tipo");
}

if($q=="all")
{
    $result=getData("All");
}

echo json_encode($result);