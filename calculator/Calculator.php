<?php

class Calculator {	
	private $operation;
	private $operand1;
	private $operand2;	

	function __construct(CalculateInterface $operation, $operand1, $operand2) {
		$this->operation = $operation;	
		$this->operand1 = $operand1;
		$this->operand2 = $operand2;
	}		
	
	public function getCalculation() {
		$calculation = $this->operation->executeOperation($this->operand1, $this->operand2);
		return $calculation;
	}
}

?>