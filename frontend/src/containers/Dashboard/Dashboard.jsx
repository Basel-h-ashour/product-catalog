import React, { useState, useEffect, useRef } from 'react';

import Product from '../../components/Product/Product'

import classes from './Dashboard.module.css';


const initialData = {
    name: "",
    price_gte: "",
    price_lte: "",
    expiry_date_gte: "",
    expiry_date_lte: "",
};

const Dashboard = (props) => {

    const [token, setToken] = useState(localStorage.getItem("token"))
    const [allowView, setAllowView] = useState(false)
    const [data, setData] = useState(initialData)

    const products = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setData({
            ...data,
            [name]: value,
        });

        console.log(data)
    };


    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token,
            },
        };

        fetch(`http://127.0.0.1:8000/api/products/?name=${data.name}&price_gte=${data.price_gte}&price_lte=${data.price_lte}&expiry_date_gte=${data.expiry_date_gte}&expiry_date_lte=${data.expiry_date_lte}`, requestOptions)
            .then(response => {
                if (response.status === 200)
                    return response.json()
                else {
                    throw new Error(response.status)
                }
            })
            .then(jsondata => {
                console.log(jsondata)
                products.current = jsondata;
                setAllowView(true)
            })
            .catch((error) => {
                console.log(error)
                setAllowView(false)
            });
    });

    return (
        allowView ? (
            <div className={classes.Dashboard}>
                <div className="container-fluid p-5">
                    <div className="row justify-content-center">
                        <div className="mb-5">
                            <div>
                                <h2>Filter:</h2>
                            </div>
                            <div className={[classes.Filter, "col align-items-center"].join(" ")}>
                                <div className={["col form-group m-2"].join(" ")}>
                                    <input
                                        type="name"
                                        id="name"
                                        name="name"
                                        className="form-control"
                                        placeholder="name"
                                        value={data.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className={["col form-group m-2"].join(" ")}>
                                    <input
                                        type="number"
                                        id="price_gte"
                                        name="price_gte"
                                        className="form-control"
                                        placeholder="Price From..."
                                        value={data.price_gte}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className={["col form-group m-2"].join(" ")}>
                                    <input
                                        type="number"
                                        id="price_lte"
                                        name="price_lte"
                                        className="form-control"
                                        placeholder="Price To..."
                                        value={data.price_lte}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className={["col form-group m-2"].join(" ")}>
                                    <input
                                        type="text"
                                        id="expiry_date_gte"
                                        onFocus={
                                            (e) => {
                                                e.currentTarget.type = "date";
                                                e.currentTarget.focus();
                                            }
                                        }
                                        name="expiry_date_gte"
                                        className="form-control"
                                        placeholder="Expiry Date From..."
                                        value={data.expiry_date_gte}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className={["col form-group m-2"].join(" ")}>
                                    <input
                                        type="text"
                                        id="expiry_date_lte"
                                        onFocus={
                                            (e) => {
                                                e.currentTarget.type = "date";
                                                e.currentTarget.focus();
                                            }
                                        }
                                        name="expiry_date_lte"
                                        className="form-control"
                                        placeholder="Expiry Date To..."
                                        value={data.expiry_date_lte}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className={classes.Products}>
                                {console.log(products) }
                                { products.current.map((value, index) => {
                                    console.log(value, index)
                                    return <Product key={index} productData={value} />
                                }) }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <h2 className="text-danger text-center mt-5">YOU ARE NOT AUTHORIZED TO VIEW THIS PAGE</h2>
        )
    )
}

export default Dashboard;