import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { DetailsList, Stack, PrimaryButton, SelectionMode } from '@fluentui/react';
export default function Carts() {
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
            <Stack>
                <PrimaryButton text='Delete Cart' onClick={async () => await deleteCart(item.id)}></PrimaryButton>
            </Stack>
        )
    }
    ]
    async function deleteCart(cartId) {
        const response = await axios.delete(`http://api-bookseller.herokuapp.com/carts/${cartId}`);
        console.log("Response", response)
        if (response.status == 200) {
            //alert("Cart Deleted");
            getCart();
        }
    }

    const [carts, setCarts] = useState([]);
    const getCart = () => {
        axios.get("http://api-bookseller.herokuapp.com/carts").then(response =>

            setCarts(response.data))
    }

    useEffect(() => {
        // fetch("http://api-bookseller.herokuapp.com/carts").then(response=>response.json()).then(res=>console.table(res))
        // axios.get("http://api-bookseller.herokuapp.com/carts").then(response =>
        //     // console.table(response.data)
        //     setCarts(response.data)
        // )
        getCart();

    }, [])
    //console.log(carts)
    return (
        <div>
            {/* <div>{carts.map(carts=>carts.id)}</div>
    <div>{carts.map(carts=>carts.name)}</div> */}

            <div className='content'>
                <div className='content-header'>{carts.length > 0 ? "Carts" : "Cart is empty"}</div>
                {carts.length > 0 && <DetailsList items={carts} columns={columns} selectionMode={SelectionMode.none} />}
            </div>
        </div>
    )
}
