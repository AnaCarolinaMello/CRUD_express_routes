
const express = require('express')
const app = express()
const router = express.Router()
const { reset } = require('nodemon')
const controller = require('../controller/gradesController')
const cors = require('cors')

router.get('/', controller.exibirTodos)
router.post('/',controller.enviarNotas)
router.get('/:id',controller.getUmaNota)
router.delete('/:id',controller.deletarUmaNota)
router.patch('/:id',controller.alterarUmaNota)
router.get('/aluno/:student',controller.mostrarAluno)
router.get('/notaFinal/:student/:subject',controller.getNotaFinal)
router.get('/media/:student/:subject',controller.getMedia)
router.get('/3melhoresNotas/:student/:subject',controller.getmelhoresNotas)
router.get('/3melhoresAlunos/:subject',controller.getmelhoresAlunos)

module.exports = router