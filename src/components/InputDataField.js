import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function BasicTextFields() {
  const buttonStyle = {margin:"20px"}
  const [selectedImage, setSelectedImage] = React.useState()
  const [imageName,setImageName] = React.useState("")
  const [nameProduct,setNameProduct] = React.useState("")
  const [price,setPrice] = React.useState("")
  const [quantityOfProduct, setQuantityOfProduct] = React.useState(0)
  const handleClick=(e)=>{
    e.preventDefault()
    console.log(imageName)
    const product = {
      "nameProduct":nameProduct, 
      "nameImageProduct": imageName, 
      "quantityOfProduct": quantityOfProduct,
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
    setQuantityOfProduct("");
  }
  const changeHandler = e => {
		setSelectedImage(e.target.files[0]);
    setImageName(e.target.files[0].name);
	};



  return (
    <Box sx={{
      '& .MuiTextField-root': {marginTop:2},

    }}>
      <Box>
        
      </Box>
      <Link to="/" style={{textDecoration:'none'}}>
        <Button sx={{m:2}} variant='outlined' startIcon={<ArrowBack></ArrowBack>} >Back</Button>
      </Link>
      
      <Box sx={{      display:"flex", 
      flexDirection:"column",
      alignItems:"center",
      justifyContent:"center" }}>
        <TextField id="outlined-basic" onChange={(e)=>setNameProduct(e.target.value)} value={nameProduct} label="Name of Product" variant="outlined" />
        <br></br>
        <TextField id="outlined-basic" onChange={(e)=>setPrice(e.target.value)} value={price} label="Price" variant='outlined'></TextField>
        <br></br>
        <TextField id="outlined-basic" onChange={(e)=>setQuantityOfProduct(e.target.value)} value={quantityOfProduct} variant='outlined' label='Number of Product'></TextField>
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

        <Button variant='contained' type='submit' style={buttonStyle} onClick={handleClick}>Add Product</Button>
      </Box>

    </Box>
     
  );
}
