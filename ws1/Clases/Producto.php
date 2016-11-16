<?php
require_once"accesoDatos.php";
class Producto
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id_Producto;
	public $descripcion_Producto;
 	public $precio_Producto;
  	public $foto_Producto;
//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnProducto($idParametro) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select id_Producto,descripcion_Producto, precio_Producto FROM Producto where id_Producto =:id");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$personaBuscada= $consulta->fetchObject('Producto');
		return $personaBuscada;				
	}
	
	public static function TraerTodasLasProductos()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
	    $consulta =$objetoAccesoDato->RetornarConsulta("select id_Producto, descripcion_Producto,precio_Producto,foto_Producto FROM Producto");
		$consulta->execute();			
		$arrPersonas= $consulta->fetchAll(PDO::FETCH_CLASS, "Producto");	
		return $arrPersonas;
	}
	
    public static function InsertarProducto($Producto)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("insert into Producto ( descripcion_Producto, precio_Producto) 
		VALUES (:descripcion_Producto,:precio_Producto)");
		$consulta->bindValue(':descripcion_Producto',$Producto->descripcion_Producto, PDO::PARAM_STR);
		$consulta->bindValue(':precio_Producto',$Producto->precio_Producto, PDO::PARAM_INT);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();		
	}	

	public static function BorrarProducto($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta = $objetoAccesoDato->RetornarConsulta("delete from Producto WHERE id_Producto =:id");	
		$consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
}
