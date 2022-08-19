
function openForm() {
    document.getElementById("popupForm").style.display = "block";
}
function closeForm() {
    document.getElementById("popupForm").style.display = "none";
}


function formActions() {
    submitForm();
    errorMessage();
    emptyMsg();
    regNoErrorMsg();

}
//global varialbles
var row = null;
function submitForm() {
    var dataEntered = addData();
    var readData = readingDataFromLocalStorage(dataEntered);

    if (dataEntered == false) {

        msg.innerHTML = "<span style='color:#cc0000'></span>";
    }
    else {

        if (row == null) {
            insert(readData);
            msg.innerHTML = "<span style='color:#145858'>Data Inserted!</span>";
            closeForm();
        }
        else {
            update();
            msg.innerHTML = "<span style='color:#145858'>Data Updated!</span>";
            closeForm();
        }
    }


}


/* function retreiveData(){
    var name1= document.getElementById('name').value;   
    var exp= document.getElementById('exp').value;
    var regno= document.getElementById('regno').value;

    var arr = [name1, exp, regno];
    if (arr.includes("")){
        return false;
            }
            else {
                return arr;
            }
    
} */

// MohAN code 

var arr = new Array();
function addData() {
    getData();
    arr.push({
        studentName: document.getElementById("name").value,
        studentId: document.getElementById("exp").value,
        studentDept: document.getElementById("regno").value
    });

    localStorage.setItem("localData", JSON.stringify(arr));
    showData();
}

function getData() {
    var str = localStorage.getItem("localData");
    if (str != null)
        arr = JSON.parse(str);
}


function showData() {

    getData();
    var tbl = document.getElementById("table");
   
   
    for (i = 0; i < arr.length; i++) {
        var r = tbl.insertRow();
        var cell1 = r.insertCell();
        var cell2 = r.insertCell();
        var cell3 = r.insertCell();
        var cell4 = r.insertCell();


        cell1.innerHTML = arr[i].studentName;
        cell2.innerHTML = arr[i].studentId;
        cell3.innerHTML = arr[i].studentDept;
        cell4.innerHTML = `<i onclick = "edit(this),openForm()" class="fa-solid fa-pen-to-square editIcon" ></i>
                            <i onclick = "dltForm()" class="fa-solid fa-trash-can deleteBtn" ></i>`
        closeForm();
    }
}


//data in local storange

function readingDataFromLocalStorage(dataEntered) {
    //setting data in local storage
    var n = localStorage.setItem("Name", dataEntered[0]);
    var e = localStorage.setItem("Experiance", dataEntered[1]);
    var r = localStorage.setItem("Registerno", dataEntered[2]);

    // getting values from local to table
    var n1 = localStorage.getItem("Name", n);
    var e1 = localStorage.getItem("Experiance", e);
    var r1 = localStorage.getItem("Registerno", r);

    var arr = [n1, e1, r1];
    return arr;
}

function insert(readData) {
    var row = table.insertRow();

    row.insertCell(0).innerHTML = readData[0];
    row.insertCell(1).innerHTML = readData[1];
    row.insertCell(2).innerHTML = readData[2];
    row.insertCell(3).innerHTML = `   <i onclick = "edit(this),openForm()" class="fa-solid fa-pen-to-square editIcon" ></i>
                                       <i onclick = "dltForm()" class="fa-solid fa-trash-can deleteBtn" ></i>`




    /*  var cell1 = row.insertCell(0);
     var cell2 = row.insertCell(1);
     var cell3 = row.insertCell(2); */

    /*  cell1.innerHTML= readData[0];
     cell2.innerHTML= readData[1];
     cell3.innerHTML= readData[2]; */


}

//EDIT  

function edit(td) {
    row = td.parentElement.parentElement;
    document.getElementById("name").value = row.cells[0].innerHTML;
    document.getElementById("exp").value = row.cells[1].innerHTML;
    document.getElementById("regno").value = row.cells[2].innerHTML;
    
}

//UPDATE    

function update(td) {
    row = td.parentElement.parentElement;
    row.cells[0].innerHTML = document.getElementById("name").value;
    row.cells[1].innerHTML = document.getElementById("exp").value;
    row.cells[2].innerHTML = document.getElementById("regno").value;
    row = null;
}

//DELETE    

function remove(td) {

    row = td.parentElement.parentElement;
    document.getElementById("table").deleteRow(row.rowIndex);
    msg.innerHTML = "<span style='color:#cc0000'>You Have Deleted A Row!</span>";
    closedDltForm();
    row = null;
}

function dltForm() {

    document.getElementById('id01').style.display = 'block';
}

function closedDltForm() {
    document.getElementById('id01').style.display = 'none';
}


function newReset() {
    document.form1.reset();
}


function errorMessage() {
    var username = document.getElementById('name').value;
    var uname = document.getElementById("error")
    if ((document.getElementById("name").value == "")) {
        uname.textContent = "*This is required"
        uname.style.color = "red"
    } else {
        uname.textContent = ""
    }

}


function emptyMsg() {
    var userpassword = document.getElementById('exp').value;
    var upass = document.getElementById("expError")
    if ((document.getElementById("exp").value == "")) {
        upass.textContent = "*This is required"
        upass.style.color = "red"
    }
    else {
        upass.textContent = ""
    }


}


function regNoErrorMsg() {
    var userRegiter = document.getElementById('regno').value;
    var ureg = document.getElementById("regErr")
    if ((document.getElementById("regno").value == "")) {
        ureg.textContent = "*This is required"
        ureg.style.color = "red"
    }
    else {
        ureg.textContent = ""
    }


}
