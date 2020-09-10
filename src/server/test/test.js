let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let should = chai.should()

chai.use(chaiHttp)

describe('Product API', () => {

  it('GET 10 featured products', done => {
    chai.request(server)
    .get('/get_products')
    .end((err, res) => {

      if(res.statusCode == 200) {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.include.keys('products')
        res.body.products.length.should.eql(10)
      }
      else {
        res.should.have.status(500)
        res.body.should.have.property('error')
      }

      done()  
    })
  })

  it('Gets a single product given an id', done => {
    // Assumes that id 1 will always exist
    let id = '1'

    chai.request(server)
    .post('/product')
    .send({id})
    .end((err, res) => {

      if(res.statusCode == 200) {
        res.body.should.be.a('object')
        res.body.should.include.keys('product')
      }
      else {
        res.should.have.status(500)
        res.body.should.have.property('error')
      }
      done()
    })
  })

  it('Should not return a product with when not passed an id', done => {

    chai.request(server)
    .post('/product')
    .end((err, res) => {
      
      res.body.should.be.a('object')
      res.body.should.eql({})
      res.should.have.status(500)
      res.should.have.property('error')
    
      done()
    })
  })

  it('Gets products from a category given an id', done => {
    // Assumes that id will passed
    let id = 'Jewelery'

    chai.request(server)
    .post('/get_categories')
    .send({id})
    .end((err, res) => {
      
      if(res.statusCode == 200) {
        res.body.should.be.a('object')
        res.body.should.include.keys('product')
      }
      else {
        res.should.have.status(500)
        res.should.have.property('error')
      }

      done()
    })
  })

  it('Should not return products when not passed a category', done => {

    chai.request(server)
    .post('/get_categories')
    .end((err, res) => {
    
      res.body.should.be.a('object')
      res.body.should.eql({})
      res.should.have.status(500)
      res.should.have.property('error')
    
      done()
    })
  })
})