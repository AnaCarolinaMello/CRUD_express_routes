
const express = require('express')
const app = express()
const fs = require('fs')

app.use(express.json());

exports.exibirTodos = async (req,res)=>{
    try{
        const notas = JSON.parse(await fs.readFileSync("models/grades.json"))
        res.send(notas.grades)
        console.log("Todas as notas")
    }catch(err){
        console.log(err)
    }
}
exports.enviarNotas = async (req, res) =>{
    try{
        let nota = req.body;
        if(nota.student == null || nota.subject == null || nota.type == null || nota.value == null){
            console.log("Dados obrigatórios faltando");
            res.send("Dados obrigatórios faltando");
            res.end()
        }else{
            const notas = JSON.parse(await fs.readFileSync("models/grades.json"))
            nota = {
                id: notas.nextId++,
                student: nota.student,
                subject: nota.subject,
                type: nota.type,
                value: nota.value,
                timestamp: new Date()
            }
            notas.grades.push(nota)

            await fs.writeFileSync("models/grades.json",JSON.stringify(notas,null,2))

            res.send(nota)
            console.log("Nota do trabalho adicionada")
        }

    }catch(err){
        console.log(err)
    }
}

exports.getUmaNota = async (req,res) =>{
    try{
        const notas = JSON.parse(await fs.readFileSync("models/grades.json"))
        const index = notas.grades.findIndex(a => a.id === parseInt(req.params.id));
        if(index == -1){
            res.send("Registro inexistente")
            res.end()
        }else{
            const nota = notas.grades.find(
                n => n.id === parseInt(req.params.id)
            )
            res.send(nota)
            console.log("Nota do trabalho de um aluno")
        }
    }catch(err){
        console.log(err)
    }
}

exports.deletarUmaNota = async (req,res) =>{
    try{
        const notas = JSON.parse(await fs.readFileSync("models/grades.json"))
        const index = notas.grades.findIndex(a => a.id === parseInt(req.params.id));
        if(index == -1){
            res.send("Registro inexistente")
            res.end()
        }else{
            notas.grades = notas.grades.filter(
                nota => nota.id !== parseInt(req.params.id)
            )
            
            await fs.writeFileSync("models/grades.json",JSON.stringify(notas,null,2))
            console.log(`Nota deletada`)
            res.send(`Nota deletada`)
            res.end()
        }
    }catch(err){
        console.log(err)
    }
}

exports.alterarUmaNota = async (req,res) =>{
    try{
        let notaAlterar = req.body;
        if(notaAlterar.student == null || notaAlterar.subject == null || notaAlterar.type == null || notaAlterar.value == null){
            console.log("Dados obrigatórios faltando");
            res.send("Dados obrigatórios faltando")
            res.end()
        }else{
            const notas = JSON.parse(await fs.readFileSync("models/grades.json"))
            const index = notas.grades.findIndex(a => a.id === parseInt(req.params.id));
            if(index == -1){
                res.send("Registro inexistente")
                res.end()
            }else{
                const idNota = notas.grades.find(
                    n => n.id === parseInt(req.params.id)
                )
                notas.grades[index].student = notaAlterar.student
                notas.grades[index].subject = notaAlterar.subject
                notas.grades[index].type = notaAlterar.type
                notas.grades[index].value = notaAlterar.value

                await fs.writeFileSync("models/grades.json",JSON.stringify(notas,null,2))
                res.send(idNota)
                console.log(`Nota altualizada`)
            }
        }
    }catch(err){
        console.log(err)
    }
}

exports.mostrarAluno = async (req,res) =>{
    try{
        const notas = JSON.parse(await fs.readFileSync("models/grades.json"))
        const index = notas.grades.findIndex(a => a.student === req.params.student);
        if(index == -1){
            res.send("Registro inexistente")
            res.end()
        }else{
            const nota = notas.grades.filter(
                n => n.student === req.params.student
            )
            res.send(nota)
            console.log("Notas de um aluno")
        }
    }catch(err){
        console.log(err)
    }
}

exports.getNotaFinal = async(req,res)=>{
    const notas = JSON.parse(await fs.readFileSync("models/grades.json"))
    const index = notas.grades.findIndex(a => a.student === req.params.student);
    const index2 = notas.grades.findIndex(a => a.subject === req.params.subject);
    if(index == -1 || index2 == -1){
        res.send("Registro inexistente")
        res.end()
    }else{
        const aluno = notas.grades.filter(
            n => n.student === req.params.student
        )
        const materiaAluno = aluno.filter(
            n => n.subject === req.params.subject
        )
        let notaFinal = 0;
        materiaAluno.forEach(value => {
            notaFinal+= parseInt(value.value)
        });
        console.log(`Nota final`)
        res.send(`Aluno: ${req.params.student} | Matéria: ${req.params.subject} | Nota final: ${notaFinal}`)
    }
}

exports.getMedia = async(req,res)=>{
    const notas = JSON.parse(await fs.readFileSync("models/grades.json"))
    const index = notas.grades.findIndex(a => a.student === req.params.student);
    const index2 = notas.grades.findIndex(a => a.subject === req.params.subject);
    if(index == -1 || index2 == -1){
        res.send("Registro inexistente")
        res.end()
    }else{
        const aluno = notas.grades.filter(
            n => n.student === req.params.student
        )
        const materiaAluno = aluno.filter(
            n => n.subject === req.params.subject
        )
        let notaFinal = 0;
        let quantAtv = 0;
        materiaAluno.forEach(value => {
            notaFinal+= parseInt(value.value)
            quantAtv ++
        });
        let media = notaFinal/quantAtv;
        media = media.toFixed(2)
        console.log(`Nota média`)
        res.send(`Aluno: ${req.params.student} | Matéria: ${req.params.subject} | Média: ${media}`)
    }
}

exports.getmelhoresNotas = async(req,res)=>{
    const notas = JSON.parse(await fs.readFileSync("models/grades.json"))
    const index = notas.grades.findIndex(a => a.student === req.params.student);
    const index2 = notas.grades.findIndex(a => a.subject === req.params.subject);
    if(index == -1 || index2 == -1){
        res.send("Registro inexistente")
        res.end()
    }else{
        const aluno = notas.grades.filter(
            n => n.student === req.params.student
        )
        const materiaAluno = aluno.filter(
            n => n.subject === req.params.subject
        ) 
        let melhoresNotas = [];
        let quantAtv = 0;
        let testemaior = 0;
        let naorepitir = 0;
        materiaAluno.forEach(value => {
            if(quantAtv < 3){
                melhoresNotas.push(value.value)
            }else{
                melhoresNotas.forEach(element =>{
                    if(value.value > element){
                        if(naorepitir == 0){
                            melhoresNotas.splice(testemaior,1,value.value)
                            naorepitir = 1;
                        }
                    }
                    testemaior++
                })
                testemaior = 0
                naorepitir = 0
            }
            melhoresNotas.sort(function (a, b) {
                return a - b;
              });
            quantAtv ++
        });
        melhoresNotas.sort(function (a, b) {
            return b - a;
          }); 
        console.log(`3 melhores notas`)
        res.send(`Aluno: ${req.params.student} | Matéria: ${req.params.subject} | 3 maiores notas: ${melhoresNotas}`)
    }
}

exports.getmelhoresAlunos = async(req,res)=>{
    const notas = JSON.parse(await fs.readFileSync("models/grades.json"))
    const index = notas.grades.findIndex(a => a.subject === req.params.subject);
    if(index == -1){
        res.send("Registro inexistente")
        res.end()
    }else{
        // const aluno = notas.grades.filter(
        //     n => n.student === req.params.student
        // )
        let materiaAluno = notas.grades.filter(
            n => n.subject === req.params.subject
        )
        let alunos = [];
        let alunosFinal = []
        let quantAluno = 0;
        materiaAluno.forEach(data =>{
            if(quantAluno == 0){
                alunos.push(data.student)
            }else{
                alunos.push(data.student)
            }
            
            quantAluno++
        })
        alunos = alunos.filter(function(este, i) {
            return alunos.indexOf(este) === i;
        });
        let alunoNota
        let notaFinal = 0
        let notaTeste = 0
        let cont = 0
        let contTeste = 0;
        let seguranca = 0
        alunos.forEach(dado =>{
            alunoNota = materiaAluno.filter(
                n => n.student === dado
            );
            alunoNota.forEach(value => {
                notaFinal+= parseInt(value.value)
            });
            if(alunosFinal.length == 0){
                alunosFinal.push({nome: dado, nota: notaFinal}) 
            }else 
            alunosFinal.forEach(value =>{
                if(notaFinal > value.nota){
                    if(seguranca == 0){
                        alunosFinal.splice(contTeste, 0 ,{nome: dado, nota: notaFinal})
                        seguranca = 1
                    }
                }
                if(contTeste == alunosFinal.length){
                    alunosFinal.push({nome: dado, nota: notaFinal})
                }
                contTeste++
            })
            seguranca = 0
            notaFinal = 0
            contTeste = 0
            cont++
        })
        alunosFinal.length = 3
        let alunosDefinitivos = []
        alunosFinal.forEach(value =>{
            alunosDefinitivos.push(value.nome)
        })
        let aluno1
        let aluno2
        let aluno3
        let controleAluno = 1
        let melhoresNotas = [];
        let quantAtv = 0;
        let testemaior = 0;
        let naorepitir = 0;
        
        alunosDefinitivos.forEach(data=>{
            materiaAluno = materiaAluno.filter(
                n => n.student === data
            )
            materiaAluno.forEach(value => {
                if(quantAtv < 3){
                    melhoresNotas.push(value.value)
                }else{
                    melhoresNotas.forEach(element =>{
                        if(value.value > element){
                            if(naorepitir == 0){
                                melhoresNotas.splice(testemaior,1,value.value)
                                naorepitir = 1;
                            }
                        }
                        testemaior++
                    })
                    testemaior = 0
                    naorepitir = 0
                }
                melhoresNotas.sort(function (a, b) {
                    return a - b;
                  });
                quantAtv ++
            });
            melhoresNotas.sort(function (a, b) {
                return b - a;
            }); 
            if(controleAluno == 1){
                aluno1 = `Aluno: ${data} | Matéria: ${req.params.subject} | 3 maiores notas: ${melhoresNotas} || `
            }else if(controleAluno == 2){
                aluno2 = `Aluno: ${data} | Matéria: ${req.params.subject} | 3 maiores notas: ${melhoresNotas} || `
            }else{
                aluno3 = `Aluno: ${data} | Matéria: ${req.params.subject} | 3 maiores notas: ${melhoresNotas}`
            }
            materiaAluno = notas.grades.filter(
                n => n.subject === req.params.subject
            )
            controleAluno++
            melhoresNotas = [];
            quantAtv = 0;
            testemaior = 0;
            naorepitir = 0
        })
        console.log(`3 melhores notas`)
        res.send(`${aluno1} ${aluno2} ${aluno3}`)

    }
}