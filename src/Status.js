import React , {useState,useContext,useEffect}from 'react'
import {AccountContext} from './Account'
export default function Status() {
    const [status,setStatus] = useState(false)
    const {getSession} = useContext(AccountContext)

    useEffect(()=> {
        getSession().then(session=> {
            console.log(`Session:`,session)

            setStatus(true)
        })
    },[])
 console.log("is logged in",status)
}
