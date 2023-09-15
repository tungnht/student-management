var studentList = localStorage.getItem('studentList') ? JSON.parse(localStorage.getItem('studentList')) : [];
//Download studentList to localStorage, return the list (is parse from JSON file) or new array if data is empty;
