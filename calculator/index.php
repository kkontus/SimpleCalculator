<html>
<head>
<script type='text/javascript' src='js/jquery-2.1.4.js'></script>
<script type='text/javascript' src='js/knockout-3.3.0.js'></script>
<script type='text/javascript' src='js/view_model.js'></script>
<script type='text/javascript' src='js/calculator_view_model.js'></script>

<style>
body {
    background-color: tan;
}
h2 {
    text-align: center;
    text-decoration: underline;
}
.box {
    background-color: #3d4543;
    height: 300px;
    width: 250px;
    border-radius: 10px;
    position: relative;
    top: 80px;
    left: 40%;
}
.display {
    background-color: #222;
    width: 220px;
    position: relative;
    left: 15px;
    top: 20px;
    height: 40px;
}
.display input {
    position: relative;
    left: 2px;
    top: 2px;
    height: 35px;
    color: black;
    background-color: #bccd95;
    font-size: 21px;
    text-align: right;
}
.keys {
    position: relative;
    top: 15px;
}
.button {
    width: 40px;
    height: 30px;
    border: none;
    border-radius: 8px;
    margin-left: 17px;
    cursor: pointer;
    border-top: 2px solid transparent;
}
.button.gray {
    color: white;
    background-color: #6f6f6f;
    border-bottom: black 2px solid;
    border-top: 2px #6f6f6f solid;
}
.button.pink {
    color: black;
    background-color: #ff4561;
    border-bottom: black 2px solid;
}
.button.black {
    color: white;
    background-color: 303030;
    border-bottom: black 2px solid;
    border-top: 2px 303030 solid;
}
.button.orange {
    color: black;
    background-color: FF9933;
    border-bottom: black 2px solid;
    border-top: 2px FF9933 solid;
}
.gray:active {
    border-top: black 2px solid;
    border-bottom: 2px #6f6f6f solid;
}
.pink:active {
    border-top: black 2px solid;
    border-bottom: #ff4561 2px solid;
}
.black:active {
    border-top: black 2px solid;
    border-bottom: #303030 2px solid;
}
.orange:active {
    border-top: black 2px solid;
    border-bottom: FF9933 2px solid;
}
p {
    line-height: 10px;
}
</style>
</head>

<body>
<div class="box">
	<div class="display">
		<input type="text" size="16" data-bind="value: display" readonly>
	</div>
	<div class="keys">
		<p><input type="button" class="button gray" data-bind="click: buttonMrc, value: valueMrc"><input type="button" class="button gray" data-bind="click: buttonMminus, value: valueMminus"><input type="button" class="button gray" data-bind="click: buttonMplus, value: valueMplus"><input type="button" class="button pink" data-bind="click: buttonDivision, value: valueDivision"></p>
		<p><input type="button" class="button black" data-bind="click: button7, value: value7"><input type="button" class="button black" data-bind="click: button8, value: value8"><input type="button" class="button black" data-bind="click: button9, value: value9"><input type="button" class="button pink" data-bind="click: buttonMultiplication, value: valueMultiplication"></p>
		<p><input type="button" class="button black" data-bind="click: button4, value: value4"><input type="button" class="button black" data-bind="click: button5, value: value5"><input type="button" class="button black" data-bind="click: button6, value: value6"><input type="button" class="button pink" data-bind="click: buttonSubtraction, value: valueSubtraction"></p>
		<p><input type="button" class="button black" data-bind="click: button1, value: value1"><input type="button" class="button black" data-bind="click: button2, value: value2"><input type="button" class="button black" data-bind="click: button3, value: value3"><input type="button" class="button pink" data-bind="click: buttonAddition, value: valueAddition"></p>
		<p><input type="button" class="button black" data-bind="click: button0, value: value0"><input type="button" class="button black" data-bind="click: buttonDecimal, value: valueDecimal"><input type="button" class="button black" data-bind="click: buttonC, value: valueC"><input type="button" class="button orange" data-bind="click: buttonEquals, value: valueEquals"></p>
	</div>
</div>
</body>
</html>