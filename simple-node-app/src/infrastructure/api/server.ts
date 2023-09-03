import ApmElastic from '../apm/apm'
import {app} from './express'
import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT || 3000

app.listen(port, () => {
    const apm = new ApmElastic("server TS")
    apm.start()  
    apm.getMiddleware()
    console.log('Server is running on port 3000')
    
})