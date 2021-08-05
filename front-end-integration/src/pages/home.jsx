import React from 'react'
import Axios from 'axios'
import {
  Table,
  Button,
  Form,
  Dropdown
} from 'react-bootstrap'

import NavigationBar from '../components/NavigationBar'

const URL_API = 'http://localhost:2000/'

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      idEdit: null,
      methodName: false,
      methodPrice: false,
      methodQty: false,
    }
  }

  fetchData = () => {
    Axios.get(`${URL_API}get-data`)
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
          <th>Product Category</th>
          <th>Action</th>
        </tr>
      </thead>
    )
  }

  renderTBody = () => {
    return (
      <tbody>
        {this.state.products.map((item, index) => {
          if (this.state.idEdit === item._id) {
            return (
              <tr key={index}>
                <td>#</td>
                <td><Form.Control ref="nameEdit" defaultValue={item.name} type="text" /></td>
                <td><Form.Control ref="priceEdit" defaultValue={item.price} type="number" /></td>
                <td><Form.Control ref="qtyEdit" defaultValue={item.quantity} type="number" /></td>
                <td>
                  <Form.Select ref="categoryEdit" defaultValue={item.category}>
                    <option value="">Choose Category Below:</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Cloth">Cloth</option>
                    <option value="Stationery">Stationery</option>
                  </Form.Select>
                </td>
                <td>
                  <Button variant="outline-success" onClick={() => this.onSave(item._id)}>Save</Button>
                  <Button variant="outline-danger" onClick={() => this.setState({ idEdit: null })}>Cancel</Button>
                </td>
              </tr>
            )
          }
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.category}</td>
              <td>
                <Button variant="outline-warning" onClick={() => this.setState({ idEdit: item._id })}>Edit</Button>
                <Button variant="outline-danger" onClick={() => this.onDelete(item._id)}>Delete</Button>
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
          <td>
            <Form.Select ref="category">
              <option value="">Choose Category Below:</option>
              <option value="Electronics">Electronics</option>
              <option value="Cloth">Cloth</option>
              <option value="Stationery">Stationery</option>
            </Form.Select>
          </td>
          <td><Button variant="outline-success" onClick={this.onSubmit}>Submit</Button></td>
        </tr>
      </tfoot>
    )
  }

  onSubmit = () => {
    const name = this.refs.name.value
    const price = +this.refs.price.value
    const quantity = +this.refs.quantity.value
    const category = this.refs.category.value

    const body = {
      name,
      price,
      quantity,
      category
    }
    console.log(body)

    Axios.post(`${URL_API}add-data`, body)
      .then(res => {
        this.setState({ products: res.data })
        this.refs.name.value = ""
        this.refs.price.value = ""
        this.refs.quantity.value = ""
        this.refs.category.value = ""
      })
      .catch(err => {
        console.log(err)
      })
  }

  onDelete = (id) => {
    console.log(id)
    Axios.delete(`${URL_API}delete-data/${id}`)
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
    const cateEdit = this.refs.categoryEdit.value

    const body = {
      name: nameEdit,
      price: priceEdit,
      quantity: qtyEdit,
      category: cateEdit
    }
    console.log(body)
    console.log(id)

    Axios.post(`${URL_API}update-data/${id}`, body)
      .then(res => {
        this.setState({ products: res.data, idEdit: null })
      })
      .catch(err => {
        console.log(err)
      })
  }

  onSortMethod = async (sort) => {
    let method

    if (sort == 'name') {
      await this.setState({ methodName: !this.state.methodName })
      method = this.state.methodName ? 'asc' : 'desc'
    } else if (sort == 'price') {
      await this.setState({ methodPrice: !this.state.methodPrice })
      method = this.state.methodPrice ? 'asc' : 'desc'
    } else if (sort == 'quantity') {
      await this.setState({ methodQty: !this.state.methodQty })
      method = this.state.methodQty ? 'asc' : 'desc'
    }

    this.onSorting(sort, method)
  }

  onSorting = (sort, method) => {
    Axios.get(`${URL_API}/sort-name/${sort}/${method}`)
      .then(res => {
        this.setState({ products: res.data, sorting: ['name', 'asc'] })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
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
