import { useState,useRef } from 'react';
import { useReducer } from 'react';
import {React} from 'react';
import './App.scss';




export default function App() {

  
 function todoReduser(state=[],action){
    if(action.type === 'delet'){
     return state.filter(elem=>elem.id !== action.payload.id)
    }else if(action.type === 'push'){
      return [
        {
         id:Math.random(),
         text:action.payload.text
        },
        ...state
      ]
    }else if(action.type === 'clear'){
      return action.payload.state
    }else if(action.type === 'chek'){
       return state.filter(elem=>{
         if(elem.id === action.payload.id){
           elem.check=true
           return state
         }
         return state
       })
    }
    return state
  }
  


 const todoiniteial = [
    {
     id:Math.random(),
     text:'HTML',
     check:false
    },
    {
     id:Math.random(),
     text:'CSS',
     check:false
    },
    {
     id:Math.random(),
     text:'JAVASCRIPT',
     check:false
    },
   ]
  

  const [value,setvalue] = useState('')
  const [todo,dispatch] = useReducer(todoReduser,todoiniteial)



// *custom data-----------------------------------------------------


  const dateFullYear = () => {
    const date = new Date()
    const year = date.getFullYear()
    const mutateYear =  (year / 100).toString()
    return mutateYear[3] + mutateYear[4]
}

const [data, setData] = useState('')
const refInput = useRef(null)
const fixCardNumber = () => {
    return {
        left: (data[0] === '1' && !data[1] && !data[2] && !data[3]) && '15px' || 
        (data[0] === '1' && data[1] === '1' && data[2] === '1' && !data[3] ) && '5px' || 
        (data[0] && data[1] && !data[2] && !data[3]) && '11px' ||
        (data[0] === '1' && data[1] === '1' && !data[2] && !data[3] ) && '6px' ||
        (data[0] === '1' && data[1] !== '1' && data[2]) && '11px' ||
        (data[0] && data[1] === '1' && data[2]) && '9px' ||
        data[2] && '15px'
    }
}


  const validationExpire = (e) => {
    const year = dateFullYear()
    if(e.target.value[0] !== '1' && e.target.value[0] !== '0' && e.target.value) {
        e.target.value = '0' + e.target.value[0]
    }
    if(e.target.value[0] === '0' && e.target.value[1] === '0' && e.target.value) {
        e.target.value = '0'
    }
    if(e.target.value[0] === '1' && e.target.value[1] !== '0' && e.target.value[1] !== '1' && e.target.value[1] !== '2' && e.target.value[1]) {
        e.target.value = '0' + '1' + e.target.value[1]
    }
    if(e.target.value[5] < year[0]) {
        e.target.value = e.target.value[0] + e.target.value[1] + e.target.value[2] + e.target.value[3] + e.target.value[4] + e.target.value[5]
    }
    if(e.target.value[6] < year[1]) {
        e.target.value = e.target.value[0] + e.target.value[1] + e.target.value[2] + e.target.value[3] + e.target.value[4] + e.target.value[5] + ''
    }

    customMask(e)
}

const customMask = (event) => {
    const Value = event.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,2})/);
    setData(Value[0])
    event.target.value = !Value[2] ? Value[1] : `${Value[1]} / ${Value[2]}`;
}
 return (
   <div className="wrapper">
     <h1 className='title'>Custom ChekoBox Component</h1>
     <label className='label'>
        <input type="checkbox" className='checkbox'/>
        <span className='fake'></span>
     </label>
     <section>
     <h1 className='title'>Custom Search Component</h1>
       <form   onSubmit={(e)=>{
        e.preventDefault()
        dispatch({
        type:"push",
        payload:{
          text:value
        }
      })}}>
      <input type="text" className='search' value={value}
      onChange={(e)=>{
        setvalue(e.target.value)
      }}/>
      <div className="search__option">
      {
        todo.map((elem,index)=>{
          return<div className="search__option-item" key={elem.id}>
                            <div className="search__option-item-left">
                                  <span>{elem.text}</span>
                                </div>
                                <div className="search__option-item-right">
                                <label className='label'>
                                    <input type="checkbox" className='checkbox' onClick={(e) => {
                                dispatch({
                                    type: 'chek',
                                    payload: {
                                        id: elem.id,
                                    }
                                })
                            }}/>
                                    <span className='fake'></span>
                                </label>
                            </div>
                         </div>
        })
      }
      </div>
      </form>
     </section>
     <section>
     <h1 className='title'>Custom Data Component</h1>
     <div className='cardExpiration'>
            <div className="cardExpiration__placeholder"
                style={fixCardNumber()}
                onClick={(e) => refInput.current.focus()}
            >
                <span style={{opacity: data[0] ? 0 : 1}}>M</span>
                <span style={{opacity: data[1] ? 0 : 1}}>M</span>
                <span style={{opacity: data[2] ? 0 : 1}}>&nbsp;/&nbsp;</span>
                <span style={{opacity: data[2] ? 0 : 1}}>Y</span>
                <span style={{opacity: data[3] ? 0 : 1}}>Y</span>
            </div>
            <input  type="text" ref={refInput}
            onChange={(e) => validationExpire(e)}/>
        </div>
     </section>
   </div>
  )
}































// import {React,useState, useEffect, useRef} from 'react'
// import './App.scss'

// export default function App() {


//     const [card, setCard] = useState();
//     const inputCard = useRef();
  
//     const handleChange = () => {
//       const cardValue = inputCard.current.value.replace(/\D/g, '').match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/);
//       inputCard.current.value = !cardValue[2]
//         ? cardValue[1]
//         : `${cardValue[1]} ${cardValue[2]}${`${
//             cardValue[3] ? ` ${cardValue[3]}` : ''
//           }`}${`${cardValue[4] ? ` ${cardValue[4]}` : ''}`}`;
//       const numbers = inputCard.current.value.replace(/(\D)/g, '');
//       setCard(numbers);
//     };
  


//  return (
//    <div className="wrapper">
//       <form className='form'>
//           <div className="form__input1">
//           <input type="text" ref={inputCard} onChange={handleChange} />
//             {/* <input type="number" /> */}
//             {/* <input id="ccn" type="tel" inputmode="numeric" pattern="[0-9\s]{13,19}" autocomplete="cc-number" maxlength="19" placeholder="xxxx xxxx xxxx xxxx"></input> */}
//           </div>
//           <div className="form__input2">
//             <input type="number" />
//           </div>
//           <button type='submit'>SEND</button>
//       </form>
//    </div>
//   )
// }

