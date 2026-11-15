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
		gantt.push(ATValues[0]);
		for (let i = 0; i < ATlen; i++) {
			let j = i + 1, end = "→", ctfin;
			if (ATValues[i] > CTValues[i] || i === 0) {
				ctfin = ATValues[i] + BTValues[i];
				if (i > 0) {
					gantt.push(ATValues[i]);
				}
			} else {
				ctfin = CTValues[i] + BTValues[i];
			}
			processNum.push("P" + Number(i + 1));
			CTValues.push(ctfin);
			gantt.push(ctfin);
			TATValues.push(CTValues[j] - ATValues[i]);
			WTValues.push(TATValues[i] - BTValues[i]);
			if (i === ATlen - 1) end = " ";
			eoOutput.textContent += "P" + Number(i + 1) + end;
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
		for (let i = 0; i < processNum.length; i++) {
			const processSpan = document.createElement('span');
			processSpan.textContent = processNum[i];
			gcProcesses.appendChild(processSpan);
		}
		for (let i = 0; i < gantt.length; i++) {
			const timeSpan = document.createElement('span');
			timeSpan.textContent = gantt[i];
			gcTimes.appendChild(timeSpan);
		}
	} else alert("Invalid input");
}
  /* Matrix-style background */
  (function matrix() {
    const canvas = document.getElementById('matrix');
    if (!canvas || !canvas.getContext) return;

    const ctx = canvas.getContext('2d');
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const size = 16;
    let cols, drops;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.position = 'fixed';
      canvas.style.inset = '0';
      canvas.style.zIndex = '0';
      canvas.style.opacity = '0.7';
      cols = Math.floor(canvas.width / size);
      drops = Array.from({ length: cols }, () => Math.random() * -50);
    }
    resize();
    window.addEventListener('resize', resize);

    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setInterval(() => {
      ctx.fillStyle = 'rgba(0,0,0,.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0f9d3a';
      ctx.font = size + 'px monospace';
      drops.forEach((y, i) => {
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * size, y * size);
        drops[i] = y * size > canvas.height && Math.random() > .975 ? 0 : y + 1;
      });
    }, 70);
  })();
