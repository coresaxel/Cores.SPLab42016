<?php
require_once"accesoDatos.php";
class User
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id_usuario;
	public $nombre_usuario;
 	public $mail_usuario;
  	public $pass_usuario;
  	public $id_rol;
	public $descripcion_rol;
//--------------------------------------------------------------------------------//

//--METODO DE CLASE
	public static function TraerUnaPersona($idParametro) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select u.id_usuario,u.nombre_usuario, u.mail_usuario, u.pass_usuario, r.id_rol, r.descripcion_rol from usuario u join rol r on u.id_rol = r.id_rol where id_usuario =:id");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$personaBuscada= $consulta->fetchObject('User');
		return $personaBuscada;				
	}
	
	public static function TraerTodasLasPersonas()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select u.id_usuario,u.nombre_usuario, u.mail_usuario, u.pass_usuario, r.id_rol, r.descripcion_rol from usuario u join rol r on u.id_rol = r.id_rol");
		$consulta->execute();			
		$arrPersonas= $consulta->fetchAll(PDO::FETCH_CLASS, "User");	
		return $arrPersonas;
	}
	
	public static function BorrarPersona($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta = $objetoAccesoDato->RetornarConsulta("delete from usuario WHERE id_usuario =:id");	
		$consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
	public static function ModificarPersona($persona)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("update usuario set nombre_usuario=:nombre_usuario, mail_usuario=:mail_usuario, pass_usuario=:pass_usuario, id_rol=:id_rol WHERE id_usuario=:id");
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta->bindValue(':id',$persona->id_usuario, PDO::PARAM_INT);
		$consulta->bindValue(':nombre_usuario', $persona->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':mail_usuario', $persona->mail, PDO::PARAM_STR);
		$consulta->bindValue(':pass_usuario', $persona->pass_usuario, PDO::PARAM_STR);
		$consulta->bindValue(':id_rol', $persona->id_rol, PDO::PARAM_STR);
		return $consulta->execute();
	}

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

	public static function InsertarPersona($persona)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("insert into usuario (nombre_usuario, mail_usuario, pass_usuario, id_rol) VALUES (:nombre_usuario,:mail_usuario,:pass_usuario,:id_rol)");
		$consulta->bindValue(':nombre_usuario',$persona->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':mail_usuario', $persona->mail, PDO::PARAM_STR);
		$consulta->bindValue(':id_rol', $persona->id_rol, PDO::PARAM_INT);
		$consulta->bindValue(':pass_usuario', $persona->pass_usuario, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();		
	}	
//--------------------------------------------------------------------------------//

}
