document.getElementById("visualize").addEventListener('click', function() {
    document.getElementById("inputs").style.display = "none"
    document.getElementById("pseudocode").style.display = "inline"

    var tl = new TimelineMax({});
    var tables = [];

    var text1 = document.getElementById("text");
    var maxWidth = document.getElementById("number").value;
    words = text1.value.split(" ")

    var INF = 2147483647;
    var len = words.length;

    spaces = Array(len + 1).fill(null).map(() => Array(len + 1).fill(0));
    cost = Array(len + 1).fill(null).map(() => Array(len + 1).fill(0));

    kalam = document.getElementsByClassName("kalam")

    // show array filed with zeros 
    for (i = 1; i < len + 1; i++) {
        spaces[i][0] = words[i - 1];
        spaces[0][i] = words[i - 1];
        cost[i][0] = words[i - 1];
        cost[0][i] = words[i - 1];
    }
    spaces[0][0] = "";
    cost[0][0] = "";

    createTable(spaces, tables)
    c = Array(len + 1).fill(0)
    p = Array(len + 1).fill(0)

    var i;
    var j;
    for (i = 1; i < len + 1; i++) {
        spaces[i][i] = maxWidth - (words[i - 1]).length;
        createTable(spaces, tables, 1, i, i, "#5F3735")
        for (j = i + 1; j < len + 1; j++) {
            spaces[i][j] = (spaces[i][j - 1] - (words[j - 1]).length - 1);
            createTable(spaces, tables, 1, i, j, "#8C5F58", "#9F736B")
        }
    }

    for (i = 1; i < len + 1; i++) {
        for (j = i; j < len + 1; j++) {
            if (spaces[i][j] < 0) { cost[i][j] = INF; } else { cost[i][j] = (spaces[i][j] * spaces[i][j]) }
        }
    }
    createTable(cost, tables)
    var tablec = [];
    var tablep = [];
    for (j = 1; j < len + 1; j++) {
        c[j] = INF;
        createMiniTable(c, tablec, 1, j, "#5F3735")
        for (i = 1; i < j + 1; i++) {
            if ((c[i - 1] != INF && cost[i][j] != INF && ((c[i - 1] + cost[i][j]) < c[j]))) {
                c[j] = c[i - 1] + cost[i][j];
                createMiniTable(c, tablec, 1, j, "#5F3735")
                p[j] = i;
                createMiniTable(p, tablep, 1, j, "#5F3735")
            }
        }
    }

    var x = len;
    answer = Array();
    if (p[x] != 1) {
        while (p[x] != 1) {
            answer.push(x);
            console.log(x)
            x = p[x] - 1;
        }
    }
    answer.push(x)

    //tables has empty array and its fillings and the cost array at last with infinities and ^2
    //tablec for array c
    //tablep for array p 
    x = document.getElementById("container1")
    x.appendChild(tables[0]);
    tl.from(x, 0.5, { left: 100, autoAlpha: 0 })
        //for (var i = 0; i < tablec.length; i++)
        //  x.appendChild(tablec[i]);



})

function createTable(tableData, tables, flag = 0, i = 0, j = 0, color, color2 = 0) {
    var table = document.createElement('table');
    var tableBody = document.createElement('tbody');
    var x = 0;
    var y = 0;
    tableData.forEach(function(rowData) {
        console.log(x)
        x += 1;
        y = 0;
        var row = document.createElement('tr');
        row.style.border = "2px solid white";
        rowData.forEach(function(cellData) {
            var cell = document.createElement('td');
            y += 1;
            if (cellData == 2147483647) { cell.appendChild(document.createTextNode("∞")); } else cell.appendChild(document.createTextNode(cellData));
            cell.style.border = "2px solid white";
            if (flag == 1 && i == x - 1 && j == y - 1) { cell.style.backgroundColor = color }
            if (color != 0 && i == x - 1 && j == y) { cell.style.backgroundColor = color2 }
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });

    table.appendChild(tableBody);
    tableBody.style.border = "2px solid white";
    tables.push(table)
}

function createMiniTable(rowData, tables, flag = 0, i = 0, color = 0) {
    var table = document.createElement('table');
    var tableBody = document.createElement('tbody');
    var row = document.createElement('tr');
    row.style.border = "2px solid white";
    var element = 0
    rowData.forEach(function(cellData) {
        element += 1;
        if (element != 1) {
            var cell = document.createElement('td');
            if (cellData == 2147483647) { cell.appendChild(document.createTextNode("∞")); } else cell.appendChild(document.createTextNode(cellData));
            cell.style.border = "2px solid white";
            if (flag != 0 && element == i + 1) cell.style.backgroundColor = color;
            row.appendChild(cell);
        }
    });
    tableBody.appendChild(row);
    table.appendChild(tableBody);
    tableBody.style.border = "2px solid white";
    tables.push(table);
}