miApp.controller("controllerProducto", function ($scope, $state, $stateParams, FileUploader, fsUser) {
    if (!fsUser.VerificarLogin())
        $state.go('SP.Principal');

    $scope.SubirdorArchivos = new FileUploader({ url: Url + 'archivos' });
    if ($stateParams.param1 == null) {
        $scope.Accion = "Nuevo Producto"
        //inicio las variables
        $scope.Producto = {};
        $scope.Producto.descripcion_Producto = "Producto X";
        $scope.Producto.precio_Producto = 2;
    } else {
        $scope.Accion = "Modificar Producto"
        //inicio las variables
        $scope.Producto = {};
        $scope.Producto.descripcion_Producto = $stateParams.param1.descripcion_Producto;
        $scope.Producto.precio_Producto = $stateParams.param1.precio_Producto;
        $scope.Producto.id_Producto = $stateParams.param1.id_Producto;
    }
    
    $scope.Guardar = function () {
        
            fsUser.InsertarObj('Producto', $scope.Producto)
                .then(function (respuesta) {
                    $state.go("Abm.ProductoGrilla");

                }, function (error) {
                    console.info(error);
                });
        
    }
});

miApp.controller("controllerProductos", function ($scope, $state, $http, fsUser) {
    if (!fsUser.VerificarLogin())
        $state.go('SP.Principal');

    $scope.titulo = "Productos";
    $scope.gridOptions = {};
    $scope.gridOptions.paginationPageSizes = [25, 50, 75];
    $scope.gridOptions.paginationPageSize = 25;
    $scope.gridOptions.columnDefs = columnDefs();
    $scope.gridOptions.enableFiltering = false;

    fsUser.TraerTodos('Producto')
        .then(function (respuesta) {
            $scope.gridOptions.data = respuesta;
            $scope.ListadoProductos = respuesta;

        }, function (error) {
            console.info(error);
        });


    function columnDefs() {
        return [
            { field: 'descripcion_Producto', name: 'Nombre' },
            { field: 'precio_Producto', name: 'Precio' },
            { field: 'id_Producto', name: 'Borrar', cellTemplate: "<button class=\"btn btn-danger\" ng-click=\"grid.appScope.Borrar(row.entity.id_Producto)\"><span class=\"glyphicon glyphicon-remove-circle\"></span>Borrar</button>" }
        ];
    }

    $scope.Borrar = function (id) {
        fsUser.EliminarObj('Producto', id)
            .then(function (respuesta) {
                fsUser.TraerTodos('Producto')
                    .then(function (respuesta) {
                        $scope.gridOptions.data = respuesta;
                        $scope.ListadoProductos = respuesta;

                    }, function (error) {
                        console.info(error);
                    });

            }, function (error) {
                console.info(error);
            });

    }


    $scope.Modificar = function (id) {
        fsUser.TraerUnObj('Producto', id)
            .then(function (respuesta) {

                $state.go("Abm.Producto", { 'param1': respuesta });

            }, function (error) {
                console.info(error);
            });
    };

});
