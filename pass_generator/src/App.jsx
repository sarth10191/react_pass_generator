import { useState, useEffect,useRef} from 'react'
import { useCallback } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [specialchar, setSpecialChar] = useState(false)
  const [password, setPassword] = useState("")
  //ref hook
  const passwordref = useRef(null)
  const passwordGenerator =useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxvz"
    if (number) {
      str+= "0123456789"
    }
    if (specialchar) {
      str+= "!@#$%&%*+=_-[]{}~"
    }
    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)      
    }
    setPassword(pass)
  } , [length, number, specialchar, setPassword])

  const copyPasswordToClipBoard = useCallback(()=>{
    passwordref.current?.select();
    passwordref.current?.setSelectionRange(0, 2)
    window.navigator.clipboard.writeText(password)}, [password])
  useEffect(()=>{passwordGenerator()}, [length, number, specialchar, passwordGenerator])
  return (
    <>
      <div className='w-full text-center max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>
        Password Generator
        <div className="flex shadow rounded-lg mt-4 overflow-hidden">
          <input 
          type="text"
          value={password}
          className=' text-balck-900 outline-none w-full py-3 px-3'
          placeholder='password'
          readOnly
          ref={passwordref}
          />
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          onClick={copyPasswordToClipBoard}>Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className='flex items-center gap-x-1'>
            <input type="range" min={6} max={20} value={length} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)} } />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox"
            defaultChecked={number}
            id="numberInput"
            onChange={()=>setNumber((prev)=>!prev)} />
            <label>Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox"
            defaultChecked={specialchar}
            id="numberInput"
            onChange={()=>setSpecialChar((prev)=>!prev)} />
            <label>Chars</label>
          </div>
        </div>
      </div>
    </>
  ) 
}

export default App
