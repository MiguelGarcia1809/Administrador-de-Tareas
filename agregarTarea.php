<?php

    include_once 'database.php';

    if(isset($_POST['nombre'])){

        $nombre =  $_POST['nombre'];
        $descripcion = $_POST['descripcion'];

        $query = "INSERT INTO tareas (nombre,descripcion) VALUES ('$nombre','$descripcion')";

        $result = mysqli_query($conection,$query);

        if(!$result){
            die("El query fallo");
        }

    }

?>