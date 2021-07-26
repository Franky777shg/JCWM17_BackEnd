import React from 'react'
import Axios from 'axios'
import {
  Table,
  Button,
  Form
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
    Axios.get(`${URL_API}/getAllProducts`)
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
          <th>Action</th>
        </tr>
      </thead>
    )
  }

  renderTBody = () => {
    return (
      <tbody>
        {this.state.products.map((item, index) => {
          if (this.state.idEdit === item.id) {
            return (
              <tr key={index}>
                <td>#</td>
                <td><Form.Control ref="nameEdit" defaultValue={item.name} type="text" /></td>
                <td><Form.Control ref="priceEdit" defaultValue={item.price} type="number" /></td>
                <td>
                  <Button variant="outline-success" onClick={() => this.onSave(item.id)}>Save</Button>
                  <Button variant="outline-danger" onClick={() => this.setState({ idEdit: null })}>Cancel</Button>
                </td>
              </tr>
            )
          }
          return (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>
                <Button variant="outline-warning" onClick={() => this.setState({ idEdit: item.id })}>Edit</Button>
                <Button variant="outline-danger" onClick={() => this.onDelete(item.id)}>Delete</Button>
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
          <td><Form.Control ref="price" type="number" placeholder="Enter Price Name" /></td>
          <td><Button variant="outline-success" onClick={this.onSubmit}>Submit</Button></td>
        </tr>
      </tfoot>
    )
  }

  onSubmit = () => {
    const name = this.refs.name.value
    const price = +this.refs.price.value

    const data = {
      name,
      price
    }
    console.log(data)

    Axios.post(`${URL_API}/add-product`, data)
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

    const data = {
      name: nameEdit,
      price: priceEdit
    }
    console.log(data)

    Axios.patch(`${URL_API}/patch-product/${id}`, data)
      .then(res => {
        this.setState({ products: res.data, idEdit: null })
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
        <h1>CRUD PRODUCT</h1>
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
