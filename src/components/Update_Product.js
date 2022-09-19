import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

export default function UpdateProducts(){
    const location = useLocation();
    const dataProduct = location.state.data[0]
    const nameImg = dataProduct.image.split("/").pop()
    const [checkedInput, setCheckedInput] = React.useState(false)
    const buttonStyle = {margin:"20px"}
    const [selectedImage, setSelectedImage] = React.useState()
    const [imageName,setImageName] = React.useState(nameImg)
    const [nameProduct,setNameProduct] = React.useState(dataProduct.nameProduct)
    const [price,setPrice] = React.useState(dataProduct.priceProduct)
    const [quantityOfProduct, setQuantityOfProduct] = React.useState(dataProduct.quantityProduct)
    const handleUpdate=(e)=>{
      e.preventDefault()
      const id = dataProduct.id
      const product = {
        "nameProduct":nameProduct, 
        "nameImageProduct": imageName, 
        "quantityOfProduct": quantityOfProduct,
        "price":price}
      fetch("http://localhost:8080/product/updateProducts/" + id,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(product)
      }).then(()=>{
        alert("Updated Product")
      })
      setNameProduct("");
      setPrice("");
      setSelectedImage("");
      setQuantityOfProduct(0);
    }
    const changeHandler = (e) => {
      setSelectedImage(e.target.files[0]);
      setCheckedInput(true)
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
          <img src={checkedInput?URL.createObjectURL(selectedImage):dataProduct.image} width={"250px"} alt="show"></img>


          <br />
          <input
            type="file"
            name="file"
            id="anh"
            onChange={changeHandler}
            />
          <br></br>
  
          <Button variant='contained' type='submit' style={buttonStyle} onClick={handleUpdate}>Update</Button>
        </Box>
  
      </Box>
       
    );
  }
  