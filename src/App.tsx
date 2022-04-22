import React, { useEffect, useState } from 'react';
import './App.css';
import axios from "axios"
import { format, subDays } from 'date-fns';



function App() {

  let [serverData, setServerData]:any = useState()
  let [correctData, setCorrectData]:any = useState()
  debugger
  useEffect(() => {
    axios.get('https://test.digitalpartnersglobal.com/test/calendar.json').then(
      response => setServerData(Object.entries(response.data)))
  },[])

  useEffect(() => {
    if (!serverData) return
    if (correctData) return
  let year:any = []
  let today = new Date()

   for (let i = 1 ; i <= 357; i++){
    
    let result:any = subDays(today, i)
    result = format( result,"yyyy-MM-dd" )
  
    let value
  
  
    for (let j = 0; j< serverData.length; j++){
  
      if (serverData[j][0] === result){
        value = serverData[j][1]
        break
      }
      else value = 0 
    }
  
    year = [[result,value] , ...year ]
    if (year.length === 357) {
      setCorrectData(year)
      break
    }
  }
  },[serverData])



  if (!correctData) return <div>loading...</div>
  return (
    <div className="App">
      {correctData.reverse().map( (arr:Array<[]>| any) => {
        debugger
        return <div
          className={
            arr[1] == 0? 'square' :
            arr[1] < 10 && arr[1] > 0 ? 'square10' :
            arr[1] < 20 && arr[1] > 9 ? 'square20' :
            arr[1] < 30 && arr[1] > 19 ? 'square30' : 'square30+' 
          }
          >
          {arr[0]}
        </div>

         } )}
    </div>
  );
}

export default App;
