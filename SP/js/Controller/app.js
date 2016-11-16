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
			cache: true
		})
		.state(
		"SP.Principal", {
			cache: true,
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
			cache: true
		})
		.state(
		"Abm.User", {
			cache: true,
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
			cache: true,
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
					templateUrl: "./Templates/Grilla/Grilla.html",
					controller: "controllerUserGrilla"
				}
			}
		})
		.state(
		"Abm.Producto", {
			cache: true,
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
			cache: true,
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
					templateUrl: "./Templates/Grilla/Grilla.html",
					controller: "controllerProductos"
				}
			}
		});


	$urlRouterProvider.otherwise("SP/");

});

