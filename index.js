import 'dotenv/config'
import express from 'express'
import logger from './logger.js'; 
import morgan from 'morgan'

const app=express()


const port=process.env.PORT||3000

app.use(express.json())

const morganFormat = ':method :url :status :res[content-length] - :response-time ms'; // Customize format

app.use(morgan(morganFormat, { stream: logger.stream }));


let teaData=[]
let nextID=1;

// add a new tea
app.post('/teas',(req,res)=>{
	logger.info("A post request method to add a new tea")
		const {name,price}=req.body;
		const newTea={id:nextID++,name,price}
		teaData.push(newTea)
		res.status(201).send(newTea)
})

// get all tea
app.get('/teas',(req,res)=>{
	res.status(200).send(teaData)
})

// get a tea with id
app.get('/teas:id',(req,res)=>{
		const tea=teaData.find(t=>t.id===parseInt(req.params.id))
		if(!tea){
			res.status(404).send('Hi tea not found');
		}
		res.status(200).send(tea)
})

// update tea

app.put('/teas/:id',(req,res)=>{

	const tea=teaData.find(t=>t.id===parseInt(req.params.id))
	if(!tea){
		res.status(404).send('Tea not found');
	}
	const {name,price}=req.body
	tea.name=name;
	tea.price=price;
	res.send(200).send(tea)
})
// delete tea
app.delete('/teas/:id',(req,res)=>{
	const index=teaData.findIndex(t=>t.id===parseInt(req.params.id));
	if(index===-1){
		return res.status(404).send('tea not found');
	}
	teaData.splice(index,1);
	return res.status(204).send('deleted');
})



app.listen(port,()=>{
	console.log('Server is running at port:',port);
	
})