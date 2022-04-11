import React, { useState, useEffect } from 'react'
import { Stack, TextField, PrimaryButton } from '@fluentui/react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export default function BooksEdit() {
const location=useLocation();
console.log(location.state);

  const [pageData, setPageData] = useState({
    "name": "",
    "author": "",
    "imgUrl": "",
    "about": ""

  })
  const onChangeText = (e) => {
    setPageData({...pageData,[e.target.name]:e.target.value})
  }

  function editBook() {
   // console.log("Edit Book")
   axios.put("http://api-bookseller.herokuapp.com/books/"+location.state.id,pageData).then(response=>{
     console.log(response)
     if(response.status==200){
       alert("Books successfully updated")
     }
   })
  }

  function fetchBookById(){
    axios.get("http://api-bookseller.herokuapp.com/books/"+location.state.id).then(response=>setPageData(response.data))
  }
  useEffect(() => {
    fetchBookById()

  },[])

  return (
    <div style={{ paddingTop: 50 }}>
      <div className='content'>
        <div className='content-header'>Books Edit</div>
        <Stack tokens={{ childrenGap: 20 }} styles={{
          root: {
            width: 700,
            marginLeft: 10,
            marginTop: 10
          }
        }}>
          <TextField label='Name' name='name' value={pageData.name} onChange={onChangeText} placeholder='Please enter name here' />

          <TextField label='Author' name='author' value={pageData.author} onChange={onChangeText} placeholder='Please enter author here' />

          <TextField label='Image' name='imgUrl' value={pageData.imgUrl} onChange={onChangeText} placeholder='Please enter image url here' />

          <TextField label='About' name='about' value={pageData.about} onChange={onChangeText} placeholder='Please enter about here' />

          <PrimaryButton text='Save Changes' style={{ width: "100%", height: "50px" }}

            onClick={
              () => editBook()
            }
          />
        </Stack>

      </div>
    </div>
  )
}
 