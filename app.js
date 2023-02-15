
$(document).ready(function () {
    
    let edit = false;

    $('#task-result').hide();
    fetchTareas();

    //Realizar busqueda
    $('#search').keyup(function () { 
        if($('#search').val()){
            let search = $('#search').val();
        
            $.ajax({
                url: "buscarTarea.php",
                type: "POST",
                data: { search },
                success: function (response) {
                    let tareas = JSON.parse(response);
                    let template = "";
                    tareas.forEach(tarea => {
                        template += `<li>
                                        ${tarea.nombre}
                                    </li>`
                    });

                    $('#container').html(template);
                    $('#task-result').show();
                }
            });
        }
    });


    //Llenar Datos
    $('#form-task').submit(function (e) { 
        e.preventDefault();
        const postData = {
            nombre : $('#nombre').val(),
            descripcion : $('#descripcion').val(),
            id : $("#id").val()
        };

        let url = edit === false ? 'agregarTarea.php' : 'editarTarea.php';



        $.post(url, postData,
            function (response) {
                $('#form-task').trigger('reset');
                fetchTareas();
                edit = false;
                $("#change-btn").text('Guardar Tarea');
                $("#change-btn").removeClass('btn-success');
                $("#change-btn").addClass('btn-primary');
            },
        );
        

    });


    //Funcion para Mostrar Datos
    function fetchTareas(){
        $.ajax({
            type: "GET",
            url: "mostrarTarea.php",
            success: function (response) {
                let tareas = JSON.parse(response);
                let template = "";
                tareas.forEach(tarea => {
                    template += `
                        <tr task-id=${tarea.id}>
                            <td>${tarea.id}</td>
                            <td>${tarea.nombre}</td>
                            <td>${tarea.descripcion}</td>
                            <td>
                                <button class="btn btn-primary task-edit">
                                    Editar
                                </button>
                            </td>
                            <td>
                                <button class="btn btn-danger task-delete">
                                    Borrar
                                </button>
                            </td>
                            
                        </tr>
                    `;
                });
    
                $('#tasks').html(template);
            }
        });
    }


    //Editar Registros
    $(document).on('click', '.task-edit' ,function (e) {
        $("#change-btn").text('Actualizar Tarea');
        $("#change-btn").removeClass('btn-primary');
        $("#change-btn").addClass('btn-success');
        
        let elemento = $(this)[0].parentElement.parentElement;
        let id = $(elemento).attr("task-id");
        $.post("seleccionarTarea.php", {id},
            function (response) {
                let tarea = JSON.parse(response);
                $("#nombre").val(tarea.nombre);
                $("#descripcion").val(tarea.descripcion);
                $("#id").val(tarea.id);
                edit = true;
            },
        );
        e.preventDefault();
    });

    //Borrar Registros
    $(document).on('click', '.task-delete', function () {
        let elemento = $(this)[0].parentElement.parentElement;
        let id = $(elemento).attr("task-id");
        $.post("borrarTarea.php", {id},
            function (response) {
                fetchTareas();
            },
        );
    });

});