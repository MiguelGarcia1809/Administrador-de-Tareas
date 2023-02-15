<?php

    include_once 'database.php';

    $id = $_POST["id"];
    $nombre = $_POST["nombre"];
    $descripcion = $_POST["descripcion"];

    $query = "UPDATE tareas SET nombre = '$nombre', descripcion = '$descripcion' WHERE id = '$id'";

    $result = mysqli_query($conection,$query);

    if(isset($_POST["id"])){
        die("El query fallo" . mysqli_error($conection));
    }

    echo "Editado";

?>