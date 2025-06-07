const inputRangeForm = document.getElementById("input-range-form");
const thead = document.getElementById("thead");
const tbody = document.getElementById("tbody");

inputRangeForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const firstNum = parseInt(document.getElementById("firstNum").value);
  const lastNum = parseInt(document.getElementById("lastNum").value);
  createTable(firstNum, lastNum);
  inputRangeForm.remove();
});

function createTable(firstNum, lastNum) {
  const th = document.createElement("th");
  th.textContent = "×";
  thead.appendChild(th);

  if (firstNum < lastNum) {
    for (let i = firstNum; i <= lastNum; i++) {
      const th = document.createElement("th");
      th.textContent = i;
      thead.appendChild(th);

      const tr = document.createElement("tr");

      const thBody = document.createElement("th");
      thBody.textContent = i;
      tr.appendChild(thBody);

      for (let j = firstNum; j <= lastNum; j++) {
        const td = document.createElement("td");
        td.textContent = i * j;
        tr.appendChild(td);
      }

      tbody.appendChild(tr);
    }
  } else if (firstNum > lastNum) {
    for (let i = firstNum; i >= lastNum; i--) {
      const th = document.createElement("th");
      th.textContent = i;
      thead.appendChild(th);

      const tr = document.createElement("tr");

      const thBody = document.createElement("th");
      thBody.textContent = i;
      tr.appendChild(thBody);

      for (let j = firstNum; j >= lastNum; j--) {
        const td = document.createElement("td");
        td.textContent = i * j;
        tr.appendChild(td);
      }

      tbody.appendChild(tr);
    }
  } else if (firstNum === lastNum) {
    const th = document.createElement("th");
    th.textContent = firstNum;
    thead.appendChild(th);

    const tr = document.createElement("tr");
    tbody.appendChild(tr);

    const thBody = document.createElement("th");
    thBody.textContent = firstNum;
    tr.appendChild(thBody);

    const td = document.createElement("td");
    td.textContent = firstNum;
    tr.appendChild(td);

    tbody.appendChild(tr);
  }
}
