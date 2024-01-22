const swaggerUI = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc")

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: ' Talentsync Task - Blog API',
        description: "A RESTful API for a blogging platform where users can create, read, update, and delete blog posts.",
        contact: {
          name: "Jude Oyedele",
          email: "judeokennywise@gmail.com",
          url: "https://github.com/judekennywise/Talentsync_task"
        },
        version: '1.0.0',
      },
      servers: [
        {
          url: "http://localhost:3000/",
          description: "Local server"
        },
        {
          url: "<your live url here>",
          description: "Live server"
        },
      ]
    },
    // looks for configuration in specified directories
    apis: ['./router/*.js'],
  }

const swaggerSpec = swaggerJsdoc(options)
  function swaggerDocs(app, port) {
    // Swagger Page
    app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))
    // Documentation in JSON format
    app.get('/docs.json', (req, res) => {
      res.setHeader('Content-Type', 'application/json')
      res.send(swaggerSpec)
    })
  }
  module.exports = swaggerDocs;