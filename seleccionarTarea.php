<?php

    include_once 'database.php';

    if (isset($_POST["id"])) {
        $id = $_POST["id"];
        $query = "SELECT * FROM tareas WHERE id = $id";
        $result = mysqli_query($conection,$query);

        if(!$result){
            die("El query fallo " . mysqli_error($conection));
        }

        $json = array();
        while($row = mysqli_fetch_array($result)){
            $json[] = array(
                "id" => $row["id"],
                "nombre" => $row["nombre"],
                "descripcion" => $row["descripcion"]
            );
        }

        $jsonString = json_encode($json[0]);
        echo $jsonString;

    }

    

?>