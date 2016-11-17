miApp.controller("controllerLogin", function ($scope, $state, $auth, fsUser) {
    if ($auth.isAuthenticated()) {
        $scope.UserName = ($auth.getPayload()).usuario[0].nombre_usuario;
        $scope.Rol = fsUser.ObtenerRol();
    }

    $scope.Test = function (rol) {
        switch (rol) {
            case 'Admin':
                $scope.FormIngreso.mail = "a@a";
                $scope.FormIngreso.nombre = "AXELCORES";
                $scope.FormIngreso.pass = "A1";

                break;
            case 'Comprador':
                $scope.FormIngreso.mail = "ax@ax";
                $scope.FormIngreso.nombre = "AxelComprador";
                $scope.FormIngreso.pass = "1234";
                break;
            case 'Vendedor':
                $scope.FormIngreso.mail = "ax@ax";
                $scope.FormIngreso.nombre = "AxelVendedor";
                $scope.FormIngreso.pass = "1234";
                break;

        }

    }

    $scope.Login = function () {
        user = {};
        user.name = $scope.FormIngreso.nombre;
        user.pass = $scope.FormIngreso.pass;
        user.mail = $scope.FormIngreso.mail;

        fsUser.TraerLogin(user)
            .then(function (response) {
                if ($auth.isAuthenticated()) {
                    $scope.FormIngreso.UserName = $scope.FormIngreso.nombre;
                    $state.reload();
                    $scope.Rol = ($auth.getPayload()).usuario[0].descripcion_rol;
                }
            })
            .catch(function (response) {
                console.info("error", response);
            });
    }



    $scope.Logout = function () {
        $scope.UserName = "";
        $state.go('SP.Principal');
        $auth.logout();
    }


});

miApp.controller("controllerUser", function ($scope, $state, $stateParams, FileUploader, fsUser) {

    if (!fsUser.VerificarLogin())
        $state.go('SP.Principal');

    $scope.Rol = fsUser.ObtenerRol();
    console.info($stateParams.param1)

    $scope.SubirdorArchivos = new FileUploader({ url: Url + 'archivos' });
    if ($stateParams.param1 == null) {
        $scope.Accion = "Nuevo Usuario"
        //inicio las variables
        $scope.persona = {};
        $scope.persona.nombre = "Axel";
        $scope.persona.mail = "ax@ax";
        $scope.persona.pass_usuario = "1234";
        $scope.persona.id_rol = 1;
        $scope.persona.descripcion_rol = "1";
    } else {
        $scope.Accion = "Modificar Usuario"
        //inicio las variables
        $scope.persona = {};
        $scope.persona.nombre = $stateParams.param1.nombre_usuario;
        $scope.persona.mail = $stateParams.param1.mail_usuario;
        $scope.persona.pass_usuario = $stateParams.param1.pass_usuario;
        $scope.persona.id_usuario = $stateParams.param1.id_usuario;
        $scope.persona.id_rol = $stateParams.param1.id_rol;
        $scope.persona.descripcion_rol = $stateParams.param1.descripcion_rol;
    }

    fsUser.TraerTodos('Rol')
        .then(function (respuesta) {
            $scope.itemsSelectRol = {};
            $scope.itemsSelectRol = respuesta;
        }, function (error) {
            console.info(error);
        });

    $scope.Guardar = function () {
        $scope.persona.id_rol = $scope.objeSeleccionado.id_rol;
        if ($stateParams.param1 == null) {
            fsUser.InsertarObj('User', $scope.persona)
                .then(function (respuesta) {
                    $state.go("Abm.UserGrilla");

                }, function (error) {
                    console.info(error);
                });
        } else {


            fsUser.ModificarObj('User', $scope.persona)
                .then(function (respuesta) {
                    $state.go("Abm.UserGrilla");

                }, function (error) {
                    console.info(error);
                });

        }
    }
});

miApp.controller("controllerUserGrilla", function ($scope, $state, $http, fsUser) {
    if (!fsUser.VerificarLogin())
        $state.go('SP.Principal');

    $scope.titulo = "Usuarios";
    $scope.gridOptions = {};
    $scope.gridOptions.paginationPageSizes = [25, 50, 75];
    $scope.gridOptions.paginationPageSize = 25;
    $scope.gridOptions.columnDefs = columnDefs();
    $scope.gridOptions.enableFiltering = false;

    fsUser.TraerTodos('User')
        .then(function (respuesta) {
            $scope.gridOptions.data = respuesta;
            $scope.ListadoPersonas = respuesta;
        }, function (error) {
            console.info(error);
        });

    function columnDefs() {
        return [
            { field: 'nombre_usuario', name: 'Usuario' },
            { field: 'nombre_persona', name: 'Nombre' },
            { field: 'apellido_persona', name: 'Apellido' },
            { field: 'direccion_persona', name: 'Dirección' },
            { field: 'descripcion_rol', name: 'Rol' },
            { field: 'dni_persona', name: 'Dni' },
            { field: 'nombre_local', name: 'Trabajo' },
            { field: 'id_usuario', name: 'Borrar', cellTemplate: "<button class=\"btn btn-danger\" ng-click=\"grid.appScope.Borrar(row.entity.id_usuario)\"><span class=\"glyphicon glyphicon-remove-circle\"></span>Borrar</button>" },
            { field: 'id_usuario', name: 'Editar', cellTemplate: "<button class=\"btn btn-warning\" ng-click=\"grid.appScope.Modificar(row.entity.id_usuario)\"><span class=\"glyphicon glyphicon-edit\"></span>Modificar</button>" }
        ];
    }

    $scope.Borrar = function (id) {
        fsUser.EliminarObj('User', id)
            .then(function (respuesta) {
                fsUser.TraerTodos('User')
                    .then(function (respuesta) {
                        $scope.gridOptions.data = respuesta;
                        $scope.ListadoPersonas = respuesta; 
                        $state.reload();

                    }, function (error) {
                        console.info(error);
                    });

            }, function (error) {
                console.info(error);
            });

    }


    $scope.Modificar = function (id) {
        console.info(id)
        fsUser.TraerUnObj('User', id)
            .then(function (respuesta) {
                $state.go("Abm.User", { 'param1': respuesta });

            }, function (error) {
                console.info(error);
            });
    };

});



