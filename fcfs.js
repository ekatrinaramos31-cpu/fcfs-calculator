const calculate = document.getElementById("calculateBtn"), table = document.getElementById("fcfsTable"), inputs = document.querySelectorAll('input'),
	spaces = "\u00A0\u00A0\u00A0\u00A0\u00A0", onlyInputs = ['0','1','2','3','4','5','6','7','8','9',' ','Backspace','Tab'];
calculate.addEventListener('click', finalAnswer);

inputs.forEach((input) => {
	input.addEventListener('keydown', (event) => {
		if (!onlyInputs.includes(event.key)) event.preventDefault();
	})
});

function finalAnswer() {
	const AT = document.getElementById("AT"), BT = document.getElementById("BT"), eoOutput = document.getElementById("eoOutput"),
		gcProcesses = document.getElementById("gcProcesses"), gcTimes = document.getElementById("gcTimes");
	const ATValues = (AT.value.split(" ")).map(item => parseInt(item, 10)), BTValues = (BT.value.split(" ")).map(item => parseInt(item, 10));
	const ATlen = ATValues.length, BTlen = BTValues.length;
	if (!ATValues.includes(NaN) && !BTValues.includes(NaN) && ATlen === BTlen) {
		eoOutput.textContent = "";
		gcProcesses.textContent = "";
		gcTimes.textContent = "";
		const tableRows = table.rows.length;
		for (let d = tableRows - 1; d > 0; d--) table.deleteRow(d);
		const processNum = [], CTValues = [], TATValues = [], WTValues = [], gantt = [];
		CTValues.push(ATValues[0]);
		gantt.push(ATValues[0])
		for (let i = 0; i < ATlen; i++) {
			let j = i + 1, end = "→", ctfin;
			if (ATValues[i] > CTValues[i] || i===0) {
				ctfin=ATValues[i] + BTValues[i];
					if (i>0) {
						processNum.push("__");
						gantt.push(ATValues[i]);
					}
			} else {
				ctfin=CTValues[i]+BTValues[i];
			}
			processNum.push("P"+Number(i+1));
			CTValues.push(ctfin);
			gantt.push(ctfin);
			TATValues.push(CTValues[j] - ATValues[i]);
			WTValues.push(TATValues[i] - BTValues[i]);
			if (i === ATlen - 1) end = " ";
			eoOutput.textContent += "P"+Number(i+1) + end;
			/*
			SORT PROCESSES BY THEIR AT
			const process = [{
				p: processNum[i],
				p_at: ATValues[i],
				p_bt: BTValues[i]
			}]
			process.sort((at1,at2)=>at1.p_at-at2.p_at);
			console.log(process);*/
			//output
			const row = table.insertRow(-1);
			let displayProcesses = row.insertCell(0);
			displayProcesses.textContent = "P" + Number(i + 1);
			let displayAT = row.insertCell(1);
			displayAT.textContent = ATValues[i];
			let displayBT = row.insertCell(2);
			displayBT.textContent = BTValues[i];
			let displayCT = row.insertCell(3);
			displayCT.textContent = CTValues[j];
			let displayTAT = row.insertCell(4);
			displayTAT.textContent = TATValues[i];
			let displayWT = row.insertCell(5);
			displayWT.textContent = WTValues[i];
		}
		for (let i=0;i<processNum.length;i++) gcProcesses.textContent += processNum[i] + spaces;
		for (let i=0;i<gantt.length;i++) gcTimes.textContent += gantt[i] + spaces;
	} else alert("Invalid input");
}