miApp.directive('axProductos',function(){
  	return {
  		replace:true,
  		restrict:"E",
		scope: { ListadoParam: '=listado' }, 
  		templateUrl:"templates/Directivas/ProductosDir.html"
  	};

   })
  .directive('axUsuarios',function(){
  	return {
  		replace:true,
  		restrict:"E",
  		scope: { ListadoParam: '=listado' },  		
  		templateUrl:"templates/Directivas/UsuariosDir.html"
  	};
  	})
  ;