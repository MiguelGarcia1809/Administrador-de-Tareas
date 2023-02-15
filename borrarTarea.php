<?php

    include_once 'database.php';

    if(isset($_POST["id"])){

        $id = $_POST["id"];
        $query = "DELETE FROM tareas WHERE id = $id";
        $result = mysqli_query($conection,$query);

        if(!$result){
            die("El query fallo " . mysqli_error($conection));
        }

        echo "Se borro la tarea con exito";

    }

   

?>