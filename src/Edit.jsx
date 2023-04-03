import React, { useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {  useParams } from "react-router-dom";
export const Edit = () => {
    const form = useRef();
    const navigate = useNavigate()
  const { id } = useParams();
    useEffect(() => {
        
        let data={
            id:id
        }
        axios.get('http://localhost:3000/foodi/'+id)
        .then(function (response) {
            form.current.name.value=response.data.name;
            form.current.email.value=response.data.email;
            form.current.message.value=response.data.message
          console.log(response.data);
        })
    },[])
    const sendEmail = (e) => {
      e.preventDefault();
    let data = {
        id:id,
        name:form.current.name.value,
        email:form.current.email.value,
        message:form.current.message.value
    }
    console.log(data)
    axios.post('http://localhost:3000/foodupdate', data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      alert("Added successfully")
      window.location.reload();
    };
  
    return (
        <div className="home">
        <main>
     <div className="container-fluid ">
      <div className="row">
        <div className="col-md-2">
        <div class="d-flex flex-column flex-shrink-0 p-3 bg-light sidebars" >
      <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
        <svg class="bi me-2" width="40" height="32"></svg>
        <span class="fs-4">Sidebar</span>
      </a>
      <hr />
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
          <a href="/" class="nav-link link-dark " aria-current="page">
            <svg class="bi me-2" width="16" height="16"></svg>
            List
          </a>
        </li>
        <li>
          <a href="/add" class="nav-link active">
            <svg class="bi me-2" width="16" height="16"></svg>
            Add
          </a>
        </li>
        {/* <li>
          <a href="/" class="nav-link link-dark">
            <svg class="bi me-2" width="16" height="16"></svg>
            Orders
          </a>
        </li>
        <li>
          <a href="/" class="nav-link link-dark">
            <svg class="bi me-2" width="16" height="16"></svg>
            Products
          </a>
        </li>
        <li>
          <a href="/" class="nav-link link-dark">
            <svg class="bi me-2" width="16" height="16"></svg>
            Customers
          </a>
        </li> */}
      </ul>
      <hr />
      <div class="dropdown">
        <a href="/" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
          <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2" />
          <strong>mdo</strong>
        </a>
        {/* <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
          <li><a class="dropdown-item" href="#">New project...</a></li>
          <li><a class="dropdown-item" href="#">Settings</a></li>
          <li><a class="dropdown-item" href="#">Profile</a></li>
          <li><hr class="dropdown-divider" /></li>
          <li><a class="dropdown-item" href="#">Sign out</a></li>
        </ul> */}
      </div>
      
      </div>
  
     
        </div>
        <div className="col-md-10">
        <form ref={form} onSubmit={sendEmail}>
  <div class="form-group">
    <label for="exampleFormControlInput1">Name</label>
    <input type="text"  name="name" class="form-control"  />
  </div>
  <div class="form-group">
    <label for="exampleFormControlInput1">Email address</label>
    <input type="email"  name="email" class="form-control" placeholder="name@example.com" />
  </div>
  <div class="form-group">
    <label for="exampleFormControlTextarea1">Message</label>
    <textarea class="form-control" name="message"  rows="3"></textarea>
  </div>
  <input type="submit" value="Send" className='btn btn-primary mt-3' />
</form>
      </div>
      </div></div></main>
      </div>
    );
  };