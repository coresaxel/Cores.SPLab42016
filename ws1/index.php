<?php
require_once('Clases/AccesoDatos.php');
require_once('Clases/User.php');
require_once('Clases/Producto.php');
require 'vendor/autoload.php';


$configuration = ['settings' => ['displayErrorDetails' => true,],];
$c = new \Slim\Container($configuration);
$app = new \Slim\App($c);

//***********************************USER********************************//
/*  GET: Para consultar y leer recursos */
$app->get('/', function ($request, $response, $args) {
    $response->write("Welcome to Slim!");
    return $response;
});

$app->get('/User', function ($request, $response, $args) {
    return $response->write(json_encode(User::TraerTodasLasPersonas()));
});

$app->get('/User/{objeto}', function ($request, $response, $args) {
    return $response->write(json_encode(User::TraerUnaPersona($args['objeto'])));
});

/* POST: Para crear recursos */
$app->post('/User/{objeto}', function ($request, $response, $args) {
    return $response->write(User::InsertarPersona(json_decode($args['objeto']))); 
});

// /* PUT: Para editar recursos */
$app->put('/User/{objeto}', function ($request, $response, $args) {
    return $response->write(User::ModificarPersona(json_decode($args['objeto'])));

});

// /* DELETE: Para eliminar recursos */
$app->delete('/User/{id}', function ($request, $response, $args) {
    return $response->write(User::BorrarPersona($args['id']));
});
//***********************************USER********************************//


//***********************************ProductoS********************************//
$app->get('/Producto', function ($request, $response, $args) {
    return $response->write(json_encode(Producto::TraerTodasLasProductos()));
});

$app->get('/Producto/{objeto}', function ($request, $response, $args) {
    return $response->write(json_encode(Producto::TraerUnaProducto(json_decode($args['objeto']))));
});

/* POST: Para crear recursos */
$app->post('/Producto/{objeto}', function ($request, $response, $args) {
    return $response->write(Producto::InsertarProducto(json_decode($args['objeto']))); 
});

// /* DELETE: Para eliminar recursos */
$app->delete('/Producto/{id}', function ($request, $response, $args) {
    return $response->write(Producto::BorrarProducto($args['id']));
});
//***********************************ProductoS********************************//

/* Step 4: Run the Slim application*/
$app->run();
