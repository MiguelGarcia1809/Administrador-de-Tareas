<?php

    include_once 'database.php';

    $search =  $_POST['search'];

    if(!empty($search)){

        $query = " SELECT * FROM tareas WHERE nombre LIKE '$search%' ";
        $result = mysqli_query($conection,$query);

        if(!$result){
            die('Error en la consulta' . mysqli_error($conection));
        }

        $json = array();
        while($row = mysqli_fetch_array($result)){
            $json[] = array(
                'id' => $row['id'],
                'nombre' => $row['nombre'],
                'descripcion' => $row['descripcion']
            );
        }

        $jsonString = json_encode($json);
        echo $jsonString;

    }


?>