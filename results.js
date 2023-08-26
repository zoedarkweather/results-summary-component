async function fetchResults() {
    try {
        const response = await fetch("./data.json");
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`)                
        }
        const data = await response.json();
        return data;
    } catch (error) {   
        console.error(`Could not get results: ${error}`);
    }
}

function populateResults(data) {   
    const table = document.querySelector("table");
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";

    const paraScore = document.querySelector(".score")
    let score = 0;   

    for (const item of data) { 
        score += item.score;
        
        const tr = document.createElement("tr");
        const th = document.createElement("th");
        const img = document.createElement("img")
        const td = document.createElement("td");
        const thSpan = document.createElement("span");
        const tdSpan1 = document.createElement("span");
        const tdSpan2 = document.createElement("span");
        
        img.setAttribute("src", item.icon);        
        thSpan.textContent = ` ${item.category}`;
        th.appendChild(img);
        th.appendChild(thSpan);
        tdSpan1.textContent = item.score;
        tdSpan1.setAttribute("class", "data");
        td.appendChild(tdSpan1);
        tdSpan2.textContent = " / 100";
        td.appendChild(tdSpan2);
        tr.appendChild(th);
        tr.appendChild(td);
        tbody.appendChild(tr);
        table.appendChild(tbody);     
    }

    let avgScore = score / data.length;
    paraScore.textContent = Math.floor(avgScore);
}

const promise = fetchResults();    
promise.then((data) => {
    populateResults(data);
});