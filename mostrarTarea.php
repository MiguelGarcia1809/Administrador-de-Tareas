<?php

    include_once 'database.php';

    $query = "SELECT * FROM tareas";

    $result = mysqli_query($conection,$query);

    if(!$result){
        die('La consulta fallo ' . mysqli_error($conection));
    }

    $json = array();
    while($row = mysqli_fetch_array($result)){
        $json[] = array(
            'id' => $row['id'],
            'nombre' => $row['nombre'],
            'descripcion' => $row['descripcion'],
        );
    }

    $jsonString = json_encode($json);

    echo $jsonString;

?>