import logo from './logo.svg';
import './App.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from "axios";
import { useEffect, useState } from 'react';

function App() {

  const [products, setProducts] = useState([])
  const [loadProduct, setLoadProduct] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)


  const getAllProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/products`)
      console.log("response: ", response.data);

      setProducts(response.data.data.reverse())

    } catch (error) {
      console.log("error in getting all products", error);
    }
  }

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5001/product/${id}`)
      console.log("response: ", response.data);

      setLoadProduct(!loadProduct)

    } catch (error) {
      console.log("error in getting all products", error);
    }
  }

  const editMode = (product) => {
    setIsEditMode(!isEditMode)
    setEditingProduct(product)

    editFormik.setFieldValue("productName", product.name)
    editFormik.setFieldValue("productPrice", product.price)
    editFormik.setFieldValue("productDescription", product.description)
   
  }

  useEffect(() => {

    getAllProducts()

  }, [loadProduct])


  const myFormik = useFormik({
    initialValues: {
      productName: '',
      productPrice: '',
      productDescription: '',
    },
    validationSchema:
      yup.object({
        productName: yup
          .string('Enter your product name')
          .required('product name is required')
          .min(3, "please enter more then 3 characters ")
          .max(20, "please enter within 20 characters "),

        productPrice: yup
          .number('Enter your product price')
          .positive("enter positive product price")
          .required('product name is required'),

        productDescription: yup
          .string('Enter your product Description')
          .required('product name is required')
          .min(3, "please enter more then 3 characters ")
          .max(500, "please enter within 20 characters "),
      }),
    onSubmit: (values) => {
      console.log("values: ", values);

      axios.post(`http://localhost:5001/product`, {
        name: values.productName,
        price: values.productPrice,
        description: values.productDescription,
      })
        .then(response => {
          console.log("response: ", response.data);
          setLoadProduct(!loadProduct)

        })
        .catch(err => {
          console.log("error: ", err);
        })
    },
  });
  const editFormik = useFormik({
    initialValues: {
      productName: '',
      productPrice: '',
      productDescription: '',
    },
    validationSchema:
      yup.object({
        productName: yup
          .string('Enter your product name')
          .required('product name is required')
          .min(3, "please enter more then 3 characters ")
          .max(20, "please enter within 20 characters "),

        productPrice: yup
          .number('Enter your product price')
          .positive("enter positive product price")
          .required('product name is required'),

        productDescription: yup
          .string('Enter your product Description')
          .required('product name is required')
          .min(3, "please enter more then 3 characters ")
          .max(500, "please enter within 20 characters "),
      }),
    onSubmit: (values) => {
      console.log("values: ", values);

      axios.put(`http://localhost:5001/product/${editingProduct._id}`, {
        name: values.productName,
        price: values.productPrice,
        description: values.productDescription,
      })
        .then(response => {
          console.log("response: ", response.data);
          setLoadProduct(!loadProduct)

        })
        .catch(err => {
          console.log("error: ", err);
        })
    },
  });


  return (
    <div>
      <form onSubmit={myFormik.handleSubmit}>
        <input
          id="productName"
          placeholder="Product Name"
          value={myFormik.values.productName}
          onChange={myFormik.handleChange}
        />
        {
          (myFormik.touched.productName && Boolean(myFormik.errors.productName)) ?
            <span style={{ color: "red" }}>{myFormik.errors.productName}</span>
            :
            null
        }

        <br />
        <input
          id="productPrice"
          placeholder="Product Price"
          value={myFormik.values.productPrice}
          onChange={myFormik.handleChange}
        />
        {
          (myFormik.touched.productPrice && Boolean(myFormik.errors.productPrice)) ?
            <span style={{ color: "red" }}>{myFormik.errors.productPrice}</span>
            :
            null
        }

        <br />
        <input
          id="productDescription"
          placeholder="Product Description"
          value={myFormik.values.productDescription}
          onChange={myFormik.handleChange}
        />
        {
          (myFormik.touched.productDescription && Boolean(myFormik.errors.productDescription)) ?
            <span style={{ color: "red" }}>{myFormik.errors.productDescription}</span>
            :
            null
        }

        <br />
        <button type="submit"> Submit </button>
      </form>

      <br />
      <br />


      <div >
        {products.map((eachProduct, i) => (
          <div key={eachProduct._id} style={{ border: "1px solid black", padding: 10, margin: 10, borderRadius: 15 }}>
            <h2>{eachProduct.name}</h2>
            <p>{eachProduct._id}</p>
            <h5>{eachProduct.price}</h5>
            <p>{eachProduct.description}</p>

            <button onClick={() => {
              deleteProduct(eachProduct._id)
            }}>delete</button>

            <button onClick={() => {
              editMode(eachProduct)
            }}>edit</button>

            {(isEditMode && editingProduct._id === eachProduct._id) ?
              <div>

                <form onSubmit={editFormik.handleSubmit}>
                  <input
                    id="productName"
                    placeholder="Product Name"
                    value={editFormik.values.productName}
                    onChange={editFormik.handleChange}
                  />
                  {
                    (editFormik.touched.productName && Boolean(editFormik.errors.productName)) ?
                      <span style={{ color: "red" }}>{editFormik.errors.productName}</span>
                      :
                      null
                  }

                  <br />
                  <input
                    id="productPrice"
                    placeholder="Product Price"
                    value={editFormik.values.productPrice}
                    onChange={editFormik.handleChange}
                  />
                  {
                    (editFormik.touched.productPrice && Boolean(editFormik.errors.productPrice)) ?
                      <span style={{ color: "red" }}>{editFormik.errors.productPrice}</span>
                      :
                      null
                  }

                  <br />
                  <input
                    id="productDescription"
                    placeholder="Product Description"
                    value={editFormik.values.productDescription}
                    onChange={editFormik.handleChange}
                  />
                  {
                    (editFormik.touched.productDescription && Boolean(editFormik.errors.productDescription)) ?
                      <span style={{ color: "red" }}>{editFormik.errors.productDescription}</span>
                      :
                      null
                  }

                  <br />
                  <button type="submit"> Submit </button>
                </form>

              </div> : null}

          </div>
        ))}
      </div>


    </div>





  );
}

export default App;
