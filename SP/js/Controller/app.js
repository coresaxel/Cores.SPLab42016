var miApp = angular.module("AngularABM", ["ui.router", "angularFileUpload", 'satellizer', 'ui.grid', 'ui.grid.pagination', 'ui.grid.resizeColumns', 'ui.grid.selection', 'ui.grid.exporter', 'ui.grid.edit']);
var Url = 'http://localhost:8080/Laboratorio-IV-2016/Examen/Cores.SPLab42016/ws1/';


miApp.config(function ($stateProvider, $urlRouterProvider, $authProvider) {
	$authProvider.loginUrl =  Url + 'jwt/php/auth.php';
	$authProvider.tokenName = 'TokenNameSP';
	$authProvider.tokenPrefix = 'AngularABM';
	$authProvider.authHeader = 'data';

	$stateProvider
		.state(
		"SP", {
			url: "/SP",
			abstract: true,
			templateUrl: "./Templates/Abstractas/pep.html",
			cache: false
		})
		.state(
		"SP.Principal", {
			cache: false,
			url: "/",
			views:
			{
				"contenido":
				{
					templateUrl: "./Templates/User/UserBarra.html",
					controller: "controllerLogin"
				},
				"contenidoBody":
				{
					templateUrl: "./Templates/User/presentacion.html"
				}
			}
		})
		.state(
		"Abm", {
			url: "/Abm",
			abstract: true,
			templateUrl: "./Templates/Abstractas/pep.html",
			cache: false
		})
		.state(
		"Abm.User", {
			cache: false,
			url: "/User",
			params: {
				param1: null
			},
			views:
			{
				"contenido":
				{
					templateUrl: "./Templates/User/UserBarra.html",
					controller: "controllerLogin"
				},
				"contenidoBody":
				{
					templateUrl: "./Templates/User/AltaUser.html",
					controller: "controllerUser"
				}
			}
		})
		.state(
		"Abm.UserGrilla", {
			cache: false,
			url: "/Usuarios",
			views:
			{
				"contenido":
				{
					templateUrl: "./Templates/User/UserBarra.html",
					controller: "controllerLogin"
				},
				"contenidoBody":
				{
					templateUrl: "./Templates/Grilla/Usuarios.html",
					controller: "controllerUserGrilla"
				}
			}
		})
		.state(
		"Abm.Producto", {
			cache: false,
			url: "/Producto",
			views:
			{
				"contenido":
				{
					templateUrl: "./Templates/User/UserBarra.html",
					controller: "controllerLogin"
				},
				"contenidoBody":
				{
					templateUrl: "./Templates/Producto/AltaProducto.html",
					controller: "controllerProducto"
				}
			}
		})
		.state(
		"Abm.ProductoGrilla", {
			cache: false,
			url: "/Productos",
			views:
			{
				"contenido":
				{
					templateUrl: "./Templates/User/UserBarra.html",
					controller: "controllerLogin"
				},
				"contenidoBody":
				{
					templateUrl: "./Templates/Grilla/Productos.html",
					controller: "controllerProductos"
				}
			}
		});


	$urlRouterProvider.otherwise("SP/");

});

