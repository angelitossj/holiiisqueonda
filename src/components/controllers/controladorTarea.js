const Tareas = require("../models/modeloTarea")

const CtrlTarea = {}

CtrlTarea.getTarea = async (req, res) => {
    try {
        const tasks = await Tareas.find({
            active: true
        })

        return res.json({
            message: "Tarea encontrado con exito",
            tasks
        })


    } catch (error) {

    }


}
CtrlTarea.getTareaIdUser = async (req, res) => {
    try {
        const idUser = req.user._id
        console.log(idUser)
        if (!idUser){
            return res.json({
                message:"no viene el id del usuario"
            })
        }
        const tasks = await Tareas.find({
                idUser,isActive:true
            })
            .populate('idUser', ['usuario',"password"])

        if (!tasks.length) {
            return res.status(404).json({
                message: "no se encontraron tareas con ese usuario"
            })
        }

        return res.json({
            tasks
        })

    } catch (error) {
        res.status(500).json({
            message: "No se pudo obtener las tareas",
            errorBody: error.message
        })
    }

}

CtrlTarea.postTarea = async (req, res) => {
    try {
        const idUser = req.user._id
        const {
            titulo,
            descripcion,
            estado,
            
        } = req.body
        if (!idUser || !titulo || !descripcion || !estado) {
            return res.status(400).json({
                message: "La informacion proporcionada es incorrecta"
            })
        }

        const newTask = new Tareas({
            idUser,
            titulo,
            descripcion,
            estado
        })
        const tareaRegistrada=await newTask.save()

        return res.status(201).json({
            message:"La tarea fue registrada con  exito",
            tareaRegistrada
        })

    } catch (error) {
        res.status(401).json({
            message:"No se pudo generar la tarea",
            errorBody:error.message,
            errorName:error.name
        })
    }
}

CtrlTarea.putTarea =async (req,res) => {
try {
    const idTarea=req.params.idTarea
    const idUser=req.user._id
const{titulo,descripcion,estado}=req.body
if(!idUser||!titulo||!descripcion||!estado){
    return res.status(401).json({
        message:"La informacion dada es incorrecta"
    })
}
const tarea=await Tareas.findById(idTarea)
const userIdString=idUser.toString()
const tareaIdString=tarea.idUser.toString()
if (!((userIdString === tareaIdString )||req.user.role==='admin_user'))
{
    return res.status(403).json({message:"No tiene permiso para editar la tarea"})
}
const complete = Tareas.findById(idUser,{estado})

if(complete="completado"){
    return res.json({
        message:"la tarea ya ha sido completada"
    })
}

await tarea.updateOne({titulo,descripcion,estado})
return res.status(201).json({message:"la tarea fue modificada con exito"})
 
}


catch (error) {
}

}

CtrlTarea.deleteTarea = async(req,res) => {
try {
    const idUser=req.user._id
    const idTarea=req.params.idTarea
    const tareas= await Tareas.findOne({$and:[{_id:idTarea},{isActive:true}]})
if (!tareas || !tareas.isActive){
res.status(404).json({message:"No existe la tarea"})

}
    const userIdString=idUser.toString()//recibo el ID que me pasa el validateJWT y lo convierto a STRING
const tareaIdString=tareas.idUser.toString()//recibo la propiedad idUser de la Task y lo convierto a STRING para luego comparar
if (!((userIdString === tareaIdString )||req.usuario.role==='admin_user'))
{
    res.status(500).json({
        message:"no posee permiso para eliminar esta tarea",
        
    })
}
await tareas.updateOne({isActive:false})
return res.status(201).json({message:"la tarea fue eliminada con exito"})
 

} catch (error) {
    res.status(401).json({
        message:"hubo un error al eliminar la tarea",
        error:error.message
    })
}


}

module.exports = CtrlTarea