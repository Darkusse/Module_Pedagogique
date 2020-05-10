<?php

$connect = mysqli_connect("127.0.0.1", "root", "", "user"); 
 
/* Vérification de la connexion */ 
if (!$connect) { 
   echo "Échec de la connexion : ".mysqli_connect_error(); 
   exit(); 
} 


?>