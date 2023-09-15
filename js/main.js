function save(){
    let fullName = document.getElementById('fullname').value;
    let email = document.getElementById('email').value;
    let phoneNum = document.getElementById('phonenum').value;
    let address = document.getElementById('address').value;
    let gender = '';
    if (document.getElementById('male').checked){
        gender = document.getElementById('male').value;
    }
    else if (document.getElementById('female').checked){
        gender = document.getElementById('female').value;
    }
    validate(fullName, email, phoneNum, address, gender);
}

function emailValidate(email){
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function validate(fullName, email, phoneNum, address, gender){
    if(_.isEmpty(fullName)){
        fullName = '';
        document.getElementById("fullname-error").innerHTML = "Vui lòng nhập họ tên!";
    } 
    else if (fullName.trim().length <= 2) {
        fullName = '';
        document.getElementById("fullname-error").innerHTML = "Không được nhỏ hơn 2 ký tự"
    }
    else if (fullName.trim().length > 50) {
        fullName = '';
        document.getElementById("fullname-error").innerHTML = "Không được lớn hơn 50 ký tự"
    }
    else {
        document.getElementById("fullname-error").innerHTML = "";
    }

    if(_.isEmpty(email)){
        email = '';
        document.getElementById("email-error").innerHTML = "Vui lòng nhập email của bạn!";
    }
    else if(!emailValidate(email)){
        email = '';
        document.getElementById("email-error").innerHTML = "Email không đúng định dạng!"
    }
    else{
        document.getElementById("email-error").innerHTML = "";
    }

    if(_.isEmpty(phoneNum)){
        phoneNum = '';
        document.getElementById("phone-error").innerHTML = "Vui lòng nhập số điện thoại!";
    } 
    else if (!/\d/g.test(phoneNum)){
        phoneNum = '';
        document.getElementById("phone-error").innerHTML = "Số điện thoại không đúng định dạng"
    }
    else if (phoneNum.trim().length > 10) {
        phoneNum = '';
        document.getElementById("phone-error").innerHTML = "Số điện thoại không được lớn hơn 10 ký tự"
    }
    else {
        document.getElementById("phone-error").innerHTML = "";
    }

    if(_.isEmpty(address)){
        address = '';
        document.getElementById("address-error").innerHTML = "Vui lòng nhập địa chỉ!";
    } 
    else {
        document.getElementById("address-error").innerHTML = "";
    }

    if(_.isEmpty(gender)){
        gender = '';
        document.getElementById("gender-error").innerHTML = "Vui lòng chọn giới tính!";
    }
    else {
        document.getElementById("gender-error").innerHTML = "";
    }

    if(fullName && email && phoneNum && address && gender){
        let studentList = localStorage.getItem('studentList') ? JSON.parse(localStorage.getItem('studentList')) : [];

        let student = {
            fullName: fullName,
            email: email,
            phoneNum: phoneNum,
            address: address,
            gender: gender
        }
        studentList.push(student);
        localStorage.setItem('studentList',JSON.stringify(studentList));
        
    this.renderListStudent();
        
    }
}

function renderListStudent(){

    let studentList = localStorage.getItem('studentList') ? JSON.parse(localStorage.getItem('studentList')) : [];
    console.log(localStorage.getItem('studentList'));
    if(studentList.length === 0) {
        document.getElementById('list-student').style.display = "none";
        return false; 
    } 
    document.getElementById('list-student').style.display = "block";
    let tableContent = `
        <tr>
            <th>STT</th>
            <th>Họ và tên</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Địa chỉ</th>
            <th>Giới tính</th>
            <th>#</th>
        </tr>`;

        studentList.forEach((student, index) => {
            let studentId = index;
            index++;
            let genderLabel = student.gender === "1" ? 'Nam' : 'Nữ'
            tableContent += 
            `<tr>
                <td>${index}</td>
                <td>${student.fullName}</td>
                <td>${student.email}</td>
                <td>${student.phoneNum}</td>
                <td>${student.address}</td>
                <td>${genderLabel}</td>
                <td>
                    <a href="#" onclick=editStudent(${studentId})>Edit</a> | <a href="#" onclick="deleteStudent(${studentId})">Delete</a>
                </td>
            </tr>`;
        })

        document.getElementById('grid-student').innerHTML = tableContent;
}

function deleteStudent(id){
    let studentList = localStorage.getItem('studentList') ? JSON.parse(localStorage.getItem('studentList')) : [];
    
    studentList.splice(studentList[id], 1);
    
    localStorage.setItem('studentList',JSON.stringify(studentList));
    
    renderListStudent();
}

function findStudent(){
    let studentList = localStorage.getItem('studentList') ? JSON.parse(localStorage.getItem('studentList')) : [];
    let studentNameList = studentList.map(student => student.fullName);
    let student = studentList[studentNameList.indexOf(document.getElementById("student-searching").value)];
    console.log(student)
    let genderLabel = student.gender === "1" ? 'Nam' : 'Nữ';
    document.getElementById('grid-student').innerHTML = `
        <tr>
            <th>STT</th>
            <th>Họ và tên</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Địa chỉ</th>
            <th>Giới tính</th>
            <th>#</th>
        </tr>
        <tr>
            <td></td>
            <td>${student.fullName}</td>
            <td>${student.email}</td>
            <td>${student.phoneNum}</td>
            <td>${student.address}</td>
            <td>${genderLabel}</td>
            <td>
                <a href="#">Edit</a> | <a href="#" onclick="deleteStudent()">Delete</a>
            </td>
        </tr>`;
        
}

function editStudent(id){
    let studentList = localStorage.getItem('studentList') ? JSON.parse(localStorage.getItem('studentList')) : [];
    document.getElementById('fullname').value = studentList[id].fullName;
    document.getElementById('email').value = studentList[id].email;
    document.getElementById('phonenum').value = studentList[id].phoneNum;
    document.getElementById('address').value = studentList[id].address;
    console.log(studentList[id].gender)
    if (studentList[id].gender == "1"){
        document.getElementById('male').checked = true;
        
    }
    else if (studentList[id].gender == "2"){
       document.getElementById('female').checked = true;
    }
    deleteStudent(id);
}