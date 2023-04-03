import React, { useState,useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Img = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
      axios
        .get("http://localhost:3000/img")
        .then((res) => setData(res.data))
        .catch((err) => console.log(err, "it has an error"));
    });
  const [fname, setFName] = useState("");

  const [file, setFile] = useState("");

  const history = useNavigate();

  const setdata = (e) => {
    const { value } = e.target;
    setFName(value);
  }

  const setimgfile = (e) => {
    setFile(e.target.files[0])
  }

  // adduser data

  const addUserData = async (e) => {
    e.preventDefault();

    var formData = new FormData();
    formData.append("photo", file);
    formData.append("name", fname);
    formData.append("email", "s@gmail.com");
    formData.append("message", "s@gmail.com");

    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }

    const res = await axios.post("http://localhost:3000/img", formData, config);

    if (res.data.status === 401 || !res.data) {
      console.log("errror")
    } else {
      window.location.reload();
    }
  }

  return (
    <>
      <div className="container mt-3">
        <h1>Look up</h1>

        {/* <Form className='mt-3'>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>UserName</Form.Label>
            <Form.Control type="text" name='fname' onChange={setdata} placeholder="" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Select Your Image</Form.Label>
            <Form.Control type="file" onChange={setimgfile} name='photo' placeholder="" />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={addUserData}>
            Submit
          </Button>
        </Form> */}
        <form>
  <div class="form-group">
    <label for="exampleFormControlInput1">Name</label>
    <input type="text" class="form-control" name='fname' onChange={setdata} placeholder=""  />
  </div>
  <div className="form-row">
          <label className="text-white">Select Image :</label>
          <input type="file" onChange={setimgfile} name='photo' className="form-control"  />
        </div>
        <button variant="primary" className='mt-3 btn btn-primary' type="submit" onClick={addUserData}>
            Submit
          </button>
</form>

        <div className="container mt-5">
                <div className="row mt-5">
      {data?.map((obj) => {
          const base64String = btoa(
            new Uint8Array(obj.img.data.data).reduce(function (data, byte) {
              return data + String.fromCharCode(byte);
            }, "")
          );
          return (
           
                    <div className="col-md-3">
                    <div class="card" >
            <img class="card-img-top" src={`data:image/png;base64,${base64String}`} alt="Card image cap" />
            <div class="card-body">
              <h5 class="card-title">{obj.name}</h5>
              <a href="#" class="btn btn-primary">Go Inside</a>
            </div>
          </div>    
                    </div>
              
           
          );
         
        })}

</div>
            </div>
      </div>
    </>
  )
}

export default Img;
