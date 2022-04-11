import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { DetailsList, SelectionMode, Stack, PrimaryButton } from '@fluentui/react';
import ToolBar from '../companent/ToolBar';
import { useNavigate } from 'react-router-dom';

const columnProps = {
    tokens: { childrenGap: 20 },
    styles: { roots: { width: 100 } }
}
//shift+alt+F düzenleme
export default function Books() {
    const navigate=useNavigate();
    const columns = [{
        key: "id",
        name: "Id",
        fieldName: "id",
        minWidth: 10,
        maxWidth: 50,
        isRowHeader: true,
    },
    {
        key: "imgUrl",
        name: "Image",
        fieldName: "imgUrl",
        minWidth: 200,
        maxWidth: 250,
        isRowHeader: true,
        onRender: (item) => (
            <img
                src={item.imgUrl}
                style={{ width: "200px", height: "250px" }}
                alt={`${item.name}-${item.author}`} />
        )
    },
    {
        key: "author",
        name: "Author",
        fieldName: "author",
        minWidth: 100,
        maxWidth: 200,
        isRowHeader: true
    },
    {
        key: "about",
        name: "About",
        fieldName: "about",
        minWidth: 300,
        maxWidth: 500,
        isRowHeader: true
    },
    {
        key: "process",
        name: "Process",
        fieldName: "process",
        minWidth: 300,
        maxWidth: 500,
        isRowHeader: true,
        onRender: (item) => (
            <Stack horizontal {...columnProps}>
                <PrimaryButton text='Add +' onClick={() => {
                    // console.log("ekledim") 
                    addtoCart(item)
                }} />
                <PrimaryButton text='Edit Book +' onClick={() => {(
                    // console.log("editledim")
                    navigate(`/book/edit/${item.id}`,{state:{id:item.id}}))
                }} />
                <PrimaryButton text='Delete Book +' onClick={
                    // console.log("sildim")
                    async () => await deleteBook(item.id)

                } />
            </Stack>
        )
    }
    ]
    async function deleteBook(bookId) {
        await axios.delete(`http://api-bookseller.herokuapp.com/books/${bookId}`);
        getBook();
    }

    function addtoCart(cartItem) {
        axios.post("http://api-bookseller.herokuapp.com/carts", cartItem).then(response => { console.log(response.data) })
    }
    function getBook(){
        axios.get("http://api-bookseller.herokuapp.com/books").then(response => setBooks(response.data)); 
    }

    const [books, setBooks] = useState([]);
    useEffect(() => {
        // fetch("http://api-bookseller.herokuapp.com/books").then(response=>response.json()).then(res=>console.table(res))

        // axios.get("http://api-bookseller.herokuapp.com/books").then(response => setBooks(response.data))
        getBook()
    }, [])
    return (
        // <div>
        //     {books.map(book=><div key={book.id}>{book.name}
        // </div>
        // )}
        // Books Page</div>
        <div>   
        <ToolBar/>  
            <div class="content">
                <div className='content-header'>Books</div>
                <DetailsList items={books} columns={columns} selectionMode={SelectionMode.none} />

            </div>
        </div>
    )
}

