<?php
include_once "Calculator.php";
include_once "interface/CalculateInterface.php";
include_once "implementation/Addition.php";
include_once "implementation/Subtraction.php";
include_once "implementation/Multiplication.php";
include_once "implementation/Division.php";


if(isset($_POST) && !empty($_POST) && array_key_exists('calculation_params', $_POST)) {	
	$calculation_params = $_POST['calculation_params'];
	
	$operation = $operand1 = $operand2 = null;
	
	if(strpos($calculation_params, "+") !== false){
		$operation = new Addition();
		$pieces = explode("+", $calculation_params);
		$operand1 = $pieces[0];
		$operand2 = $pieces[1];
	}
	else if(strpos($calculation_params, "-") !== false){
		$operation = new Subtraction();
		$pieces = explode("-", $calculation_params);
		$operand1 = $pieces[0];
		$operand2 = $pieces[1];
	}
	else if(strpos($calculation_params, "*") !== false){
		$operation = new Multiplication();
		$pieces = explode("*", $calculation_params);
		$operand1 = $pieces[0];
		$operand2 = $pieces[1];
	}
	else if(strpos($calculation_params, "/") !== false){
		$operation = new Division();
		$pieces = explode("/", $calculation_params);
		$operand1 = $pieces[0];
		$operand2 = $pieces[1];
	}
	else {
		print_r("Operation not supported");
	}
	
	$calculator = new Calculator($operation, $operand1, $operand2);
	$calculation = $calculator->getCalculation();
	
	echo json_encode(array("result" => $calculation));
	exit;
}


/*
//to test Addition from CLI run script as: php CalculatorController.php 5 + 5
//to test Subtraction from CLI run script as: php CalculatorController.php 5 - 5
//to test Multiplication from CLI run script as: php CalculatorController.php 5 "*" 5
//to test Division from CLI run script as: php CalculatorController.php 5 / 5

$operation = "";
$operationSign = $argv[2];

switch ($operationSign) {
    case '+':
        $operation = new Addition();
        break;
    case '-':
        $operation = new Subtraction();
        break;
    case "*":
        $operation = new Multiplication();
        break;
    case '/':
        $operation = new Division();
        break;
}

$calculator = new Calculator($operation, $argv[1], $argv[3]);
$calculation = $calculator->getCalculation();

echo "\n";
echo "RESULT: " . $calculation;
echo "\n";
echo "\n";
*/

?>
