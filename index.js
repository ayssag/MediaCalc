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
        subject = user_input("+ Adicionar matéria: ");
        subject_list.push(subject);
    }while(subject_list.length < 3);

    while(true){
        answer = user_input(">>> Deseja adicionar mais matérias? (s/n) ");
        if(add_subject_validation(answer) == 'true'){
            subject = user_input("+ Adicionar matéria: ");
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

function add_missing_classes_validation(number){
    if(typeof grade != 'number' || Number.isNaN(grade) || number < 0){
        console.log('Opa. Algo deu errado.');
        return false;
    }

    return true;
}

function get_grades(subject){
    let grades = [];
    
    while(grades.length < 3){
        grade = +user_input(`>>> Digite uma nota de ${subject}: `);
        if (add_grade_validation(grade)){
            grades.push(grade);
        }
        else {
            console.log('Opa. Algo deu errado.');
        }
    }
    console.log('========================================')
    return grades;
}

function mean_grade(grades){
    let mean = 0;
    grades.forEach((grade) => {
        mean += grade;
    });
    mean /= 3;

    return parseFloat(mean.toFixed(2));
}

function mean(subjects){
    subjects.forEach((subject) => {
        subject['mean'] = mean_grade(subject.grades);
    });
}

function get_missing_classes(subjects){
    subjects.forEach((subject) => {
        do{
            missing_classes = +user_input(`>>> Número de faltas em ${subject.subject}: `)
        }while(!add_missing_classes_validation(missing_classes));
        subject['missing_classes'] = missing_classes;
    });

    return subjects;

}

const name = user_input(">>> Digite o nome do aluno: ");

const subject_list = get_subjects();
console.log(`========================================
Matérias = ${subject_list}
========================================`);

var subject_info = [];

subject_list.forEach((subject) => {
    subject_info.push({
        subject: subject,
        grades: get_grades(subject)
    });
});

function check_aprovation(subjects){
    let approved;

    subjects.forEach((subject) => {
        if (subject.missing_classes > 5 || subject.mean < 6.0){
            approved = false;
        }
        else{
            approved = true;
        }
        subject['approved'] = approved;
    });

    return subjects;
}

mean(subject_info);

subject_info = get_missing_classes(subject_info);

subject_info = check_aprovation(subject_info);

var boletim = `
    \t========================================
    \t\tBoletim ${name}
    \t========================================`;

subject_info.forEach((subject) => {
    boletim += `\n\tMédia ${subject.subject}: ${subject.mean}\t| Faltas: ${subject.missing_classes}`;
    if (subject.approved){
        boletim += `\n\tAprovado(a)`;
    }
    else{
        boletim += `\n\tRecuperação`;
    }
    boletim += `\n\t========================================`;
});

console.log(boletim);
