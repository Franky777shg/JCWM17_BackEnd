import React from 'react'
import Axios from 'axios'
import {
  Table,
  Button,
  Form,
  Dropdown
} from 'react-bootstrap'

import NavigationBar from '../components/NavigationBar'

const URL_API = 'http://localhost:2000/product'

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      idEdit: null
    }
  }

  fetchData = () => {
    Axios.get(`${URL_API}/get-product`)
      .then(res => {
        // console.log(res.data)
        this.setState({ products: res.data })
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidMount() {
    this.fetchData()
  }

  renderTHead = () => {
    return (
      <thead>
        <tr>
          <th>#</th>
          <th>Product Name</th>
          <th>Product Price</th>
          <th>Product Quantity</th>
          <th>Action</th>
        </tr>
      </thead>
    )
  }

  renderTBody = () => {
    return (
      <tbody>
        {this.state.products.map((item, index) => {
          if (this.state.idEdit === item.idproducts) {
            return (
              <tr key={index}>
                <td>#</td>
                <td><Form.Control ref="nameEdit" defaultValue={item.name} type="text" /></td>
                <td><Form.Control ref="priceEdit" defaultValue={item.price} type="number" /></td>
                <td><Form.Control ref="qtyEdit" defaultValue={item.quantity} type="number" /></td>
                <td>
                  <Button variant="outline-success" onClick={() => this.onSave(item.idproducts)}>Save</Button>
                  <Button variant="outline-danger" onClick={() => this.setState({ idEdit: null })}>Cancel</Button>
                </td>
              </tr>
            )
          }
          return (
            <tr key={index}>
              <td>{item.idproducts}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>
                <Button variant="outline-warning" onClick={() => this.setState({ idEdit: item.idproducts })}>Edit</Button>
                <Button variant="outline-danger" onClick={() => this.onDelete(item.idproducts)}>Delete</Button>
              </td>
            </tr>
          )
        })}
      </tbody>
    )
  }

  renderTInput = () => {
    return (
      <tfoot>
        <tr>
          <td>#</td>
          <td><Form.Control ref="name" type="text" placeholder="Enter Product Name" /></td>
          <td><Form.Control ref="price" type="number" placeholder="Enter Product Price" /></td>
          <td><Form.Control ref="quantity" type="number" placeholder="Enter Product Quantity" /></td>
          <td><Button variant="outline-success" onClick={this.onSubmit}>Submit</Button></td>
        </tr>
      </tfoot>
    )
  }

  onSubmit = () => {
    const name = this.refs.name.value
    const price = +this.refs.price.value
    const quantity = +this.refs.quantity.value

    const body = {
      name,
      price,
      quantity
    }
    console.log(body)

    Axios.post(`${URL_API}/add-product`, body)
      .then(res => {
        this.setState({ products: res.data })
        this.refs.name.value = ""
        this.refs.price.value = ""
      })
      .catch(err => {
        console.log(err)
      })
  }

  onDelete = (id) => {
    console.log(id)
    Axios.delete(`${URL_API}/delete-product/${id}`)
      .then(res => {
        this.setState({ products: res.data })
      })
      .catch(err => {
        console.log(err)
      })
  }

  onSave = (id) => {
    const nameEdit = this.refs.nameEdit.value
    const priceEdit = +this.refs.priceEdit.value
    const qtyEdit = +this.refs.qtyEdit.value

    const body = {
      name: nameEdit,
      price: priceEdit,
      quantity: qtyEdit
    }
    console.log(body)
    console.log(id)

    Axios.patch(`${URL_API}/update-product/${id}`, body)
      .then(res => {
        this.setState({ products: res.data, idEdit: null })
      })
      .catch(err => {
        console.log(err)
      })
  }

  onSortName = () => {
    Axios.get(`${URL_API}/sort-name`)
      .then(res => {
        this.setState({ products: res.data })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    console.log(this.state.products)
    return (
      <div>
        <NavigationBar />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>CRUD PRODUCT</h1>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Sorting By
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item >Name</Dropdown.Item>
              <Dropdown.Item >Price</Dropdown.Item>
              <Dropdown.Item >Quantity</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Table striped bordered hover variant="dark">
          {this.renderTHead()}
          {this.renderTBody()}
          {this.renderTInput()}
        </Table>
      </div>
    );
  }
}

export default HomePage;
