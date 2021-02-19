/********************
 * YOUR CODE BELOW! *
 ********************/

function moreThan5(num){
  return answer = num > 5;
}

function isNewTopScore(score,topScore){
  return answer = score > topScore;
}

function isInDanger(grade){
  return answer = grade >= 60 && grade <= 71;
}

function isCoasting(grade){
  return answer = grade >= 72 && grade <= 83;
}

function isSucceeding(grade){
  return answer = grade >= 84 && grade <= 92;
}
function isFailing(grade){
  return answer = grade < 60;
}

function isAcing(grade){
  return answer = grade > 92;
}

function isStudent(string){
  return answer = string === 'student';
}

function isTeacher(string){
  return answer = string === 'teacher';
}

function isAdmin(string){
  return answer = string === 'admin';
}

function isElementary(string){
  return answer = string === 'elementary';
}

function  areDifferentPeople(name1, name2){
  return answer = name1 !== name2;
}

function isMiddleSchoolTeacher(role, level){
  return answer = role === 'teacher' && level >= 6 && level <= 8;
}



function notAnElementarySchoolAdministrator(level, role){
  return answer = level !== 'elementary' || role !== 'admin';
}







/********************************************************************************************
 * CODE BELOW IS FOR EXPORTING THE VARIABLES AND FUNCTIONS YOU WROTE ABOVE TO MAIN.TEST.JS. *
 *                              THIS IS FOR INTERNAL USE ONLY                               *
 *                          DON'T ADD TO OR CHANGE ANYTHING BELOW!                          *
 ********************************************************************************************/


if (typeof moreThan5 === 'undefined') {
  moreThan5 = undefined;
}

if (typeof isNewTopScore === 'undefined') {
  isNewTopScore = undefined;
}

if (typeof isInDanger === 'undefined') {
  isInDanger = undefined;
}

if (typeof isCoasting === 'undefined') {
  isCoasting = undefined;
}

if (typeof isSucceeding === 'undefined') {
  isSucceeding = undefined;
}

if (typeof isFailing === 'undefined') {
  isFailing = undefined;
}

if (typeof isAcing === 'undefined') {
  isAcing = undefined;
}

if (typeof isStudent === 'undefined') {
  isStudent = undefined;
}

if (typeof isTeacher === 'undefined') {
  isTeacher = undefined;
}

if (typeof isAdmin === 'undefined') {
  isAdmin = undefined;
}

if (typeof isElementary === 'undefined') {
  isElementary = undefined;
}

if (typeof areDifferentPeople === 'undefined') {
  areDifferentPeople = undefined;
}

if (typeof notAnElementarySchoolAdministrator === 'undefined') {
  notAnElementarySchoolAdministrator = undefined;
}

if (typeof isMiddleSchoolTeacher === 'undefined') {
  isMiddleSchoolTeacher = undefined;
}


module.exports = {
  moreThan5,
  isNewTopScore,
  isInDanger,
  isCoasting,
  isSucceeding,
  isFailing,
  isAcing,
  isStudent,
  isTeacher,
  isAdmin,
  isElementary,
  areDifferentPeople,
  notAnElementarySchoolAdministrator,
  isMiddleSchoolTeacher,
}
