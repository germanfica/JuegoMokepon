const express = require("express")
const app = express()
const cors = require("cors")

app.use(cors())
app.use(express.json())



const jugadores = []

class Jugador {
    constructor(id){
        this.id = id
    }

    asignarMokepon(mokepon) {
        this.mokepon = mokepon
    }

    actualizarPosicion(x, y){
        this.x = x
        this.y = y
    }
}

class Mokepon {
    constructor (nombre){
        this.nombre = nombre
    }
}

//Creo un endPoint
app.get("/unirse", (req, res)=> {
    const id = `${Math.random()}`

    const jugador = new Jugador(id)

    jugadores.push(jugador)
    
    res.setHeader("Access-Control-Allow-Origin", "*")

    res.send(id)
})

app.post("/mokepon/:jugadorId", (req,res) => {
    const jugadorId = req.params.jugadorId || ""    //Capturamos parametros de URL
    const nombre = req.body.mokepon || "yo te invoco"   //Capturamos el cuerpo de la solicitud
    const mokepon = new Mokepon(nombre)
    
    const jugadorIndex =  jugadores.findIndex((jugador) => jugadorId === jugador.id)
    
    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarMokepon(mokepon)
    }
    
    console.log(jugadorId)
    console.log(jugadores)
    res.end()
}) 

app.post("/mokepon/:jugadorId/posicion", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0

    const jugadorIndex =  jugadores.findIndex((jugador) => jugadorId === jugador.id)
    
    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].actualizarPosicion(x, y)
    }

    res.end()
})


app.listen(8080, () => {
    console.log('Servidor Funcionando')
})  