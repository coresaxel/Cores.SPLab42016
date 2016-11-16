<?php
require_once __DIR__ . '\AccesoDatos.php';
class Autenticador{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id_usuario;
	public $nombre_usuario;
 	public $mail_usuario;
  	public $pass_usuario;
  	public $id_rol;
	public $descripcion_rol;
	
//--------------------------------------------------------------------------------//
	public static function Login($usuario){
		return Autenticador::Validar($usuario->name, $usuario->mail, $usuario->pass);
	}

	private static function Validar($user_name,$user_mail,$user_pass){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select u.id_usuario,u.nombre_usuario, u.mail_usuario, u.pass_usuario, r.id_rol, r.descripcion_rol from usuario u join rol r on u.id_rol = r.id_rol where u.nombre_usuario = :p_nombre AND u.pass_usuario = :p_pass and mail_usuario =:user_mail");
		$consulta->bindValue(':p_nombre',$user_name, PDO::PARAM_STR);
		$consulta->bindValue(':p_pass',$user_pass, PDO::PARAM_STR);
		$consulta->bindValue(':user_mail',$user_mail, PDO::PARAM_STR);
		$consulta->execute();			
		$arrPersonas= $consulta->fetchAll(PDO::FETCH_CLASS, "Autenticador");	
		return $arrPersonas;
	}
}
?>
