function getElem(id){
    return document.getElementById(id);
}

function clearValue(){
    getElem('fullname').value = "";
    getElem('email').value = "";
    getElem('phonenum').value = "";
    getElem('address').value = "";
    getElem('female').checked = false;
    getElem('male').checked = false;
}

function save(){
    let fullName = getElem('fullname').value;
    let email = getElem('email').value;
    let phoneNum = getElem('phonenum').value;
    let address = getElem('address').value;
    let gender = '';
    if(getElem('female').checked){
        gender = getElem('female').value;
    }
    else if (getElem('male').checked){
        gender = getElem('male').value;
    }
    //validate(fullName,email,phoneNum,address,gender);
    if(validate(fullName,email,phoneNum,address,gender)){
        createNewStudent(fullName,email,phoneNum,address,gender);
    }
    renderStudentList();
    clearValue();
    getElem('save-info').innerHTML = "Lưu thông tin";
    getElem('save-info').style.backgroundColor = "#2db50e";
}

function fullNameValidate(fullName){
    let error = getElem('fullname-error');
    if(_.isEmpty(fullName)){
        fullName = "";
        error.innerHTML = "Tên không được để trống!"
    }
    else if(fullName.trim().length > 50){
        fullName = "";
        error.innerHTML = "Tên không được dài hơn 50 ký tự!"
    }
    else if(fullName.trim().length < 2){
        fullName = "";
        error.innerHTML = "Tên không được ngắn hơn 2 ký tự!"
    }
    else {
        error.innerHTML = "";
        return true;
    }
}

function emailValidate(email){
    let error = getElem('email-error');
    if(_.isEmpty(email)){
        email = "";
        error.innerHTML = "Email không được để trống!";
    }
    else if(!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
        email = "";
        error.innerHTML = "Email không đúng định dạng!";
    }
    else {
        error.innerHTML = "";
        return true;
    }
}

function phoneNumValidate(phoneNum){
    let error = getElem('phone-error');
    if(_.isEmpty(phoneNum)){
        phoneNum = "";
        error.innerHTML = "Số điện thoại không được để trống!";
    }
    else if(!/\d/g.test(phoneNum)){
        phoneNum = "";
        error.innerHTML = "Số điện thoại phải là chữ số!";
    }
    else {
        error.innerHTML = "";
        return true;
    }
}

function addressValidate(address){
    let error = getElem('address-error');
    if(_.isEmpty(address)){
        address = "";
        error.innerHTML = "Địa chỉ không được để trống!"
    }
    else if(address.trim().length > 100){
        address = "";
        error.innerHTML = "Địa chỉ không được dài hơn 100 ký tự!"
    }
    else if(address.trim().length < 5){
        address = "";
        error.innerHTML = "Địa chỉ không được ngắn hơn 5 ký tự!"
    }
    else {
        error.innderHTML = "";
        return true;
    }
}

function genderValidate(gender){
    let error = getElem('gender-error');
    if(_.isEmpty(gender)){
        gender = "";
        error.innerHTML = "Giới tính bắt buộc phải được chọn!"
    }
    else {
        error.innerHTML = "";
        return true;
    }
}

function validate(fullName,email,phoneNum,address,gender){
    fullNameValidate(fullName);
    emailValidate(email);
    phoneNumValidate(phoneNum);
    addressValidate(address);
    genderValidate(gender);
    if(fullNameValidate(fullName) && emailValidate(email) && phoneNumValidate(phoneNum) && addressValidate(address) && genderValidate(gender)){
        return true;
    }
}


function createNewStudent(fullName,email,phoneNum,address,gender){
    let student = new Student(fullName,email,phoneNum,address,gender);
    studentList.push(student);
    localStorage.setItem('studentList', JSON.stringify(studentList)); //Upload new student list to localstorage
}

function renderStudentList(){
    if(studentList.length === 0){
        getElem('list-student').style.display = "none";
        getElem('find-student-button').disable = true;
        getElem('rerender-student-button').disable = true;
    }

    getElem('list-student').style.display = "block";
    getElem('find-student-button').disable = false;
    getElem('rerender-student-button').disable = false;

    renderingList(studentList);
}
    
function renderingList(studentList){
    let tableContent = 
        `<tr>
            <th>STT</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th>SĐT</th>
            <th>Địa chỉ</th>
            <th>Giới tính</th>
            <th>#</th>
        </tr>`;
        
        studentList.forEach((student, index) => {
            let studentId = index + 1;
            let genderLabel = student.gender === 'female' ? "Nữ" : "Nam";
            tableContent += 
            `<tr>
                <td>${studentId}</td>
                <td>${student.fullName}</td>
                <td>${student.email}</td>
                <td>${student.phoneNum}</td>
                <td>${student.address}</td>
                <td>${genderLabel}</td>
                <td>
                    <button onclick = editStudent(${index})> Sửa </button> | 
                    <button onclick = deleteStudent(${index})> Xoá </button>
                </td>
            </tr>`

        getElem('grid-student').innerHTML = tableContent;
        });
}


function findStudent(){
    let studentFoundList = studentList.filter(student => student.fullName.includes(getElem("student-searching").value.trim()));
    renderingList(studentFoundList);
}

function editStudent(id){
    getElem('fullname').value = studentList[id].fullName;
    getElem('email').value = studentList[id].email;
    getElem('phonenum').value = studentList[id].phoneNum;
    getElem('address').value = studentList[id].address;
    
    if(studentList[id].gender == "1"){
        getElem('male').checked = true;
    }
    else if (studentList[id].gender == "2"){
        getElem('female').checked = true;
    };
    getElem('save-info').innerHTML = "Sửa thông tin";
    getElem('save-info').style.backgroundColor = "#b33042";
    deleteStudent(id);
}

function deleteStudent(id){
    studentList.splice(id,1);
    localStorage.setItem('studentList',JSON.stringify(studentList));
    renderStudentList();
}
