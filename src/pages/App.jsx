// Componentes React
import React, { useState } from 'react'

// Componentes Terceiros
import { Form, Button, Dropdown, Checkbox } from 'semantic-ui-react'

// Estilos
import '../static/scss/App.scss'
import 'semantic-ui-css/semantic.min.css'

const QRCodeWifiGenerator = () => {

  // biblioteca responsável por criar o qrcode
  const qrcode = require('wifi-qr-code-generator')

  // Variáveis com valores possíveis dos dropdowns
  const encryptionOptions = [
    { key: 'WPA', text: 'WPA', value: 'WPA'},
    { key: 'WEP', text: 'WEP', value: 'WEP'},
    { key: 'None', text: 'None', value: 'None'}
  ]

  // Variável contendo todos os campos necessários para gerar o qrcode
  const formFields = {
    ssid: '',
    password: '',
    encryption: '',
    hiddenSSID: false,
    outputFormat: 'image/png'
  }

  // Variáveis que controlam o estado dos valores do formulário e a imagem gerada
  const [formValues, setFormValues] = useState(formFields)
  const [qrcodeImage, setQrcodeImage] = useState()

  function handleFormChange(e, object, type){

    let value = ''

    switch (e.target.nodeName) {
      case 'DIV': // dropdown
        value = object.value
        break
      case 'INPUT': // inout
        value = e.target.value 
        break
      case 'LABEL': // checkbox
        value = object.checked
        break
      default:
        break
    }

    // Atualiza estado do formulário
    setFormValues( { ...formValues, [type]: value} )

  }

  function handleClick(){
    
    // Popula 
    const pr = qrcode.generateWifiQRCode({
      ssid: formValues.ssid,
      password: formValues.password,
      encryption: formValues.encryption,
      hiddenSSID: formValues.hiddenSSID,
      outputFormat: { type: formValues.outputFormat }
    })

    pr.then((data) => setQrcodeImage(data))

  }

  return (

    <div className="container">

      <header>
        <h1>Wifi QRCode Generator</h1>
      </header>

      <div className='content'>

      <Form className='content-form'>

        <Form.Field className='form-field'>
          <label>Wifi Name (SSID)</label>
          <input 
            placeholder='SSID' 
            value={formValues.ssid} 
            onChange={(e) => handleFormChange(e, null, 'ssid')}
          />
        </Form.Field>

        <Form.Field className='form-field'>
          <label>Password</label>
          <input 
            placeholder='Password' 
            value={formValues.password} 
            onChange={(e) => handleFormChange(e, null, 'password')}
          />
        </Form.Field>
        
        <Form.Field className='form-field'>
          <label>Encryption</label>
          <Dropdown
            placeholder='Encryption'
            fluid
            selection
            options={encryptionOptions}
            value={formValues.encryption}
            onChange={(e, value) => handleFormChange(e, value, 'encryption')}
          />
        </Form.Field>

        <Form.Field className='form-field'>
          <label>Hidden SSID</label>
          <Checkbox toggle checked={formValues.hiddenSSID} onChange={(e, value) => handleFormChange(e, value, 'hiddenSSID')}/>
        </Form.Field>

        <Button type='submit' onClick={() => handleClick()}>Generate</Button>

      </Form>

      <div className='content-image'>
        {
          qrcodeImage !== undefined
          ? <img src={qrcodeImage} width={300} height={300} alt='Wifi QRCode'/>
          : <></>
        }
        
      </div>

      </div>

    </div>
  )
}

export default QRCodeWifiGenerator
