import React, { useState } from 'react'
import { Stack, TextField, PrimaryButton } from '@fluentui/react';
import axios from 'axios';


export default function BooksCreate() {
  const [pageData, SetPageData] = useState({
    "name": "",
    "author": "",
    "imgUrl": "",
    "about": ""

  })
  const onChangeText = (e) => {
    console.log = ("OnchangeText", e.target.name, e.target.value)
    SetPageData({ ...pageData, [e.target.name]: e.target.value })
  }

  function createBook() {
    axios.post("http://api-bookseller.herokuapp.com/books/", pageData).then(response => {
      if (response.status == 201) {
        alert("Book Created Successfully")
      }
    })
  }

  return (
    <div style={{ paddingTop: 50 }}>
      <div className='content'>
        <div className='content-header'>Books Create</div>
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

          <PrimaryButton text='Create Book' style={{ width: "100%", height: "50px" }}

            onClick={
              () => createBook()
            }
          />
        </Stack>

      </div>
    </div>
  )
}
