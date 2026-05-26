const btn = document.getElementById("gerar-piada")
const p = document.getElementById("joke")

btn.addEventListener("click", async ()=>{
    try{
   //tente pegar os dados da API 
    const response = await fetch("https://v2.jokeapi.dev/joke/Any")

    const data = await response.json()

    p.textContent = data.joke

    }
    catch(erro) //se der ruim, me diz o pq nao foi
    {
        console.log("Deu ruim, porque: " + erro)
    }
})