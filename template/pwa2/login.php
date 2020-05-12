
<!DOCTYPE html>
<html>
    
<head>
	<title>Meilo</title>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" integrity="sha384-gfdkjb5BdAXd+lj+gudLWI+BXq4IuLW5IT+brZEZsLFm++aCMlF1V92rMkPaX4PP" crossorigin="anonymous">
	<link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
	<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<link href="login.css" rel='stylesheet' type='text/css' />
<!------ Include the above in your HEAD tag ---------->
	
	</head>
<!--Coded with love by Mutiullah Samim-->
<body>
<?php
require('config.php');
session_start();

if (isset($_POST['nom'])){
	$nom = stripslashes($_REQUEST['nom']);
	$nom = mysqli_real_escape_string($conn, $nom);
	$password = stripslashes($_REQUEST['password']);
	
	$password = mysqli_real_escape_string($conn, $password);
	
    $query = "SELECT * FROM `login` WHERE nom='$nom' and password='$password'";
	
	$result = mysqli_query($conn,$query) or die(mysql_error());
	
	$rows = mysqli_num_rows($result);
	if($rows==1){
	    $_SESSION['nom'] = $nom;
	    header("Location: app.php");
	}else{
		$message = "Le nom d'utilisateur ou le mot de passe est incorrect.";
	}
}
?>
	<div class="container h-100">
		<div class="d-flex justify-content-center h-100">
			<div class="user_card">
				<div class="d-flex justify-content-center">
					<div class="brand_logo_container">
						<img src="logmeilo.jpg" class="brand_logo" alt="Logo">
					</div>
				</div>
				<div class="d-flex justify-content-center form_container">
					<form class="box" action="" method="post" name="login">
						<div class="input-group mb-3">
							<div class="input-group-append">
								<span class="input-group-text"><i class="fas fa-user"></i></span>
							</div>
							<input type="text" name="nom" class="form-control input_user" value="" placeholder="Nom">
						</div>
						<div class="input-group mb-2">
							<div class="input-group-append">
								<span class="input-group-text"><i class="fas fa-key"></i></span>
							</div>
							<input type="password" name="password" class="form-control input_pass" value="" placeholder="password">
						</div>
					
							<div class="d-flex justify-content-center mt-3 login_container">
				 	<button type="submit" name="ok" class="btn login_btn">se connecter</button>
				   </div>
				  
					</form>
				</div>
					<?php if (! empty($message)) { ?>
						<p class="errorMessage"><?php echo $message; ?></p>
					<?php } ?>
				<div class="mt-4">
					<div class="d-flex justify-content-center links">
						Don't have an account? <a href="register.php" class="ml-2">Sign Up</a>
					</div>
					<div class="d-flex justify-content-center links">
						<a href="#">Forgot your password?</a>
					</div>
				</div>
			</div>
		</div>
	</div>

</body>
</html>




