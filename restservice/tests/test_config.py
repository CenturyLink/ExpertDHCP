config_pt = {
  "subnet_id": 1001,
  "subnet": "102.189.179.0/24",
  "pools": [
      {
          "pool": "102.189.179.100 - 102.189.179.150"
      }
  ],
  "macs":[
    "ec:b0:e1:4c:ab:90",
    "ec:b0:e1:4c:ab:91",
    "ec:b0:e1:4c:ab:92"
  ],
  "ips":[
    "102.189.179.111",
    "102.189.179.112",
    "102.189.179.113"
  ],
  "option_data": [
    {
      "name": "domain-name-servers",
      "code": 6,
      "space": "dhcp4",
      "csv-format": "true",
      "data": "10.189.136.37, 10.189.136.165"
    }
  ]
}

config_nt = {
  "subnet": {
    'valid': '102.189.180.0/24',
    'existing': "102.189.179.0/24"
  },
  "subnet_id": {
    'valid':1002,
    "existing": 1001,
    "incorrect": 1234567890,
  },
  "pools": {
    'existing': [
      {
        "pool": "102.189.179.100 - 102.189.179.150"
      }
    ],
    'valid': [
      {
        "pool": "102.189.180.100 - 102.189.180.150"
      }
    ],
    'incorrect': [
      {
        "pool": "102.189.181.100 - 102.189.181.150"
      }
    ]
  },
  "ip":{
    "valid":'102.189.179.119',
    "existing":'102.189.179.111',
    "incorrect":'102.189.180.101'
  },
  "mac":{
    "valid":'ec:b0:e1:4c:ab:96',
    "existing":'ec:b0:e1:4c:ab:91',
    "incorrect":'ec:b0:e1:4c:ab:910'
  },
  "option_data": {
    'incorrect': [
      {
        "name": "domain-name-servers",
        "code": 1234567890,
        "space": "dhcp4",
        "csv-format": "true",
        "data": "10.189.136.37, 10.189.136.165"
      }
    ],
    'valid': [
      {
        "name": "domain-name-servers",
        "code": 6,
        "space": "dhcp4",
        "csv-format": "true",
        "data": "10.189.136.37, 10.189.136.165"
      }
    ]
  }
}
