<?php
	// Initialiser la session
	session_start();
	// Vérifiez si l'utilisateur est connecté, sinon redirigez-le vers la page de connexion
	if(!isset($_SESSION["nom"])){
		header("Location: login.php");
		exit(); 
	}
?>
<!DOCTYPE html>
<html>
	<head>
	<script type="text/javascript" src="js.js"></script>
	<link rel="stylesheet" href="assets/css/main.css" />
	<link href="app.css" rel='stylesheet' type='text/css' />

	</head>
	<body>

	
<section id="maincontainer">


		<section id="container">
		<div class="sucess">
		<h1>Bienvenue <?php echo $_SESSION['nom']; ?>!</h1>
		<p>C'est votre tableau de bord.</p>
		
		</div>


		<nav id="nav">
	<ul id="listlink">
<li><div></div><span class="titles"><i class="fa fa-plus-square"></i><a href="website/index.html" class="active" >Accueil</a></span></li>
<li><div></div><span class="titles"><i class="fa fa-tag"></i><a href="rediger.html">Rediger</a></span></li>
<li><div></div><span class="titles"><i class="fa fa-bar-chart-o"></i><a href="partager.html">Partager</a></span></li>
<li><div></div><span class="titles"><i class="fa fa-tags"></i><a href="">Communiquer</a></span></li>
<li><div></div><span class="titles"><i class="fa fa-bullhorn"></i><a href="carto.html">Map</a></span></li>
<li><div></div><span class="titles"><i class="fa fa-bullhorn"></i><a href="logout.php">Deconnecter</a></span></li>
</ul>
		</nav>
</section>

</section>



</body>
</html>
