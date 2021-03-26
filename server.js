const express = require('express')

const app = express()
const port = 5000
const axios = require('axios')

/*
** Middleware
*/
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


/*
** Endpoints
*/

app.post('/login', (req, res) => {
  const { user_name, password } = req.body;
  console.log('login hit!')
  console.log(req.body)
  let riLoginEndpoint = 'https://login2.responsys.net/rest/api/v1.3/auth/token'
  let options = {
    method: 'POST',
    url: riLoginEndpoint,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: `user_name=${user_name}&password=${password}&auth_type=password`
  }

  axios(options)
    .then(r => {
      const { status, data } = r
      if (status === 200 && data.authToken) {
        const { endPoint, authToken } = data
        res.status(200).send({
          endPoint,
          authToken,
          user: user_name
        })
      }
    })
    .catch(err => {
      console.log(err)
      const { status, data } = err.response;
      res.status(status).send({ data: data.title })
    })
})


app.post('/lists', async (req, res) => {
  const { endpoint, auth_token } = req.body
  let options = {
    method: 'GET',
    url: `${endpoint}/rest/api/v1.3/lists`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': auth_token
    }
  }

  try {
    const data = await proxyReq(options)
    res.status(200).send(data)
  } catch (err) {
    const { status, message } = err
    res.status(status).send({ data: message })
  }
})


app.post('/lists/:list/pets/:id', async (req, res) => {
  const { endpoint, auth_token, email } = req.body
  const { list, id } = req.params
  const query = `qa=e&id=${email}&fs=all`
  let options = {
    method: 'GET',
    url: `${endpoint}/rest/api/v1.3/lists/${list}/listExtensions/${id}/members?${query}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': auth_token
    }
  }

  try {
    const data = await proxyReq(options)
    res.status(200).send(data)
  } catch (err) {
    const { status, message } = err
    res.status(status).send({ data: message })
  }
})


app.post('/linktable/:id', async (req, res) => {
  const { endpoint, auth_token, folder } = req.body
  let options = {
    method: 'GET',
    url: `${endpoint}/rest/api/v1.3/folders/${folder}/linkTables/${req.params.id}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': auth_token
    }
  }

  try {
    const data = await proxyReq(options)
    res.status(200).send(data)
  } catch (err) {
    const { status, message } = err
    res.status(status).send({ data: message })
  }
})


app.post('/linktable/:id/update', async (req, res) => {
  const { endpoint, auth_token, folder, link_name, link_url } = req.body
  console.log('LINK STUFF>>>', link_name, link_url)
  let options = {
    method: 'POST',
    url: `${endpoint}/rest/api/v1.3/folders/${folder}/linkTables/${req.params.id}/members`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': auth_token
    },
    data: {
      recordData: {
        fieldNames: ['link_Url', 'link_name'],
        records: [
          [
            link_url,
            link_name,
          ]
        ]
      }
    }
  }

  try {
    const data = await proxyReq(options)
    console.log('DATA', data)
    res.status(200).send(data)
  } catch (err) {
    const { status, message } = err
    res.status(status).send({ data: message })
  }
})


/*
app.post('/programs', async (req, res) => {
  const { endpoint, auth_token } = req.body
  let options = {
    method: 'GET',
    url: `${endpoint}/rest/api/v1.3/programs`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': auth_token
    }
  }

  try {
    const data = await proxyReq(options)
    res.status(200).send(data)
  } catch (err) {
    const { status, message } = err
    res.status(status).send({ data: message })
  }
})

app.post('/programs/:id', async (req, res) => {
  const { endpoint, auth_token } = req.body

  let options = {
    method: 'GET',
    url: `${endpoint}/rest/api/v1.3/programs/${req.params.id}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': auth_token
    }
  }

  try {
    const data = await proxyReq(options)
    res.status(200).send({ data, status: 200 })
  } catch (err) {
    const { status, message } = err
    res.status(status).send({ error: message, status })
  }
})

app.post('/programs/:id/unpublish', async (req, res) => {
  const { endpoint, auth_token } = req.body
  let body = {
    action: 'unpublish'
  }
  let options = {
    method: 'PATCH',
    url: `${endpoint}/rest/api/v1.3/programs/${req.params.id}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': auth_token
    },
    data: JSON.stringify(body)
  }

  try {
    const data = await proxyReq(options)
    res.status(200).send(data)
  } catch (err) {
    const { status, message } = err
    res.status(status).send({ data: message })
  }
})

*/

app.post('/campaigns', (req, res) => {
  const { endpoint, auth_token } = req.body

  let options = {
    method: 'GET',
    url: `${endpoint}/rest/api/v1.3/campaigns/`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': auth_token
    },
  }

  axios(options)
    .then(r => {
      const { status, data } = r
      const { campaigns } = data
      if (status === 200) {
        res.status(200).send({ campaigns })
      }
    })
    .catch(err => {
      console.log(err);
      const { status, data } = err.response;
      res.status(status).send({ data: data.title })
    })

})


app.post('/campaigns/:id', (req, res) => {
  const { endpoint, auth_token } = req.body
  const filteredCampaigns = {
    searchCriteria: {
      keyword: {
        key: 'campaignName',
        value: '2021'
      }
    },
    sortCriteria: {
      field: 'campaignName',
      order: 'desc'
    }
    // need to include filter criteria for campaign type (docs incorrect on implementation)
  }

  let options = {
    method: 'POST',
    url: `${endpoint}/rest/api/v1.3/campaigns/actions/search`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': auth_token
    },
    data: JSON.stringify(filteredCampaigns)
  }

  axios(options)
    .then(r => {
      const { status, data } = r
      const { campaigns } = data
      if (status === 200) {
        res.status(200).send({ campaigns })
      }
    })
    .catch(err => {
      console.log(err);
      const { status, data } = err.response;
      res.status(status).send({ data: data.title })
    })
})


app.post('/campaigns/email/:id', async (req, res) => {
  const { endpoint, auth_token } = req.body
  let options = {
    method: 'GET',
    url: `${endpoint}/rest/api/v1.5/campaigns/${req.params.id}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': auth_token
    }
  }

  try {
    const data = await proxyReq(options)
    res.status(200).send(data)
  } catch (err) {
    const { status, message } = err
    res.status(status).send({ data: message })
  }
})

app.post('/campaigns/sms/:id', async (req, res) => {
  const { endpoint, auth_token } = req.body
  let options = {
    method: 'POST',
    url: `${endpoint}/rest/api/sms/v1.3/campaigns/${req.params.id}/preview`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': auth_token
    },
    data: JSON.stringify({
      matchKey: "MOBILE_NUMBER_",
      matchValue: '17028244792'
    })
  }

  try {
    const data = await proxyReq(options)
    res.status(200).send(data)
  } catch (err) {
    const { status, message } = err
    res.status(status).send({ data: message })
  }
})


app.post('/campaigns/push/:id', async (req, res) => {
  const { endpoint, auth_token } = req.body
  let options = {
    method: 'GET',
    url: `${endpoint}/rest/push/api/v1.3/campaigns/${req.params.id}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': auth_token
    }
  }

  try {
    const data = await proxyReq(options)
    console.log('DATA:', data)
    res.status(200).send(data)
  } catch (err) {
    const { status, message } = err
    console.log('ERROR', err)
    res.status(status).send({ data: message })
  }
})


app.post('/folders', async (req, res) => {
  const { endpoint, auth_token } = req.body

  let options = {
    method: 'GET',
    url: `${endpoint}/rest/api/v1.3/folders`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': auth_token
    }
  }

  try {
    const data = await proxyReq(options)
    console.log('DATA:', data)
    res.status(200).send(data.folders)
  } catch (err) {
    const { status, message } = err
    console.log('ERROR', err)
    res.status(status).send({ data: message, status })
  }
})


app.post('/folders/:id', async (req, res) => {
  const { endpoint, auth_token, limit } = req.body
  const urlParams = limit ? `?limit=200&offset=${limit}` : ''
  let options = {
    method: 'GET',
    url: `${endpoint}/rest/api/v1.3/folders/${req.params.id}/content${urlParams}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': auth_token
    }
  }

  try {
    const data = await proxyReq(options)
    console.log('*******DATA*******', data.riObjects)
    const filteredData = data.riObjects.filter(obj => obj.objectType === 'DISPATCHABLE')
    res.status(200).send(filteredData)
  } catch (err) {
    const { status, message } = err
    console.log('ERROR', err)

    res.status(status).send({ data: message, status })
  }
})




async function proxyReq(options) {
  return (
    axios(options)
      .then(r => {
        console.log(r);
        const { status, data } = r
        if (status === 200) {
          return data
        }
      })
      .catch(err => {
        console.log('axios err:', err)
        const { status, data } = err.response
        throw new ProxyError(status, data.title)
      })
  )
}

function ProxyError(status, message) {
  const error = new Error(message)
  error.status = status
  return error
}

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})