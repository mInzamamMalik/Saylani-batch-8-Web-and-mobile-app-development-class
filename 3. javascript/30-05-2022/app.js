// let value = 1
// let value2 = '1'

// if (value === value2) {
//     console.log('true');
// } else {
//     console.log('false');
// }


// let marks = prompt('Input your marks')

// if (marks <= 100 && marks >= 80) {
//     console.log('A+');
// } else if (marks <= 79 && marks >= 70) {
//     console.log('A');
// } else if (marks <= 69 && marks >= 60) {
//     console.log('B');
// } else if (marks <= 59 && marks >= 50) {
//     console.log('C');
// } else if (marks < 50 && marks >= 0) {
//     console.log('F');
// } else {
//     console.log('Invalid Input');
// }

// const submitFields = () => {
//     const userEmail = document.getElementById('userEmail')
//     const userNumber = document.getElementById('userNumber')
//     const warning = document.getElementById('warning')
//     // console.log(typeof(userNumber));

//     console.log("'1' == 1", '1' == 1); //true
//     console.log("'1' === 1", '1' === 1); //false
//     console.log("'a' == 'a'", 'a' == 'a'); //true
//     console.log("'a' == 'b'", 'a' == 'b'); //false
//     console.log("'a' != 'b'", 'a' != 'b');
//     console.log("'a' != 'a'", 'a' != 'a');
//     console.log("!1", !1);
//     console.log("!0", !0);
//     console.log("!true", !true);
//     console.log("!false", !false);
//     console.log("'1' != 1", '1' != 1); // F
//     console.log("'1' !== 1", '1' !== 1); // T

//     console.log(-5);

// if (!userEmail.value != userNumber.value) {
//     warning.textContent = 'Password doesn\'t match'
// } else {
//     console.log('Please fill atleast one field');
// }
// if (userEmail.value || userNumber.value) {
//     console.log('true');
//     userEmail.value = ''
//     userNumber.value = ''
// } else {
//     console.log('Please fill atleast one field');
// }
// }

let arr = [1, 2, 3, 4, 'gyj', true, false, [7, 4, 4, 4], function (a, b, c) { 
    console.log('a', a);
    console.log('b', b);
    console.log('c', c);
 }]
//                 a  b
// console.log(arr[8](5, 2, 'fff'))
console.log(arr[7][0]);
arr[7][0] = 8
console.log(arr[7][0]);
// console.log(arr[3]);


console.log(arr);
// console.log(arr[8]);

// let str = '012345'
// console.log(str[4]);

// console.log(arr.length);


// let asd = 33223, sdf = 4676767

// func('a', 'b')

// func = (a, b) => {}
