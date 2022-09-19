import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Avatar, Box, Button, ButtonGroup, Grid } from '@mui/material';
import { Link } from 'react-router-dom';



const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'image', headerName: 'images',width: 130, renderCell:(params)=><Avatar src={params.value} alt="imageproduct" sx={{width:80,height:80,maxHeight:"100%", maxWidth:"100%"}} variant="square"></Avatar>},
    { field: 'nameProduct', headerName: 'Name Products', width: 130 },
    { field: 'quantityProduct', headerName: 'Quantity Products', width: 130},
    { field: 'priceProduct', headerName:'Price', width:130}
];



export default function DataTable() {
  const[products, setProduct] = React.useState([])
  const[selectedRows, setSeletedRows] = React.useState([])
  const rowSelectionHandler = (ids) =>{ 
      const selectIDs = new Set(ids)
      const selectedRows = getRowsData.filter((row)=> selectIDs.has(row.id));
      setSeletedRows(selectedRows)
      console.log(selectedRows)
      // console.log(JSON.stringify(selectedRows)['id'])

  }
  const handleDelete = (e)=>{
    e.preventDefault()
    const ds = []
    for(var i=0; i<selectedRows.length;i++){
      ds.push(selectedRows[i]['id'])
    }

    console.log(ds)
    fetch("http://localhost:8080/product/deleteProduct/"+ds,{
      method:"Delete"
    }).then(()=>{
      alert("Deleted")
      getData()
    })
    
  }
  const getData = async ()=>{
    const response1 = await fetch("http://localhost:8080/product/getALlProduct")
    const data = await response1.json()
    setProduct(data)
  }
  const getRowsData = products.map(product=>({id: product.productId, image:"/image_product/" + product.nameImageProduct, nameProduct: product.nameProduct, quantityProduct: product.quantityOfProduct,priceProduct: product.price }))
  React.useEffect(()=>{
    // fetch("http://localhost:8080/product/getALlProduct").then(res=>res.json()).then((result)=>{setProduct(result);})
    getData();

  },[])
  const checkSelectedRow = () => {
    if (selectedRows.length<1 || selectedRows.length>1)
    {
      return false
    }
    else {
      return true
    }
  }

  return (
    <div style={{ height: 500, width: '50%', margin: '0 auto' }}>
      <Box     
          display="flex" 
          flexDirection="column"
          alignItems="center"
          justifyContent="center" >
        <ButtonGroup >
          <Grid>
            <Link to="/add" style={{textDecoration:'none'}}>
              <Button sx={{m:5}} variant='contained'  type='submit'>Add</Button>
            </Link>
            
          </Grid>
          <Grid>
            <Button onClick={handleDelete} sx={{m:5}} variant='contained' type='submit'>Delete</Button>
          </Grid>
          <Grid>
            <Link to={{pathname:checkSelectedRow() ? "/update":null}} state={{data:selectedRows}} style={{textDecoration:'none'}} >
              <Button  sx={{m:5}} variant='contained' type='submit'>Update</Button>
            </Link>
          </Grid>
        </ButtonGroup>
      </Box>

      <DataGrid
        rows={getRowsData}
        columns={columns}
        rowHeight={100}
        pageSize={5}
        checkboxSelection 
        onSelectionModelChange={(ids)=>rowSelectionHandler(ids)}
      />
    </div>
  );
}
