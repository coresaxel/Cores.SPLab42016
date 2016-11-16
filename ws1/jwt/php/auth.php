<?php
include_once __DIR__ . '\..\vendor\autoload.php';
require_once __DIR__ . '\User.php';

use \Firebase\JWT\JWT;
$DatosPorPost = file_get_contents("php://input");
$usuario = json_decode($DatosPorPost);
$objUser = Autenticador::Login($usuario);

if(Count($objUser) != 0)
{
	$token["usuario"]=$objUser;
	$token["iat"]=time();//momento de creacion
	$token["exp"]=time() + 300;
	$jwt = JWT::encode($token, "estaeslaclave");
}
else
{
	$jwt = usuario;
}
$ArrayConToken["TokenNameSP"]=$jwt;
echo json_encode($ArrayConToken);
?>