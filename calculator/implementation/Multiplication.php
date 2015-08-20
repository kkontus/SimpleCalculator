<?php

class Multiplication implements CalculateInterface {	
	private $operand1;
	private $operand2;
	
	public function executeOperation($operand1, $operand2) {
        $this->operand1 = $operand1;
		$this->operand2 = $operand2;
		
		$result = $this->operand1 * $this->operand2;
		//print $result . "\n";
		return $result;
    }
}

?>