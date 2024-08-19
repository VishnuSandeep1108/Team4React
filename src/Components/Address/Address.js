import React, { useState } from 'react'
import {useForm} from "react-hook-form"
import './Address.css'

function Address() {

    const [Address, setAddress] = useState({});
    const form=useForm();
    const { register, handleSubmit, formState } = form;
    const { errors } = formState;
    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setAddress(values => ({...values, [name]: value}))
    }
  
    const whenSubmit = (event) => {
      event.preventDefault();
      console.log({Address})
    }
  
    return (
      <div className='container-fluid'>
        <div className='row justify-content-center'>
            <div className='col-lg-12 col-md-8'>
                <div className='add-page'>
                <form onSubmit={handleSubmit(whenSubmit)} className='form-floating' noValidate >
        <div className='contact'>
            <div className='col-lg-12'>
            <h3>Contact Details</h3>
        <input 
          type="text"
          className='form-control'
          {...register("name",{
            required : {
                value:true,
                message:"Name is a required field."
            },
            minLength:{
               value:5,
               message:"Name should contain minimum 5 characters."
            }
          })} 
          name="name" 
          id="name"
          placeholder='Name*'
          value={Address.name || ""} 
          onChange={handleChange}
          
        /> <span><p className='alert'>{errors.name?.message}</p></span></div>
          <input 
            type="number" 
            name="num" 
            className='form-control'
            placeholder='Mobile No.*'
            value={Address.num || ""}
            id="num"
            {...register("num",{
                required : {
                    value:true,
                    message:"Mobile Number is a required field."
                },
                pattern:{
                   value:/^[6-9]{1}[0-9]{9}$/ ,
                   message:"The number doesn't match the required format."
                }
              })} 
            onChange={handleChange}
            required
          />
          <span><p className='alert' >{errors.num?.message}</p></span>
      </div>
      <div className='address'>
        <h3>Address Details</h3>
      <input 
          type="text" 
          name="pincode"
          className='form-control' 
          placeholder='Pincode*'
          value={Address.pincode || ""}
          {...register("pincode",{
            required : {
                value:true,
                message:"Pincode is a required field."
            },
            pattern:{
               value:/^[1-9]{1}[0-9]{5}$/,
               message:"The pincode doesn't match the required format."
            }})}
          id="pincode"
          onChange={handleChange}
          
        />
        <span><p className='alert'>{errors.pincode?.message}</p></span> 
        <input 
          type="text" 
          id="address"
          className='form-control'
          name="address" 
          placeholder='Address(House No, Building ,Street ,Area)*'
          value={Address.address ||""} 
          onChange={handleChange}
          {...register("address",{
            required : {
                value:true,
                message:"Address is a required field."
            }
           })}
        />
        <span><p className='alert'>{errors.address?.message}</p></span> 
        <input 
          type="text" 
          name="city" 
          id="city"
          className='form-control'
          placeholder='City*'
          value={Address.city || ""} 
          onChange={handleChange}
          {...register("city",{
            required : {
                value:true,
                message:"City is a required field."
            }
           })}
        />
        <span><p className='alert'>{errors.city?.message}</p></span> 

      </div>
      <button type="submit" className='button'>Proceed</button>
      </form>
                </div>
            </div>
        </div>
    
      </div>
    )





}

export default Address







//     const [ContactForm,setContactForm]=useState({
//          name:'',
//          number:''
//     })

//     const handleChange=(e)=>{
//         setContactForm(ContactForm.name.append(e.target.value))
//         console.log({ContactForm})
//     }

//     const handleSubmit=(e)=>{
//         e.preventDefault();
//         console.log({ContactForm})
//     }
//   return (
//     <div>
//         <div className='contact' >
//         <h3>Contact Details</h3>
//         <form className='contactForm' onSubmit={(e)=>handleSubmit}>
//         <input type="text"  placeholder='Name*' required onChange={(e)=>handleChange} name='name' ></input>
//         <input type="number"  placeholder='Phone Number*'  onChange={(e)=>handleChange} name='number'  pattern='[6-9]{1}[0-9]{9}' required></input>
//         <button type='submit'onClick={handleSubmit}>Submit</button>
//         </form>
//         </div>

//         {/* <div className='address'>
//         <h3>Address</h3>
//         <input type="text"  placeholder='Pincode*' required pattern='[1-9]{1}[0-9]{5}'></input>
//         <input type='text' placeholder='Address (House no.,Building,Street,Area)*' required></input>
//         <input type='text' placeholder='City/District*' required></input>
//         </div> */}
//       </div>
//   )