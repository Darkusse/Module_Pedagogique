<?php

	
$connect = mysqli_connect("127.0.0.1", "root", "", "dbd"); 
 
/* Vérification de la connexion */ 
if (!$connect) { 
   echo "Échec de la connexion : ".mysqli_connect_error(); 
   exit(); 
} 


if(isset($_POST['txt'])){
	$txt = $_POST['txt'];
	$requete = "INSERT INTO formule (txt) VALUES(?)" ;
	$txt = preg_replace('/\s+/', ' ', $txt);
	$txt = preg_replace('/\'+/', ' ', $txt);
	
	
	$resultat = $connect->prepare($requete);
	
	$resultat->bind_param("s", $txt);
	$resultat->execute();
	
	//$resultat = mysqli_query($connect,$requete); 
	//$identifiant = mysqli_insert_id($connect); 
	/* Fermeture de la connexion */ 
	//mysqli_close($connect); 
	 
	if ($resultat) { 
	   echo "Sauvgarde réussi."; 
	} 
	else { 
	   echo "no sauvgarde."; 
	} 
}



	



?>