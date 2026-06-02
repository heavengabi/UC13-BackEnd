import express from 'express'
/**
 cria obj express
 atraves dele vamos ter acesso a metados que nos permitem
 cria nosso servidor
 */
const app = express()
const PORTA = 3000;

//receber e enviar dados json
app.use(express.json())

//criar primeira rota que chama quando chama faz uma requisição
//rota pra pegar um informação
//2 parametros
//1 éo caminho
//2 é uma funçcoa que é chamada quando acessar a rota

app.get("/servidor", (req, res)=>{
    //res.status(200) = servidor vai enviar um codigo de sucesso
    //send é o que envia a mensagem
    res.status(200).send("Servidor rodando! Xablau🙌")
})

//listen inicia o servidor
//a funcao listen precisa de dois parametros
//1 porta
//2 funcao que vai chamar quando o server rodar
app.listen(PORTA, ()=>{
    console.log('Servidor no ar! ebaaa')
})

//http://localhost:3000/servidor

app.get("/nome", (req, res)=>{
    //res.status(200) = servidor vai enviar um codigo de sucesso
    //send é o que envia a mensagem
    res.status(200).send("Gabriela")
})