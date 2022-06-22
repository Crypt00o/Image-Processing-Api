import supertest from 'supertest'
import resizeUtil from '../utils/resizeUtil'
import app from '../app'
// create a request object with instance app

const request = supertest(app)

//describe Testing Endpoints

describe('Testing endpoint Responses', () => {
  //Testing / Endpoint

  it('test / EndPoint', async () => {
    const response = await request.get('/')
    expect(response.status).toEqual(200)
  })

  //Testing /images/resize Endpoint

  it('test /images/resize EndPoint', async () => {
    const response = await request.get('/images/resize')
    expect(response.status).toEqual(400)
  })

  //Testing /anything Endpoint

  it('test /anything  EndPoint', async () => {
    const response = await request.get('/anything')
    expect(response.status).toEqual(404)
  })
})

// describe Testing resize Api

// Testing /images/resize Api name=anything

describe('Testing resize Api ', () => {
  it('test /images/resize Api name=anyNotValidValue', async () => {
    const response = await request.get('/images/resize/').query({ name: 'anything' })
    expect(response.body.Error).toEqual('please enter a vaild image name')
    expect(response.status).toEqual(400)
  })

  // Testing /images/resize Api unvaild width

  it('test /images/resize Api width=anything , name=icelandwaterfall&width=anything&height=21 ', async () => {
    const response = await request
      .get('/images/resize/')
      .query({ name: 'icelandwaterfall', width: 'anything', height: '22' })
    expect(response.body.Error).toEqual('please enter a vaild width')
    expect(response.status).toEqual(400)
  })

  it('test /images/resize Api width=0, name=icelandwaterfall&width=0&height=21', async () => {
    const response = await request
      .get('/images/resize/')
      .query({ name: 'icelandwaterfall', width: '0', height: '22' })
    expect(response.body.Error).toEqual('please enter a vaild width')
    expect(response.status).toEqual(400)
  })

  // Testing /images/resize Api unvaild height

  it('test /images/resize Api height=anything ,name=icelandwaterfall&width=21&height=anything', async () => {
    const response = await request
      .get('/images/resize/')
      .query({ name: 'icelandwaterfall', width: '25', height: 'anything' })
    expect(response.body.Error).toEqual('please enter a vaild height')
    expect(response.status).toEqual(400)
  })

  it('test /images/resize Api height=-5 ,name=icelandwaterfall&width=25&height=-5', async () => {
    const response = await request
      .get('/images/resize/')
      .query({ name: 'icelandwaterfall', width: '25', height: '-5' })
    expect(response.body.Error).toEqual('please enter a vaild height')
    expect(response.status).toEqual(400)
  })

  // Testing images/resize Api with vaild : name ,width, height

  it('test /images/resize Api   name=icelandwaterfall&width=21&height=55', async () => {
    const response = await request
      .get('/images/resize/')
      .query({ name: 'icelandwaterfall', width: '25', height: '55' })
    expect(response.status).toEqual(200)
  })
})
//Testing the ResizeUtil
describe('Testing Functionality of ResizeUtil ', () => {
  it('Testing Image Processing with Resizeutil unvaild  : name,height,width', async () => {
    const height = 250
    const width = 250
    const name = 'ABCDEFG Notvaild'
    const resizeResult: boolean = await resizeUtil(name, height, width)
    expect(resizeResult).toEqual(false)
  })

  it('Testing Image Processing with Resizeutil vaild : name,height,width ', async () => {
    const height = 250
    const width = 250
    const name = 'icelandwaterfall'
    const resizeResult: boolean = await resizeUtil(name, height, width)
    expect(resizeResult).toEqual(true)
  })
})
