const user_input = require("prompt-sync")({sigint: true});

function add_subject_validation(answer){
    if (answer == 's' || answer == 'S'){
        return 'true';
    }
    else if (answer == 'n' || answer == 'N'){
        return 'false';
    }
    else{
        return 'invalid';
    }
}

function get_subjects(){
    let subject_list = [];

    do{
        subject = user_input("Adicionar matéria: ");
        subject_list.push(subject);
    }while(subject_list.length < 3);

    while(true){
        answer = user_input("Deseja adicionar mais matérias? (s/n) ");
        if(add_subject_validation(answer) == 'true'){
            subject = user_input("Adicionar matéria: ");
            subject_list.push(subject);
        }
        else if(add_subject_validation(answer) == 'false'){
            break;
        }
        else{
            console.log('Opa. Algo deu errado.');
            continue;
        }
    };

    return subject_list;
}

function add_grade_validation(grade){
    if(typeof grade != 'number' || Number.isNaN(grade)){
        return false
    }

    return true;
}

function get_grades(subject){
    let grades = [];
    
    while(grades.length < 3){
        grade = +user_input(`Digite uma nota de ${subject}: `);
        if (add_grade_validation(grade)){
            grades.push(grade);
            console.log(`Notas de ${subject}: [${grades}]`);
        }
        else {
            console.log('Opa. Algo deu errado.');
        }
    }

    return grades;
}

function mean_grade(grades){
    let mean = 0;
    grades.forEach((grade) => {
        mean += grade;
    });
    mean /= 3;

    return mean.toFixed(2);
}

function mean(subjects){
    subjects.forEach((subject) => {
        subject['mean'] = mean_grade(subject.grades);
    });
}

const name = user_input("Digite o nome do aluno: ");
console.log(`Boletim de ${name}`);

const subject_list = get_subjects();
console.log(`Matérias = ${subject_list}`);

var subject_info = [];

subject_list.forEach((subject) => {
    subject_info.push({
        subject: subject,
        grades: get_grades(subject)
    });
});

console.log(`Médias de ${name}: `)
mean(subject_info);