import React, { useEffect, useState } from 'react';
import './App.css';
import axios from "axios"
import { format, subDays } from 'date-fns';
import Preloader from './preloader/Preloader';



function App() {

  let [serverData, setServerData]: any = useState()
  let [correctData, setCorrectData]: any = useState()
  let prompt: any

  useEffect(() => {
    axios.get('https://test.digitalpartnersglobal.com/test/calendar.json').then(
      response => setServerData(Object.entries(response.data)))
  }, [])

  useEffect(() => {
    if (!serverData) return
    if (correctData) return

    let year: any = []
    let today = new Date()

    for (let i = 1; i <= 357; i++) {
      let result: any = subDays(today, i)
      result = format(result, "yyyy-MM-dd")
      let value

      for (let j = 0; j < serverData.length; j++) {
        if (serverData[j][0] === result) {
          value = serverData[j][1]
          break
        } else value = 0
      }

      year = [[result, value], ...year]
      if (year.length === 357) {
        setCorrectData(year)
        break
      }
    }
  }, [serverData, correctData])


  let handleHover = (e: any, date: string, count: number | string | boolean) => {
    prompt = document.createElement('span')

    let coords = e.target.getBoundingClientRect()
    prompt.style.position = 'absolute'
    prompt.style.left = coords.left - 15 - e.target.offsetWidth + 'px'
    prompt.style.top = coords.top - 15 - e.target.offsetHeight + 'px'

    if (count === 0) prompt.innerHTML = `No contributions <div class='date'>${date}</div>`
    else if (count < 10) prompt.innerHTML = `1-9 contributions <div class='date'>${date}</div>`
    else if (count < 30) prompt.innerHTML = `${count} contributions <div class='date'>${date}</div>`
    else prompt.innerHTML = `30+ contributions <div class='date'>${date}</div>`

    prompt.classList.add('prompt')
    document.body.append(prompt)

  }

  let handleLeave = () => {
    if (prompt) {
      prompt.remove()
      prompt = null
    }
  }


  if (!correctData) return <Preloader />
  return (
    <div className="App">
      {correctData.reverse().map((arr: Array<[]> | any) => {
        return <div
          onMouseOver={(e) => { handleHover(e, arr[0], arr[1]) }}
          onMouseOut={() => { handleLeave() }}
          className={
            arr[1] === 0 ? 'square' :
              arr[1] < 10 && arr[1] > 0 ? 'square10' :
                arr[1] < 20 && arr[1] > 9 ? 'square20' :
                  arr[1] < 30 && arr[1] > 19 ? 'square30' : 'square30+'}>
        </div>
      })}
    </div>
  );
}

export default App;
