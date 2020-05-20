document.getElementById("visualize").addEventListener('click', function() {


    window.tl = new TimelineMax({ onUpdate: updateSlider });
    var tables = [];

    var text1 = document.getElementById("text");
    if (text1.value == "") text1.value = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do,"
    var maxWidth = document.getElementById("number").value;
    words = text1.value.split(" ")

    var INF = 2147483647;
    var len = words.length;
    var i = 0
    for (; i < len; i++)
        if (words[i].length > maxWidth) {
            alert("one of the words' length is bigger than the max width");
            break;
        } else {
            spaces = Array(len + 1).fill(null).map(() => Array(len + 1).fill(0));
            cost = Array(len + 1).fill(null).map(() => Array(len + 1).fill(0));

            kalam = document.getElementsByClassName("kalam")
            document.getElementById("controller").style.display = "inline"
            document.getElementById("final").style.display = "none";
            document.getElementById("home").style.display = "none"
            document.getElementById("show").style.display = "inline"
            document.getElementById("pseudocode").style.zIndex = "2";
            document.getElementById("pseudocode").style.display = "inline"

            TweenMax.to(document.getElementById("sidebar"), 0.7, { x: "-100%", opacity: 0, })

            TweenMax.from(document.getElementById("controller"), 0.2, { opacity: 0, delay: .3, })


            // fill first row and column with words
            for (i = 1; i < len + 1; i++) {
                spaces[i][0] = words[i - 1];
                spaces[0][i] = words[i - 1];
                cost[i][0] = words[i - 1];
                cost[0][i] = words[i - 1];
            }
            spaces[0][0] = "";
            cost[0][0] = "";
            zerodCost = [];

            createTable("cost", cost, zerodCost)
            createTable("spaces", spaces, tables)
            c = Array(len + 1).fill(0)
            p = Array(len + 1).fill(0)

            var i;
            var j;
            for (i = 1; i < len + 1; i++) {
                spaces[i][i] = maxWidth - (words[i - 1]).length;
                createTable("spaces", spaces, tables, 1, i, i, "#5F3735")
                for (j = i + 1; j < len + 1; j++) {
                    spaces[i][j] = (spaces[i][j - 1] - (words[j - 1]).length - 1);
                    createTable("spaces", spaces, tables, 1, i, j, "#8C5F58", "#9F736B")
                }
            }
            createTable("spaces", spaces, tables)

            for (i = 1; i < len + 1; i++) {
                for (j = i; j < len + 1; j++) {
                    if (spaces[i][j] < 0) { cost[i][j] = INF; } else { cost[i][j] = (spaces[i][j] * spaces[i][j]) }
                }
            }
            createTable("cost", cost, tables)

            var tablec = [];
            var tablep = [];
            for (j = 1; j < len + 1; j++) {
                c[j] = INF;
                createMiniTable("C", c, tablec, 1, j, "#5F3735")
                for (i = 1; i < j + 1; i++) {

                    if ((c[i - 1] != INF && cost[i][j] != INF && ((c[i - 1] + cost[i][j]) < c[j]))) {
                        c[j] = c[i - 1] + cost[i][j];
                        p[j] = i;
                        createMiniTable("C", c, tablec, 1, j, "#5F3735")
                        createMiniTable("P", p, tablep, 1, j, "#5F3735")
                    } else {
                        createMiniTable("C", c, tablec)
                        createMiniTable("P", p, tablep)
                    }

                }
            }

            var x = len;
            var count = 0
            answer = Array();
            answers = []
            if (p[x] != 1) {
                while (p[x] != 1) {
                    createMiniTable("P", p, answers, 1, x, "#5F3735", flagg = 1)
                    answer.push(x);
                    createMiniTable("answer", answer, answers, 1, count, "#5F3735", flagg = 1)
                    count++
                    x = p[x] - 1;
                }
            }
            answer.push(x)

            createMiniTable("answer", answer, answers, flagg = 1)

            //tables has empty array and its fillings and the cost array at last with infinities and ^2
            //tablec for array c
            //tablep for array p 
            xx = document.getElementById("spaces")
            xx.appendChild(tables[0]);


            tl.to(xx.children[0], 0.2, { opacity: 1 })
                .to(xx.children[0][1], 0.2, { backgroundColor: "#e07a5f" })
                .to(kalam[1], 0.2, { backgroundColor: "#e07a5f" })
                .to(kalam[1], 2, { backgroundColor: "#e07a5f" })
                .to(xx.children[0], 0.2, { opacity: 0 })
                .to(kalam[1], 0, { backgroundColor: "", })


            var number1 = 1;
            var number2 = len + 1;
            var i = 1;
            //printing filling spaces
            for (; i < tables.length - 2; i++) {
                xx.appendChild(tables[i])
                xx.children[i]
                if (number1 == number2) {
                    number1 = 1;
                    number2 -= 1;
                }
                if (number1 == 1) {
                    tl.to(xx.children[i], 0.02, { opacity: 1 })
                        .to(kalam[3], 0.2, { backgroundColor: "#e07a5f" })
                        .to(kalam[3], 2, { backgroundColor: "#e07a5f" })
                        .to(xx.children[i], 0.02, { opacity: 0 })
                        .to(kalam[3], 0, { backgroundColor: "", })
                } else {
                    tl.to(xx.children[i], 0.02, { opacity: 1 })
                        .to(kalam[5], 0.2, { backgroundColor: "#e07a5f" })
                        .to(kalam[5], 2, { backgroundColor: "#e07a5f" })
                        .to(xx.children[i], 0.02, { opacity: 0 })
                        .to(kalam[5], 0, { backgroundColor: "" })
                }
                number1 += 1;
            }
            //filled spaces 
            {
                xx.appendChild(tables[i])
                tl.to(xx.children[i], .5, { xPercent: +125, opacity: 1 })
                    .to(kalam[0], 0.2, {})

                xx.appendChild(tables[i])
                    //cost + moving tables
                var cost = document.getElementById("cost")
                cost.appendChild(zerodCost[0])
                cost.appendChild(tables[tables.length - 1])

                var offsett = cost.children[1].offsetWidth + 20

                var offseth = cost.children[1].offsetHeight + 10
                    //zerod cost
                tl.to(cost.children[0], 0.2, { opacity: 1 })
                    .to(kalam[6], 0.2, { backgroundColor: "#e07a5f" })
                    .to(kalam[6], 2, { backgroundColor: "#e07a5f" })
                    .to(cost.children[0], 0.2, { opacity: 0 })
                    .to(kalam[6], 0, { backgroundColor: "", })
                    //fill cost
                tl.to(cost.children[1], 0.2, { yPercent: 100, opacity: 1 })
                    .to(kalam[7], 0.2, { backgroundColor: "#e07a5f" })
                    .to(kalam[7], 2, { backgroundColor: "#e07a5f" })
                    .to(kalam[7], 0, { backgroundColor: "", })
            }
            //p and c arrays
            var ppp = document.getElementById("pp");
            var ccc = document.getElementById("c");

            var y = 0;
            var x = 0;
            for (j = 1; j < len + 1; j++) {
                ccc.appendChild(tablec[y])
                tl.to(ccc.children[y], 0.2, { opacity: 1 })
                    .to(kalam[12], 0.2, { backgroundColor: "#e07a5f" })
                    .to(kalam[12], 2, { backgroundColor: "#e07a5f" })
                    .to(ccc.children[y], 0.5, { opacity: 0 })
                    .to(kalam[12], 0, { backgroundColor: "", })

                y++;
                for (var w = 1; w < j + 1; w++) {
                    ccc.appendChild(tablec[y])
                    ppp.appendChild(tablep[x])
                    ppp.children[x].style.opacity = 0;
                    tl.to(ccc.children[y], 0.2, { opacity: 1 })
                        .to(ppp.children[x], 0.2, { yPercent: 100, x: 10, opacity: 1 })
                        .to(kalam[14], 0.2, { backgroundColor: "#e07a5f" })
                        .to(kalam[15], 0.2, { backgroundColor: "#e07a5f" })
                        .to(kalam[14], 2, { backgroundColor: "#e07a5f" })
                        .to(ccc.children[y], 0.2, { opacity: 0 }, )
                        .to(ppp.children[x], 0.2, { opacity: 0 }, )
                        .to(kalam[14], 0, { backgroundColor: "", })
                        .to(kalam[15], 0, { backgroundColor: "", })
                    y++;
                    x++;
                }

            }

            var ans = document.getElementById("ans");
            for (i = 0; i < (answers.length - 1); i++) {
                ans.appendChild(answers[i])
                i++;
                ans.appendChild(answers[i])


                tl.to(ans.children[i - 1], 0.2, { opacity: 1 })
                    .to(ans.children[i], 0.2, { yPercent: 100, x: 10, opacity: 1 })
                    .to(kalam[18], 0.2, { backgroundColor: "#e07a5f" })
                    .to(kalam[19], 0.2, { backgroundColor: "#e07a5f" })
                    .to(kalam[18], 2, { backgroundColor: "#e07a5f" })
                    .to(ans.children[i - 1], 0.2, { opacity: 0 }, )
                    .to(ans.children[i], 0.2, { opacity: 0 }, )
                    .to(kalam[18], 0, { backgroundColor: "", })
                    .to(kalam[19], 0, { backgroundColor: "", })
            }

            ans.appendChild(answers[answers.length - 1])
            tl.to(ans.children[i - 1], 0.2, { opacity: 1 })
                .to(kalam[18], 0.2, { backgroundColor: "" })



            x = answer.length - 1
            var htmlString = ""
            for (i = 0; i < len; i++) {
                if (answer[x] == i) {
                    htmlString += "<br>"
                    x--;
                }
                htmlString += words[i] + " "
            }
            document.getElementById("answerr").innerHTML = htmlString;

            tl.to(document.getElementById("final"), 0, { display: "flex", position: "relative" })
                .from(document.getElementById("final"), .5, { xPercent: 50, opacity: 0, ease: "back" });

        }


})

function createTable(label, tableData, tables, flag = 0, i = 0, j = 0, color, color2 = 0) {
    var table = document.createElement("table");

    var bold = document.createElement("B");
    var t = document.createTextNode(label);
    bold.appendChild(t);
    (table.createCaption()).appendChild(bold)

    var tableBody = document.createElement('tbody');
    var x = 0;
    var y = 0;
    tableData.forEach(function(rowData) {
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

function createMiniTable(label, rowData, tables, flag = 0, i = 0, color = 0, flagg = 0) {
    var table = document.createElement('table');

    var bold = document.createElement("B");
    var t = document.createTextNode(label);
    bold.appendChild(t);
    (table.createCaption()).appendChild(bold)

    var tableBody = document.createElement('tbody');
    var row = document.createElement('tr');
    row.style.border = "2px solid white";
    var element = 0
    rowData.forEach(function(cellData) {
        element += 1;
        if (element != 1 || flagg == 1) {
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

function speed() {
    x = document.getElementById("speeder").value;
    window.tl.timeScale(x);
}

function pause() { window.tl.pause() }

function play() { window.tl.play() }

function restart() { window.tl.restart() }

function slide() {
    window.tl.pause();
    x = document.getElementById("slider").value;
    window.tl.progress(x / 100);
}

function skipB() {
    window.tl.pause();
    window.tl.progress(0);
}

function skipF() {
    window.tl.pause();
    window.tl.progress(1);
}

function updateSlider() {
    document.getElementById("slider").value = window.tl.progress() * 100
}


function finalAnswer() {


    var text1 = document.getElementById("text");
    if (text1.value == "") text1.value = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"
    var maxWidth = document.getElementById("number").value;
    words = text1.value.split(" ")

    var INF = 2147483647;
    var len = words.length;
    for (var i = 0; i < len - 1; i++)
        if (words[i].length > maxWidth) {
            alert("one of the words' length is bigger than the max width");
            break;
        } else {

            document.getElementById("home").style.display = "none";
            tl2 = new TimelineMax();
            tl2.to(document.getElementById("final"), 0, { display: "flex" })
                .from(document.getElementById("final"), .5, { xPercent: 50, opacity: 0, ease: "back" });
            spaces = Array(len + 1).fill(null).map(() => Array(len + 1).fill(0));
            cost = Array(len + 1).fill(null).map(() => Array(len + 1).fill(0));

            c = Array(len + 1).fill(0)
            p = Array(len + 1).fill(0)

            var i;
            var j;
            for (i = 1; i < len + 1; i++) {
                spaces[i][i] = maxWidth - (words[i - 1]).length;
                for (j = i + 1; j < len + 1; j++) {
                    spaces[i][j] = (spaces[i][j - 1] - (words[j - 1]).length - 1);
                }
            }
            for (i = 1; i < len + 1; i++) {
                for (j = i; j < len + 1; j++) {
                    if (spaces[i][j] < 0) { cost[i][j] = INF; } else { cost[i][j] = (spaces[i][j] * spaces[i][j]) }
                }
            }
            for (j = 1; j < len + 1; j++) {
                c[j] = INF;
                for (i = 1; i < j + 1; i++) {
                    if ((c[i - 1] != INF && cost[i][j] != INF && ((c[i - 1] + cost[i][j]) < c[j]))) {
                        c[j] = c[i - 1] + cost[i][j];
                        p[j] = i;
                    }
                }
            }

            var x = len;
            var count = 0
            answer = Array();
            if (p[x] != 1) {
                while (p[x] != 1) {
                    answer.push(x);
                    count++
                    x = p[x] - 1;
                }
            }
            answer.push(x)
        }
    x = answer.length - 1
    var htmlString = ""
    for (i = 0; i < len; i++) {
        if (answer[x] == i) {
            htmlString += "<br>"
            x--;
        }
        htmlString += words[i] + " "
    }
    document.getElementById("answerr").innerHTML = htmlString;



}