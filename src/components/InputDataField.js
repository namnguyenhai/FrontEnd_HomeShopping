import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { Button } from '@mui/material';

export default function BasicTextFields() {
  const buttonStyle = {margin:"20px"}
  const [selectedImage, setSelectedImage] = React.useState()
  const [imageName,setImageName] = React.useState("")
  const [nameProduct,setNameProduct] = React.useState("")
  const [price,setPrice] = React.useState("")
  const handleClick=(e)=>{
    e.preventDefault()
    console.log(imageName)
    const product = {
      "nameProduct":nameProduct, 
      "nameImageProduct": imageName, 
      "price":price}
    fetch("http://localhost:8080/product/add",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(product)
      // body:formData
    }).then(()=>{
      alert("New product added")
    })
    setNameProduct("");
    setPrice("");
    setSelectedImage("");

  }
  const changeHandler = e => {
		setSelectedImage(e.target.files[0]);
    setImageName(e.target.files[0].name);
	};



  return (
    <Box sx={{
      '& .MuiTextField-root': { m: 1},
    }}>
      <TextField id="outlined-basic" onChange={(e)=>setNameProduct(e.target.value)} value={nameProduct} label="Tên Sản Phẩm" variant="outlined" />
      <br></br>
      <TextField id="outlined-basic" onChange={(e)=>setPrice(e.target.value)} value={price} label="Giá" variant='outlined'></TextField>
      <br></br>
      {selectedImage && (
        <div style={{padding:"10px"}}>
        <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
        </div>
      )}
      <br />
      <input
        type="file"
        name="file"
        id="anh"
        onChange={changeHandler}/>
      <br></br>

      <Button variant='contained' type='submit' style={buttonStyle} onClick={handleClick}>Submit</Button>
    </Box>
     
  );
}
