<?php

include "config.php";
error_reporting(0); 

function connect()
{
    
// Create connection
$conn = new mysqli(SERVER, USER, PASS, DB);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

return $conn;

}

function getData($field)
{

$jsonFileContents = file_get_contents("../data-1.json");
$array = json_decode($jsonFileContents, true);

if($field=="All")
{
   return $array;
}
else
{

foreach ($array as $value) {
    foreach ($value as $key => $value2) {
        if($key==$field)
        {
            $result[]=$value2;
        }
        
    }
}

$result=array_unique($result);
$result = array_values($result);
sort($result);

return $result;
}


}

function modify($str) {
    return str_replace("_", " ", $str);
}

function search($search)
  {

    $jsonFileContents = file_get_contents("../data-1.json");

    $array = json_decode($jsonFileContents, true);

    // Create the result array
    $result = array();

    // Iterate over each array element
    foreach ($array as $key => $value)
    {

      // Iterate over each search condition
      foreach ($search as $k => $v)
      {

        // If the array element does not meet the search condition then continue to the next element
        if (!isset($value[$k]) || $value[$k] != $v)
        {
          continue 2;
        }

      }

      // Add the array element's key to the result array
      $result[] = $value;

    }

    // Return the result array
    return $result;

  }

  function save($property)
  {
    
    $conn=connect(); 

    $id=$property["Id"];
    $city=$property["Ciudad"];
    $type=$property["Tipo"];
    $address=$property["Direccion"];
    $phone=$property["Telefono"];
    $postal_code=$property["Codigo_Postal"];
    $price=str_replace(",", "",substr($property["Precio"], 1));

    $sql = "INSERT INTO properties (id, city, type, address, phone, postal_code, price)  VALUES ($id, '$city', '$type', '$address', '$phone', '$postal_code', $price)";

    if ($conn->query($sql) === TRUE) {
        $result = true;
    } else {
        $result = false;
    }

    $conn->close();

    return $result;
       
  }

  function select()
  {
    $conn=connect(); 
    $sql = "SELECT * FROM properties order by date DESC";
    $result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
     
    $data[] = array("Id"=>$row["id"],"Ciudad"=>$row["city"],"Tipo"=>$row["type"],"Telefono"=>$row["phone"],"Direccion"=>$row["address"],"Codigo_Postal"=>$row["postal_code"],"Precio"=>$row["price"]);

}
} else {
  $data = array();
}
$conn->close();

return $data;

  }