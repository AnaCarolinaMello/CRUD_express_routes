const swaggerDocument =
{
    "swagger": "2.0",
    "info": {
        "description": "Api Nota Alunos",
        "version": "1.0.0",
        "title": "Api Notas"
    },
    "host": "localhost:3000",
    "tags": [
        {
            "name": "grades",
            "description": "Notas"
        }
    ],
    "paths": {
        "/": {  
            "get": {
                "tags": [
                    "grades"
                ],
                "summary": "Mostrar todas as notas",
                "description": "Mostrar todas as notas",
                "produces": [
                    "application/json"
                ],
                "responses": {
                    "200": {
                        "description": "Sucesso",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/exemploGet/Grades"
                            }
                        }
                    },
                    "400": {
                        "description": "Erro"
                    }
                }
            },
            "post": {
                "tags": [
                    "grades"
                ],
                "summary": "Enviar notas",
                "description": "Enviar notas",
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Grades object",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/Grades"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Nota criada"
                    },
                    "400": {
                        "description": "Erro"
                    }
                }
            },
        },
        "/:id": {
            "get": {
                "tags": [
                    "grades"
                ],
                "summary": "Mostrar uma nota pelo id",
                "description": "Mostrar uma nota pelo id",
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "in": "path",
                        "name": "id",
                        "description": "Id",
                        "required": true,
                        "type": "integer",
                        "schema": {
                            "$ref": "#/exemploGet/Grades"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Sucesso",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/exemploGet/Grades"
                            }
                        }
                    },
                    "400": {
                        "description": "Erro"
                    }
                }
            },
            "delete": {
                "tags": [
                    "grades"
                ],
                "summary": "Deletar uma nota pelo id",
                "description": "Deletar uma nota pelo id",
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "in": "path",
                        "name": "id",
                        "description": "Id",
                        "required": true,
                        "type": "integer"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Nota deletada"
                    },
                    "400": {
                        "description": "Erro"
                    }
                }
            },
            "patch": {
                "tags": [
                    "grades"
                ],
                "summary": "Modificar uma nota pelo id",
                "description": "Modificar uma nota pelo id",
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Grades object",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/Grades"
                        }
                    },
                    {
                        "in": "path",
                        "name": "id",
                        "description": "Id",
                        "required": true,
                        "type": "integer"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Nota modificada"
                    },
                    "400": {
                        "description": "Erro"
                    }
                }
            }
            
        },
        "/aluno/:student": {
            "get": {
                "tags": [
                    "grades"
                ],
                "summary": "Mostrar um aluno pelo nome",
                "description": "Mostrar um aluno pelo nome",
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "in": "path",
                        "name": "student",
                        "description": "Student",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Sucesso",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/exemploGet/Grades"
                            }
                        }
                    },
                    "400": {
                        "description": "Erro"
                    }
                }
            }
        },
        "/notaFinal/:student/:subject": {
            "get": {
                "tags": [
                    "grades"
                ],
                "summary": "Mostrar a nota final de um aluno em uma matéria",
                "description": "Mostrar a nota final de um aluno em uma matéria",
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "in": "path",
                        "name": "student",
                        "description": "Student",
                        "required": true,
                        "type": "string"
                    },
                    {
                        "in": "path",
                        "name": "subject",
                        "description": "Subject",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Aluno: Jorge | Matéria: Matemática | Nota final: 60"
                    },
                    "400": {
                        "description": "Erro"
                    }
                }
            }
        },
        "/media/:student/:subject": {
            "get": {
                "tags": [
                    "grades"
                ],
                "summary": "Mostrar a média de um aluno em uma matéria",
                "description": "Mostrar a média de um aluno em uma matéria",
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "in": "path",
                        "name": "student",
                        "description": "Student",
                        "required": true,
                        "type": "string"
                    },
                    {
                        "in": "path",
                        "name": "subject",
                        "description": "Subject",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Aluno: Jorge | Matéria: Matemática | Média: 7"
                    },
                    "400": {
                        "description": "Erro"
                    }
                }
            }
        },
        "/3melhoresNotas/:student/:subject": {
            "get": {
                "tags": [
                    "grades"
                ],
                "summary": "Mostrar as 3 melhores notas de um aluno em uma matéria",
                "description": "Mostrar as 3 melhores notas de um aluno em uma matéria",
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "in": "path",
                        "name": "student",
                        "description": "Student",
                        "required": true,
                        "type": "string"
                    },
                    {
                        "in": "path",
                        "name": "subject",
                        "description": "Subject",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Aluno: Jorge | Matéria: Matemática | 3 maiores notas: 34,24,24"
                    },
                    "400": {
                        "description": "Erro"
                    }
                }
            }
        },
        "/3melhoresAlunos/:subject": {
            "get": {
                "tags": [
                    "grades"
                ],
                "summary": "Mostrar as 3 melhores notas dos 3 melhores alunos de uma matéria",
                "description": "Mostrar as 3 melhores notas dos 3 melhores alunos de uma matéria",
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "in": "path",
                        "name": "subject",
                        "description": "Subject",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Aluno: Jorge | Matéria: Matemática | 3 maiores notas: 34,24,24 || Aluno: Mauro | Matéria: Matemática | 3 maiores notas: 31,24,14 || Aluno: Márcia | Matéria: Matemática | 3 maiores notas: 32,14,10"
                    },
                    "400": {
                        "description": "Erro"
                    }
                }
            }
        }
    },
    "definitions": {
        "Grades": {
            "type": "object",
            "properties": {
                "student": {
                    "type": "string",
                    "example": "Jorge"
                },
                "subject": {
                    "type": "string",
                    "example": "Matemática"
                },
                "type": {
                    "type": "string",
                    "example": "Trabalho prático"
                },
                "value": {
                    "type": "integer",
                    "example": 6
                }
            }
        }
    },
    "exemploGet": {
        "Grades": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "integer",
                    "example": 41
                },
                "student": {
                    "type": "string",
                    "example": "Jorge"
                },
                "subject": {
                    "type": "string",
                    "example": "Matemática"
                },
                "type": {
                    "type": "string",
                    "example": "Trabalho prático"
                },
                "value": {
                    "type": "integer",
                    "example": 6
                },
                "timestamp": {
                    "type": "string",
                    "example": "2020-05-19T18:21:24.981Z"
                }
                
            }
        }
    }
};

module.exports = swaggerDocument