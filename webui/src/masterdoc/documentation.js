import React, { Component } from "react";

class Documentation extends Component {
  render() {
    return (
      <div>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Documentation — Master DHCP 0.1 documentation</title>
        <link rel="stylesheet" href="_static/alabaster.css" type="text/css" />
        <link rel="stylesheet" href="_static/pygments.css" type="text/css" />
        <link rel="index" title="Index" href="genindex.html" />
        <link rel="search" title="Search" href="search.html" />
        <link rel="stylesheet" href="_static/custom.css" type="text/css" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=0.9, maximum-scale=0.9"
        />
        <div className="document">
          <div className="documentwrapper">
            <div className="bodywrapper">
              <div className="body" role="main">
                <div className="section" id="documentation">
                  <h1>
                    <a className="toc-backref" href="#id26">
                      Documentation
                    </a>
                    <a
                      className="headerlink"
                      href="#documentation"
                      title="Permalink to this headline"
                    >
                      ¶
                    </a>
                  </h1>
                  <p>
                    <strong>Authors</strong>: Ajeeb Basheer
                  </p>
                  <p>
                    <strong>Last Updated</strong>: 15th Sept 2020
                  </p>
                  <div className="contents topic" id="table-of-contents">
                    <p className="topic-title">Table Of Contents</p>
                    <ul className="simple">
                      <li>
                        <p>
                          <a
                            className="reference internal"
                            href="#documentation"
                            id="id26"
                          >
                            Documentation
                          </a>
                        </p>
                        <ul>
                          <li>
                            <p>
                              <a
                                className="reference internal"
                                href="#introduction"
                                id="id27"
                              >
                                Introduction
                              </a>
                            </p>
                          </li>
                          <li>
                            <p>
                              <a
                                className="reference internal"
                                href="#architecture"
                                id="id28"
                              >
                                Architecture
                              </a>
                            </p>
                          </li>
                          <li>
                            <p>
                              <a
                                className="reference internal"
                                href="#installation"
                                id="id29"
                              >
                                Installation
                              </a>
                            </p>
                            <ul>
                              <li>
                                <p>
                                  <a
                                    className="reference internal"
                                    href="#prerequisites"
                                    id="id30"
                                  >
                                    Prerequisites
                                  </a>
                                </p>
                                <ul>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#git"
                                        id="id31"
                                      >
                                        Git
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#python3-6"
                                        id="id32"
                                      >
                                        Python3.6
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#pip3"
                                        id="id33"
                                      >
                                        Pip3
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#node-js"
                                        id="id34"
                                      >
                                        Node.js
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#npm"
                                        id="id35"
                                      >
                                        Npm
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#serve"
                                        id="id36"
                                      >
                                        Serve
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#setup-users-mongodb"
                                        id="id37"
                                      >
                                        Setup Users [MongoDB]
                                      </a>
                                    </p>
                                    <ul>
                                      <li>
                                        <p>
                                          <a
                                            className="reference internal"
                                            href="#create-read-write-user-for-fast-authentication"
                                            id="id38"
                                          >
                                            Create Read-Write user for fast
                                            authentication
                                          </a>
                                        </p>
                                      </li>
                                      <li>
                                        <p>
                                          <a
                                            className="reference internal"
                                            href="#create-read-only-user-for-master-dhcp"
                                            id="id39"
                                          >
                                            Create Read-Only user for master
                                            DHCP
                                          </a>
                                        </p>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </li>
                              <li>
                                <p>
                                  <a
                                    className="reference internal"
                                    href="#install-kea-dhcp-server"
                                    id="id40"
                                  >
                                    Install Kea DHCP Server
                                  </a>
                                </p>
                                <ul>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#retrieve-from-git"
                                        id="id41"
                                      >
                                        Retrieve from Git
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#create-configuration-scripts"
                                        id="id42"
                                      >
                                        Create configuration scripts
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#configure-before-the-build"
                                        id="id43"
                                      >
                                        Configure Before the Build
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#build"
                                        id="id44"
                                      >
                                        Build
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#install"
                                        id="id45"
                                      >
                                        Install
                                      </a>
                                    </p>
                                  </li>
                                </ul>
                              </li>
                              <li>
                                <p>
                                  <a
                                    className="reference internal"
                                    href="#install-fast-dhcp"
                                    id="id46"
                                  >
                                    Install Fast DHCP
                                  </a>
                                </p>
                              </li>
                              <li>
                                <p>
                                  <a
                                    className="reference internal"
                                    href="#setup-fast-authentication"
                                    id="id47"
                                  >
                                    Setup FAST Authentication
                                  </a>
                                </p>
                                <ul>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#configurations"
                                        id="id48"
                                      >
                                        Configurations
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#set-up-fast-api-authentication-secrets"
                                        id="id49"
                                      >
                                        Set up fast api authentication secrets
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#mongo-based-authentication"
                                        id="id50"
                                      >
                                        Mongo Based Authentication
                                      </a>
                                    </p>
                                    <ul>
                                      <li>
                                        <p>
                                          <a
                                            className="reference internal"
                                            href="#add-a-new-user"
                                            id="id51"
                                          >
                                            Add a new user
                                          </a>
                                        </p>
                                      </li>
                                      <li>
                                        <p>
                                          <a
                                            className="reference internal"
                                            href="#add-permissions-for-a-server"
                                            id="id52"
                                          >
                                            Add permissions for a server
                                          </a>
                                        </p>
                                      </li>
                                    </ul>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#csv-based-based-authentication"
                                        id="id53"
                                      >
                                        CSV Based Based Authentication
                                      </a>
                                    </p>
                                    <ul>
                                      <li>
                                        <p>
                                          <a
                                            className="reference internal"
                                            href="#add-a-user"
                                            id="id54"
                                          >
                                            Add a user
                                          </a>
                                        </p>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </li>
                              <li>
                                <p>
                                  <a
                                    className="reference internal"
                                    href="#install-master-dhcp-auth-server"
                                    id="id55"
                                  >
                                    Install Master DHCP Auth Server
                                  </a>
                                </p>
                                <ul>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#clone-git-repository"
                                        id="id56"
                                      >
                                        Clone git repository
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#create-a-virtual-environment"
                                        id="id57"
                                      >
                                        Create a virtual environment
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#install-required-modules"
                                        id="id58"
                                      >
                                        Install required modules
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#id1"
                                        id="id59"
                                      >
                                        Configurations
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#running-the-server"
                                        id="id60"
                                      >
                                        Running the Server
                                      </a>
                                    </p>
                                    <ul>
                                      <li>
                                        <p>
                                          <a
                                            className="reference internal"
                                            href="#using-python-interpreter"
                                            id="id61"
                                          >
                                            Using python interpreter
                                          </a>
                                        </p>
                                      </li>
                                      <li>
                                        <p>
                                          <a
                                            className="reference internal"
                                            href="#using-gunicorn"
                                            id="id62"
                                          >
                                            Using gunicorn
                                          </a>
                                        </p>
                                        <ul>
                                          <li>
                                            <p>
                                              <a
                                                className="reference internal"
                                                href="#install-gunicorn-using-pip"
                                                id="id63"
                                              >
                                                Install gunicorn using pip
                                              </a>
                                            </p>
                                          </li>
                                          <li>
                                            <p>
                                              <a
                                                className="reference internal"
                                                href="#run-using-gunicorn-via-command-line"
                                                id="id64"
                                              >
                                                Run using gunicorn via command
                                                line
                                              </a>
                                            </p>
                                          </li>
                                          <li>
                                            <p>
                                              <a
                                                className="reference internal"
                                                href="#running-as-a-supervisord-service-with-gunicorn-thread"
                                                id="id65"
                                              >
                                                Running as a supervisord service
                                                with gunicorn thread
                                              </a>
                                            </p>
                                          </li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </li>
                              <li>
                                <p>
                                  <a
                                    className="reference internal"
                                    href="#install-master-dhcp-frontend"
                                    id="id66"
                                  >
                                    Install Master DHCP Frontend
                                  </a>
                                </p>
                                <ul>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#id2"
                                        id="id67"
                                      >
                                        Clone git repository
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#install-requirements"
                                        id="id68"
                                      >
                                        Install requirements
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#prepare-local-ieee-mac-vendor-database"
                                        id="id69"
                                      >
                                        Prepare Local IEEE MAC Vendor database
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#id3"
                                        id="id70"
                                      >
                                        Configurations
                                      </a>
                                    </p>
                                    <ul>
                                      <li>
                                        <p>
                                          <a
                                            className="reference internal"
                                            href="#config-json"
                                            id="id71"
                                          >
                                            config.json
                                          </a>
                                        </p>
                                      </li>
                                      <li>
                                        <p>
                                          <a
                                            className="reference internal"
                                            href="#apikeys-json"
                                            id="id72"
                                          >
                                            apikeys.json
                                          </a>
                                        </p>
                                      </li>
                                      <li>
                                        <p>
                                          <a
                                            className="reference internal"
                                            href="#users-csv"
                                            id="id73"
                                          >
                                            users.csv
                                          </a>
                                        </p>
                                      </li>
                                    </ul>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#id4"
                                        id="id74"
                                      >
                                        Running the server
                                      </a>
                                    </p>
                                    <ul>
                                      <li>
                                        <p>
                                          <a
                                            className="reference internal"
                                            href="#running-development-server"
                                            id="id75"
                                          >
                                            Running development server
                                          </a>
                                        </p>
                                      </li>
                                      <li>
                                        <p>
                                          <a
                                            className="reference internal"
                                            href="#running-production-server"
                                            id="id76"
                                          >
                                            Running production server
                                          </a>
                                        </p>
                                        <ul>
                                          <li>
                                            <p>
                                              <a
                                                className="reference internal"
                                                href="#create-build-file"
                                                id="id77"
                                              >
                                                Create build file
                                              </a>
                                            </p>
                                          </li>
                                          <li>
                                            <p>
                                              <a
                                                className="reference internal"
                                                href="#run-as-supervisord"
                                                id="id78"
                                              >
                                                Run as Supervisord
                                              </a>
                                            </p>
                                          </li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <p>
                              <a
                                className="reference internal"
                                href="#master-dhcp-auth-endpoints"
                                id="id79"
                              >
                                Master DHCP Auth Endpoints
                              </a>
                            </p>
                            <ul>
                              <li>
                                <p>
                                  <a
                                    className="reference internal"
                                    href="#get-user-session"
                                    id="id80"
                                  >
                                    001 Get User Session
                                  </a>
                                </p>
                                <ul>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#api-information"
                                        id="id81"
                                      >
                                        API Information
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#request-parameters"
                                        id="id82"
                                      >
                                        Request Parameters
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#response-parameters"
                                        id="id83"
                                      >
                                        Response Parameters:
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#sample-request-url"
                                        id="id84"
                                      >
                                        Sample Request URL
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#sample-request-object"
                                        id="id85"
                                      >
                                        Sample Request Object
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#sample-response-object"
                                        id="id86"
                                      >
                                        Sample Response Object
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#error-codes"
                                        id="id87"
                                      >
                                        Error Codes
                                      </a>
                                    </p>
                                  </li>
                                </ul>
                              </li>
                              <li>
                                <p>
                                  <a
                                    className="reference internal"
                                    href="#authenticate-user"
                                    id="id88"
                                  >
                                    002 Authenticate user
                                  </a>
                                </p>
                                <ul>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#id5"
                                        id="id89"
                                      >
                                        API Information
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#id6"
                                        id="id90"
                                      >
                                        Request Parameters
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#id7"
                                        id="id91"
                                      >
                                        Response Parameters:
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#id8"
                                        id="id92"
                                      >
                                        Sample Request URL
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#id9"
                                        id="id93"
                                      >
                                        Sample Request Object
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#id10"
                                        id="id94"
                                      >
                                        Sample Response Object
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#id11"
                                        id="id95"
                                      >
                                        Error Codes
                                      </a>
                                    </p>
                                  </li>
                                </ul>
                              </li>
                              <li>
                                <p>
                                  <a
                                    className="reference internal"
                                    href="#get-auth-tokens"
                                    id="id96"
                                  >
                                    003 Get Auth Tokens
                                  </a>
                                </p>
                                <ul>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#id12"
                                        id="id97"
                                      >
                                        API Information
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#id13"
                                        id="id98"
                                      >
                                        Request Parameters
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#id14"
                                        id="id99"
                                      >
                                        Response Parameters:
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#id15"
                                        id="id100"
                                      >
                                        Sample Request URL
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#id16"
                                        id="id101"
                                      >
                                        Sample Request Object
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#id17"
                                        id="id102"
                                      >
                                        Sample Response Object
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#id18"
                                        id="id103"
                                      >
                                        Error Codes
                                      </a>
                                    </p>
                                  </li>
                                </ul>
                              </li>
                              <li>
                                <p>
                                  <a
                                    className="reference internal"
                                    href="#get-serever-s-status"
                                    id="id104"
                                  >
                                    004 Get Serever’s Status
                                  </a>
                                </p>
                                <ul>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#id19"
                                        id="id105"
                                      >
                                        API Information
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#id20"
                                        id="id106"
                                      >
                                        Request Parameters
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#id21"
                                        id="id107"
                                      >
                                        Response Parameters:
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#id22"
                                        id="id108"
                                      >
                                        Sample Request URL
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#id23"
                                        id="id109"
                                      >
                                        Sample Request Object
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#id24"
                                        id="id110"
                                      >
                                        Sample Response Object
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#id25"
                                        id="id111"
                                      >
                                        Error Codes
                                      </a>
                                    </p>
                                  </li>
                                </ul>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <p>
                              <a
                                className="reference internal"
                                href="#master-dhcp-gui-user-guide"
                                id="id112"
                              >
                                Master DHCP GUI User Guide
                              </a>
                            </p>
                            <ul>
                              <li>
                                <p>
                                  <a
                                    className="reference internal"
                                    href="#change-lab-and-server"
                                    id="id113"
                                  >
                                    Change lab and server
                                  </a>
                                </p>
                              </li>
                              <li>
                                <p>
                                  <a
                                    className="reference internal"
                                    href="#subnets"
                                    id="id114"
                                  >
                                    Subnets
                                  </a>
                                </p>
                                <ul>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#view-subnet"
                                        id="id115"
                                      >
                                        View subnet
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#add-subnet"
                                        id="id116"
                                      >
                                        Add subnet
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#modify-subnet"
                                        id="id117"
                                      >
                                        Modify subnet
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#delete-subnet"
                                        id="id118"
                                      >
                                        Delete subnet
                                      </a>
                                    </p>
                                  </li>
                                </ul>
                              </li>
                              <li>
                                <p>
                                  <a
                                    className="reference internal"
                                    href="#leases"
                                    id="id119"
                                  >
                                    Leases
                                  </a>
                                </p>
                                <ul>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#view-leases"
                                        id="id120"
                                      >
                                        View leases
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#add-lease"
                                        id="id121"
                                      >
                                        Add lease
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#modify-lease"
                                        id="id122"
                                      >
                                        Modify lease
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#delete-lease"
                                        id="id123"
                                      >
                                        Delete lease
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#wipe-lease"
                                        id="id124"
                                      >
                                        Wipe lease
                                      </a>
                                    </p>
                                  </li>
                                </ul>
                              </li>
                              <li>
                                <p>
                                  <a
                                    className="reference internal"
                                    href="#client-classes"
                                    id="id125"
                                  >
                                    Client Classes
                                  </a>
                                </p>
                                <ul>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#view-client-classes"
                                        id="id126"
                                      >
                                        View client classes
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#add-client-classes"
                                        id="id127"
                                      >
                                        Add client classes
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#modify-client-classes"
                                        id="id128"
                                      >
                                        Modify client classes
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#delete-client-classes"
                                        id="id129"
                                      >
                                        Delete client classes
                                      </a>
                                    </p>
                                  </li>
                                </ul>
                              </li>
                              <li>
                                <p>
                                  <a
                                    className="reference internal"
                                    href="#dhcp-dump"
                                    id="id130"
                                  >
                                    DHCP Dump
                                  </a>
                                </p>
                                <ul>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#trigger-packet-collection"
                                        id="id131"
                                      >
                                        Trigger Packet Collection
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#get-packets"
                                        id="id132"
                                      >
                                        Get Packets
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#stop-packet-collection"
                                        id="id133"
                                      >
                                        Stop Packet Collection
                                      </a>
                                    </p>
                                  </li>
                                </ul>
                              </li>
                              <li>
                                <p>
                                  <a
                                    className="reference internal"
                                    href="#raw-api"
                                    id="id134"
                                  >
                                    RAW API
                                  </a>
                                </p>
                                <ul>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#get-calls"
                                        id="id135"
                                      >
                                        GET Calls
                                      </a>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <a
                                        className="reference internal"
                                        href="#post-calls"
                                        id="id136"
                                      >
                                        POST Calls
                                      </a>
                                    </p>
                                  </li>
                                </ul>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <p>
                          <a
                            className="reference internal"
                            href="#indices-and-tables"
                            id="id137"
                          >
                            Indices and tables
                          </a>
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div className="section" id="introduction">
                    <h2>
                      <a className="toc-backref" href="#id27">
                        Introduction
                      </a>
                      <a
                        className="headerlink"
                        href="#introduction"
                        title="Permalink to this headline"
                      >
                        ¶
                      </a>
                    </h2>
                    <p>
                      Master DHCP is a platform for managing and monitoring
                      multiple DHCP servers.
                    </p>
                    <div className="line-block">
                      <div className="line">
                        <br />
                      </div>
                    </div>
                  </div>
                  <div className="section" id="architecture">
                    <h2>
                      <a className="toc-backref" href="#id28">
                        Architecture
                      </a>
                      <a
                        className="headerlink"
                        href="#architecture"
                        title="Permalink to this headline"
                      >
                        ¶
                      </a>
                    </h2>
                    <div className="line-block">
                      <div className="line">
                        <br />
                      </div>
                    </div>
                    <p>Master DHCP consists of the following components:</p>
                    <ol className="arabic simple">
                      <li>
                        <p>
                          GUI - This is the user interface for managing and
                          monitoring Kea servers.
                        </p>
                      </li>
                      <li>
                        <p>
                          Master DHCP Auth - Authentication server for Master
                          DHCP GUI.
                        </p>
                      </li>
                      <li>
                        <p>
                          Kea DHCP Servers - Master DHCP can handle multiple Kea
                          Servers at a time. FAST DHCP and DHCP Monitor need to
                          be installed on each Kea servers. Also, each FAST DHCP
                          server should be equipped with FAST API AUTH to ensure
                          secure communication between GUI and Kea servers.
                        </p>
                      </li>
                      <li>
                        <p>
                          Authentication Database: This could be a centralized
                          Mongo DB or CSV Based database.
                        </p>
                      </li>
                    </ol>
                    <p>
                      Below shows the architecture of Master DHCP with two Kea
                      servers. This set up uses MongoDB as the authentication
                      database.
                    </p>
                    <a
                      className="reference internal image-reference"
                      href="_images/architecture.png"
                    >
                      <img
                        alt="Alternative text"
                        src="_images/architecture.png"
                        style={{ width: "600px" }}
                      />
                    </a>
                    <div className="line-block">
                      <div className="line">
                        <br />
                      </div>
                    </div>
                  </div>
                  <div className="section" id="installation">
                    <h2>
                      <a className="toc-backref" href="#id29">
                        Installation
                      </a>
                      <a
                        className="headerlink"
                        href="#installation"
                        title="Permalink to this headline"
                      >
                        ¶
                      </a>
                    </h2>
                    <div className="line-block">
                      <div className="line">
                        <br />
                      </div>
                    </div>
                    <p>
                      Installation of Master DHCP involves the following steps;
                    </p>
                    <blockquote>
                      <div>
                        <ol className="arabic simple">
                          <li>
                            <p>
                              Install fastdhcp on each kea servers user wanted
                              to manage.
                            </p>
                          </li>
                          <li>
                            <p>
                              setup fast api authentication for each fastdhcp
                              servers.
                            </p>
                          </li>
                          <li>
                            <p>
                              setup masterdhcpauth for authenticating master
                              GUI.
                            </p>
                          </li>
                          <li>
                            <p>Install masterdhcp frontend GUI.</p>
                          </li>
                        </ol>
                      </div>
                    </blockquote>
                    <div className="line-block">
                      <div className="line">
                        <br />
                      </div>
                    </div>
                    <div className="section" id="prerequisites">
                      <h3>
                        <a className="toc-backref" href="#id30">
                          Prerequisites
                        </a>
                        <a
                          className="headerlink"
                          href="#prerequisites"
                          title="Permalink to this headline"
                        >
                          ¶
                        </a>
                      </h3>
                      <div className="section" id="git">
                        <h4>
                          <a className="toc-backref" href="#id31">
                            Git
                          </a>
                          <a
                            className="headerlink"
                            href="#git"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <p>
                          Type{" "}
                          <code className="docutils literal notranslate">
                            <span className="pre">git</span>
                          </code>{" "}
                          command to verify git is installed on your machine.
                        </p>
                        <div className="line-block">
                          <div className="line">
                            <br />
                          </div>
                        </div>
                        <div className="highlight-default notranslate">
                          <div className="highlight">
                            <pre>
                              <span />
                              <span className="n">git</span>{" "}
                              <span className="o">--</span>
                              <span className="n">version</span>
                              {"\n"}
                            </pre>
                          </div>
                        </div>
                      </div>
                      <div className="section" id="python3-6">
                        <h4>
                          <a className="toc-backref" href="#id32">
                            Python3.6
                          </a>
                          <a
                            className="headerlink"
                            href="#python3-6"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <p>
                          This project requires python 3.6 or above installed on
                          your machine. Type{" "}
                          <code className="docutils literal notranslate">
                            <span className="pre">python3</span>
                          </code>{" "}
                          commands to verify the version installed.
                        </p>
                        <div className="line-block">
                          <div className="line">
                            <br />
                          </div>
                        </div>
                        <div className="highlight-default notranslate">
                          <div className="highlight">
                            <pre>
                              <span />
                              <span className="n">python3</span>{" "}
                              <span className="o">--</span>
                              <span className="n">version</span>
                              {"\n"}
                            </pre>
                          </div>
                        </div>
                      </div>
                      <div className="section" id="pip3">
                        <h4>
                          <a className="toc-backref" href="#id33">
                            Pip3
                          </a>
                          <a
                            className="headerlink"
                            href="#pip3"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <p>
                          Pip is the package installer for Python. Type{" "}
                          <code className="docutils literal notranslate">
                            <span className="pre">pip3</span>
                          </code>{" "}
                          command to verify the version installed.
                        </p>
                        <div className="line-block">
                          <div className="line">
                            <br />
                          </div>
                        </div>
                        <div className="highlight-default notranslate">
                          <div className="highlight">
                            <pre>
                              <span />
                              <span className="n">pip3</span>{" "}
                              <span className="o">--</span>
                              <span className="n">version</span>
                              {"\n"}
                            </pre>
                          </div>
                        </div>
                      </div>
                      <div className="section" id="node-js">
                        <h4>
                          <a className="toc-backref" href="#id34">
                            Node.js
                          </a>
                          <a
                            className="headerlink"
                            href="#node-js"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <p>
                          Node.js is an open-source cross-platform JavaScript
                          (JS) runtime environment. To verify whether node is
                          installed or not,
                        </p>
                        <div className="line-block">
                          <div className="line">
                            <br />
                          </div>
                        </div>
                        <div className="highlight-default notranslate">
                          <div className="highlight">
                            <pre>
                              <span />
                              <span className="n">node</span>{" "}
                              <span className="o">--</span>
                              <span className="n">version</span>
                              {"\n"}
                            </pre>
                          </div>
                        </div>
                      </div>
                      <div className="section" id="npm">
                        <h4>
                          <a className="toc-backref" href="#id35">
                            Npm
                          </a>
                          <a
                            className="headerlink"
                            href="#npm"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <div className="line-block">
                          <div className="line">
                            <br />
                          </div>
                        </div>
                        <p>
                          Node Package Manager (npm) is Node’s official package
                          manager, used for installing and managing package
                          dependencies. To verify whether npm is installed or
                          not,
                        </p>
                        <div className="highlight-default notranslate">
                          <div className="highlight">
                            <pre>
                              <span />
                              <span className="n">npm</span>{" "}
                              <span className="o">--</span>
                              <span className="n">version</span>
                              {"\n"}
                            </pre>
                          </div>
                        </div>
                      </div>
                      <div className="section" id="serve">
                        <h4>
                          <a className="toc-backref" href="#id36">
                            Serve
                          </a>
                          <a
                            className="headerlink"
                            href="#serve"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <div className="line-block">
                          <div className="line">
                            <br />
                          </div>
                        </div>
                        <p>Uninstall serve if it’s already installed:</p>
                        <div className="highlight-default notranslate">
                          <div className="highlight">
                            <pre>
                              <span />
                              <span className="n">npm</span>{" "}
                              <span className="n">uninstall</span>{" "}
                              <span className="o">-</span>
                              <span className="n">g</span>{" "}
                              <span className="n">serve</span>
                              {"\n"}
                            </pre>
                          </div>
                        </div>
                        <p>install using npm</p>
                        <div className="line-block">
                          <div className="line">
                            <br />
                          </div>
                        </div>
                        <div className="highlight-default notranslate">
                          <div className="highlight">
                            <pre>
                              <span />
                              <span className="n">npm</span>{" "}
                              <span className="n">i</span>{" "}
                              <span className="n">serve</span>
                              {"\n"}
                            </pre>
                          </div>
                        </div>
                      </div>
                      <div className="section" id="setup-users-mongodb">
                        <h4>
                          <a className="toc-backref" href="#id37">
                            Setup Users [MongoDB]
                          </a>
                          <a
                            className="headerlink"
                            href="#setup-users-mongodb"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <p>
                          This section is applicable only when MongoDB is used
                          for authentication.
                        </p>
                        <p>Preferably, Master DHCP requires two db users.</p>
                        <blockquote>
                          <div>
                            <ol className="arabic simple">
                              <li>
                                <p>
                                  A Read-Write user for fast authentication.
                                </p>
                              </li>
                              <li>
                                <p>A Read-Only user for master DHCP.</p>
                              </li>
                            </ol>
                          </div>
                        </blockquote>
                        <p>
                          To create these users, we need to have an admin user
                          with “userAdmin” privileges.
                        </p>
                        <p>To check the previlages of a admin user,</p>
                        <ol className="arabic simple">
                          <li>
                            <p>login to the Mongo Shell.</p>
                          </li>
                        </ol>
                        <div className="line-block">
                          <div className="line">
                            <br />
                          </div>
                        </div>
                        <div className="highlight-default notranslate">
                          <div className="highlight">
                            <pre>
                              <span />
                              mongo
                              "mongodb://&lt;adminuser&gt;:&lt;password&gt;@mongodb0.example.net:27017,
                              {"\n"}mongodb1.example.net:27017,{"\n"}
                              mongodb2.example.net:27017/?authSource=admin&amp;replicaSet=rs-dev"
                              {"\n"}
                            </pre>
                          </div>
                        </div>
                        <ol className="arabic simple" start={2}>
                          <li>
                            <p>select the admin database.</p>
                          </li>
                        </ol>
                        <div className="line-block">
                          <div className="line">
                            <br />
                          </div>
                        </div>
                        <div className="highlight-default notranslate">
                          <div className="highlight">
                            <pre>
                              <span />
                              <span className="n">use</span>{" "}
                              <span className="n">admin</span>
                              {"\n"}
                            </pre>
                          </div>
                        </div>
                        <ol className="arabic simple" start={3}>
                          <li>
                            <p>
                              Display users and verify the user has
                              “userAdmin”/”userAdminAnyDatabase” roles.
                            </p>
                          </li>
                        </ol>
                        <div className="line-block">
                          <div className="line">
                            <br />
                          </div>
                        </div>
                        <div className="highlight-default notranslate">
                          <div className="highlight">
                            <pre>
                              <span />
                              <span className="n">show</span>{" "}
                              <span className="n">users</span>
                              {"\n"}
                              {"    "}
                              <span className="n">OR</span>
                              {"\n"}
                              <span className="n">db</span>
                              <span className="o">.</span>
                              <span className="n">getUsers</span>
                              <span className="p">()</span>
                              {"\n"}
                            </pre>
                          </div>
                        </div>
                        <div
                          className="section"
                          id="create-read-write-user-for-fast-authentication"
                        >
                          <h5>
                            <a className="toc-backref" href="#id38">
                              Create Read-Write user for fast authentication
                            </a>
                            <a
                              className="headerlink"
                              href="#create-read-write-user-for-fast-authentication"
                              title="Permalink to this headline"
                            >
                              ¶
                            </a>
                          </h5>
                          <ol className="arabic simple">
                            <li>
                              <p>login to the Mongo Shell.</p>
                            </li>
                          </ol>
                          <div className="line-block">
                            <div className="line">
                              <br />
                            </div>
                          </div>
                          <div className="highlight-default notranslate">
                            <div className="highlight">
                              <pre>
                                <span />
                                mongo
                                "mongodb://&lt;adminuser&gt;:&lt;password&gt;@mongodb0.example.net:27017,
                                {"\n"}mongodb1.example.net:27017,{"\n"}
                                mongodb2.example.net:27017/?authSource=admin&amp;replicaSet=rs-dev"
                                {"\n"}
                              </pre>
                            </div>
                          </div>
                          <ol className="arabic simple" start={2}>
                            <li>
                              <p>select the admin database.</p>
                            </li>
                          </ol>
                          <div className="line-block">
                            <div className="line">
                              <br />
                            </div>
                          </div>
                          <div className="highlight-default notranslate">
                            <div className="highlight">
                              <pre>
                                <span />
                                <span className="n">use</span>{" "}
                                <span className="n">admin</span>
                                {"\n"}
                              </pre>
                            </div>
                          </div>
                          <ol className="arabic simple" start={3}>
                            <li>
                              <p>Create a user.</p>
                            </li>
                          </ol>
                          <div className="line-block">
                            <div className="line">
                              <br />
                            </div>
                          </div>
                          <div className="highlight-default notranslate">
                            <div className="highlight">
                              <pre>
                                <span />
                                <span className="n">db</span>
                                <span className="o">.</span>
                                <span className="n">createUser</span>
                                <span className="p">({"{"}</span>
                                <span className="n">user</span>
                                <span className="p">:</span>
                                <span className="s1">'fastAuthUser'</span>
                                <span className="p">,</span>{" "}
                                <span className="n">pwd</span>
                                <span className="p">:</span>{" "}
                                <span className="s1">'&lt;&gt;'</span>
                                <span className="p">,</span>{" "}
                                <span className="n">roles</span>
                                <span className="p">:</span>{" "}
                                <span className="p">[</span>
                                <span className="s1">'readWrite'</span>
                                <span className="p">,</span>{" "}
                                <span className="s1">
                                  'readWriteAnyDatabase'
                                </span>
                                <span className="p">]{"}"})</span>
                                {"\n"}
                              </pre>
                            </div>
                          </div>
                          <div className="line-block">
                            <div className="line">
                              <br />
                            </div>
                          </div>
                          <div className="highlight-default notranslate">
                            <div className="highlight">
                              <pre>
                                <span />
                                <span className="n">Successfully</span>{" "}
                                <span className="n">added</span>
                                {"\n"}
                                <span className="n">user</span>
                                <span className="p">:</span>{" "}
                                <span className="p">{"{"}</span>
                                {"\n"}
                                {"   "}
                                <span className="s2">"user"</span>{" "}
                                <span className="p">:</span>{" "}
                                <span className="s2">"fastAuthUser"</span>
                                <span className="p">,</span>
                                {"\n"}
                                {"   "}
                                <span className="s2">"roles"</span>{" "}
                                <span className="p">:</span>{" "}
                                <span className="p">[</span>
                                {"\n"}
                                {"        "}
                                <span className="s2">"readWrite"</span>
                                <span className="p">,</span>
                                {"\n"}
                                {"        "}
                                <span className="s2">
                                  "readWriteAnyDatabase"
                                </span>
                                {"\n"}
                                <span className="p">]</span>
                                {"\n"}
                                <span className="p">{"}"}</span>
                                {"\n"}
                              </pre>
                            </div>
                          </div>
                          <ol className="arabic simple" start={4}>
                            <li>
                              <p>
                                We can grant new roles later aswell using
                                grantRolesToUser,
                              </p>
                            </li>
                          </ol>
                          <div className="line-block">
                            <div className="line">
                              <br />
                            </div>
                          </div>
                          <div className="highlight-default notranslate">
                            <div className="highlight">
                              <pre>
                                <span />
                                <span className="n">db</span>
                                <span className="o">.</span>
                                <span className="n">grantRolesToUser</span>
                                <span className="p">(</span>
                                <span className="s2">"fastAuthUser"</span>
                                <span className="p">,</span>{" "}
                                <span className="p">[</span>
                                <span className="s2">
                                  "readWriteAnyDatabase"
                                </span>
                                <span className="p">])</span>
                                {"\n"}
                              </pre>
                            </div>
                          </div>
                          <div className="line-block">
                            <div className="line">
                              <br />
                            </div>
                          </div>
                        </div>
                        <div
                          className="section"
                          id="create-read-only-user-for-master-dhcp"
                        >
                          <h5>
                            <a className="toc-backref" href="#id39">
                              Create Read-Only user for master DHCP
                            </a>
                            <a
                              className="headerlink"
                              href="#create-read-only-user-for-master-dhcp"
                              title="Permalink to this headline"
                            >
                              ¶
                            </a>
                          </h5>
                          <ol className="arabic simple">
                            <li>
                              <p>login to the Mongo Shell.</p>
                            </li>
                          </ol>
                          <div className="line-block">
                            <div className="line">
                              <br />
                            </div>
                          </div>
                          <div className="highlight-default notranslate">
                            <div className="highlight">
                              <pre>
                                <span />
                                mongo
                                "mongodb://&lt;adminuser&gt;:&lt;password&gt;@mongodb0.example.net:27017,
                                {"\n"}mongodb1.example.net:27017,{"\n"}
                                mongodb2.example.net:27017/?authSource=admin&amp;replicaSet=rs-dev"
                                {"\n"}
                              </pre>
                            </div>
                          </div>
                          <ol className="arabic simple" start={2}>
                            <li>
                              <p>select the admin database.</p>
                            </li>
                          </ol>
                          <div className="line-block">
                            <div className="line">
                              <br />
                            </div>
                          </div>
                          <div className="highlight-default notranslate">
                            <div className="highlight">
                              <pre>
                                <span />
                                <span className="n">use</span>{" "}
                                <span className="n">admin</span>
                                {"\n"}
                              </pre>
                            </div>
                          </div>
                          <ol className="arabic simple" start={3}>
                            <li>
                              <p>Create a user.</p>
                            </li>
                          </ol>
                          <div className="line-block">
                            <div className="line">
                              <br />
                            </div>
                          </div>
                          <div className="highlight-default notranslate">
                            <div className="highlight">
                              <pre>
                                <span />
                                <span className="n">db</span>
                                <span className="o">.</span>
                                <span className="n">createUser</span>
                                <span className="p">({"{"}</span>
                                <span className="n">user</span>
                                <span className="p">:</span>
                                <span className="s1">'fastAuthUser-RO'</span>
                                <span className="p">,</span>{" "}
                                <span className="n">pwd</span>
                                <span className="p">:</span>{" "}
                                <span className="s1">'&lt;&gt;'</span>
                                <span className="p">,</span>{" "}
                                <span className="n">roles</span>
                                <span className="p">:</span>{" "}
                                <span className="p">[</span>
                                <span className="s1">'read'</span>
                                <span className="p">,</span>{" "}
                                <span className="s1">'readAnyDatabase'</span>
                                <span className="p">]{"}"})</span>
                                {"\n"}
                              </pre>
                            </div>
                          </div>
                          <div className="line-block">
                            <div className="line">
                              <br />
                            </div>
                          </div>
                          <div className="highlight-default notranslate">
                            <div className="highlight">
                              <pre>
                                <span />
                                <span className="n">Successfully</span>{" "}
                                <span className="n">added</span>
                                {"\n"}
                                <span className="n">user</span>
                                <span className="p">:</span>{" "}
                                <span className="p">{"{"}</span>
                                {"\n"}
                                {"   "}
                                <span className="s2">"user"</span>{" "}
                                <span className="p">:</span>{" "}
                                <span className="s2">"fastAuthUser-RO"</span>
                                <span className="p">,</span>
                                {"\n"}
                                {"   "}
                                <span className="s2">"roles"</span>{" "}
                                <span className="p">:</span>{" "}
                                <span className="p">[</span>
                                {"\n"}
                                {"        "}
                                <span className="s2">"read"</span>
                                <span className="p">,</span>
                                {"\n"}
                                {"        "}
                                <span className="s2">"readAnyDatabase"</span>
                                {"\n"}
                                {"   "}
                                <span className="p">]</span>
                                {"\n"}
                                {"\n"}
                                <span className="p">{"}"}</span>
                                {"\n"}
                              </pre>
                            </div>
                          </div>
                          <ol className="arabic simple" start={4}>
                            <li>
                              <p>
                                We can grant new roles later aswell using
                                grantRolesToUser,
                              </p>
                            </li>
                          </ol>
                          <div className="line-block">
                            <div className="line">
                              <br />
                            </div>
                          </div>
                          <div className="highlight-default notranslate">
                            <div className="highlight">
                              <pre>
                                <span />
                                <span className="n">db</span>
                                <span className="o">.</span>
                                <span className="n">grantRolesToUser</span>
                                <span className="p">(</span>
                                <span className="s2">"fastAuthUser-RO"</span>
                                <span className="p">,</span>{" "}
                                <span className="p">[</span>
                                <span className="s2">"readAnyDatabase"</span>
                                <span className="p">])</span>
                                {"\n"}
                              </pre>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="section" id="install-kea-dhcp-server">
                      <h3>
                        <a className="toc-backref" href="#id40">
                          Install Kea DHCP Server
                        </a>
                        <a
                          className="headerlink"
                          href="#install-kea-dhcp-server"
                          title="Permalink to this headline"
                        >
                          ¶
                        </a>
                      </h3>
                      <p>
                        Kea is the next generation of DHCP software developed by
                        ISC. It supports both DHCPv4 and DHCPv6 protocols along
                        with their extensions, e.g. prefix delegation and
                        dynamic updates to DNS.
                      </p>
                      <p>
                        This section covers only the required documentation for
                        Kea Server Installation on CentOS-7.
                      </p>
                      <p>
                        For detailed documentation, refer the following link.
                      </p>
                      <div className="line-block">
                        <div className="line">
                          <br />
                        </div>
                      </div>
                      <div className="highlight-default notranslate">
                        <div className="highlight">
                          <pre>
                            <span />
                            <span className="n">https</span>
                            <span className="p">:</span>
                            <span className="o">//</span>
                            <span className="n">kea</span>
                            <span className="o">.</span>
                            <span className="n">readthedocs</span>
                            <span className="o">.</span>
                            <span className="n">io</span>
                            <span className="o">/</span>
                            <span className="n">en</span>
                            <span className="o">/</span>
                            <span className="n">kea</span>
                            <span className="o">-</span>
                            <span className="mf">1.6</span>
                            <span className="o">.</span>
                            <span className="mi">2</span>
                            <span className="o">/</span>
                            <span className="n">arm</span>
                            <span className="o">/</span>
                            <span className="n">install</span>
                            <span className="o">.</span>
                            <span className="n">html</span>
                            {"\n"}
                          </pre>
                        </div>
                      </div>
                      <div className="section" id="retrieve-from-git">
                        <h4>
                          <a className="toc-backref" href="#id41">
                            Retrieve from Git
                          </a>
                          <a
                            className="headerlink"
                            href="#retrieve-from-git"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <p>
                          The code can be checked out from{" "}
                          <a
                            className="reference external"
                            href="https://gitlab.isc.org/isc-projects/kea.git"
                          >
                            https://gitlab.isc.org/isc-projects/kea.git
                          </a>
                          :
                        </p>
                        <div className="line-block">
                          <div className="line">
                            <br />
                          </div>
                        </div>
                        <div className="highlight-default notranslate">
                          <div className="highlight">
                            <pre>
                              <span />
                              <span className="n">git</span>{" "}
                              <span className="n">clone</span>{" "}
                              <span className="n">https</span>
                              <span className="p">:</span>
                              <span className="o">//</span>
                              <span className="n">gitlab</span>
                              <span className="o">.</span>
                              <span className="n">isc</span>
                              <span className="o">.</span>
                              <span className="n">org</span>
                              <span className="o">/</span>
                              <span className="n">isc</span>
                              <span className="o">-</span>
                              <span className="n">projects</span>
                              <span className="o">/</span>
                              <span className="n">kea</span>
                              <span className="o">.</span>
                              <span className="n">git</span>
                              {"\n"}
                            </pre>
                          </div>
                        </div>
                      </div>
                      <div
                        className="section"
                        id="create-configuration-scripts"
                      >
                        <h4>
                          <a className="toc-backref" href="#id42">
                            Create configuration scripts
                          </a>
                          <a
                            className="headerlink"
                            href="#create-configuration-scripts"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <p>
                          The code checked out from the git repository does not
                          include the generated configure script, the
                          Makefile.in files, nor their related build files. They
                          can be created by running autoreconf with the –install
                          switch. This will run autoconf, aclocal, libtoolize,
                          autoheader, automake, and related commands.
                        </p>
                        <p>
                          move to root directory where configure.ac is present.
                        </p>
                        <div className="line-block">
                          <div className="line">
                            <br />
                          </div>
                        </div>
                        <div className="highlight-default notranslate">
                          <div className="highlight">
                            <pre>
                              <span />$ cd kea/{"\n"}
                            </pre>
                          </div>
                        </div>
                        <div className="line-block">
                          <div className="line">
                            <br />
                          </div>
                        </div>
                        <div className="highlight-default notranslate">
                          <div className="highlight">
                            <pre>
                              <span />$ autoreconf --install{"\n"}
                            </pre>
                          </div>
                        </div>
                      </div>
                      <div className="section" id="configure-before-the-build">
                        <h4>
                          <a className="toc-backref" href="#id43">
                            Configure Before the Build
                          </a>
                          <a
                            className="headerlink"
                            href="#configure-before-the-build"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <p>
                          Kea uses the GNU Build System to discover build
                          environment details.
                        </p>
                        <p>
                          Run ./configure with the –help switch to view the
                          different options.
                        </p>
                        <div className="line-block">
                          <div className="line">
                            <br />
                          </div>
                        </div>
                        <div className="highlight-default notranslate">
                          <div className="highlight">
                            <pre>
                              <span />$ ./configure --help{"\n"}
                            </pre>
                          </div>
                        </div>
                        <p>
                          To generate the makefiles using the defaults, simply
                          run:
                        </p>
                        <div className="line-block">
                          <div className="line">
                            <br />
                          </div>
                        </div>
                        <div className="highlight-default notranslate">
                          <div className="highlight">
                            <pre>
                              <span />$ ./configure{"\n"}
                            </pre>
                          </div>
                        </div>
                        <p>
                          If configure fails, it may be due to missing or old
                          dependencies.
                        </p>
                        <p>
                          If configure succeeds, it displays a report with the
                          parameters used to build the code. This report is
                          saved into the file config.report and is also embedded
                          into the executable binaries, e.g., kea-dhcp4.
                        </p>
                        <p>
                          Now you can type “make” to build Kea. Note that if you
                          intend to run “make check”, you must run “make” first
                          as some files need to be generated by “make” before
                          “make check” can be run.
                        </p>
                        <p>
                          When running “make install” do not use any form of
                          parallel or job server options (such as GNU make’s -j
                          option). Doing so may cause errors.
                        </p>
                      </div>
                      <div className="section" id="build">
                        <h4>
                          <a className="toc-backref" href="#id44">
                            Build
                          </a>
                          <a
                            className="headerlink"
                            href="#build"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <p>
                          After the configure step is complete, build the
                          executables from the C++ code and prepare the Python
                          scripts by running the command:
                        </p>
                        <div className="line-block">
                          <div className="line">
                            <br />
                          </div>
                        </div>
                        <div className="highlight-default notranslate">
                          <div className="highlight">
                            <pre>
                              <span />$ make{"\n"}
                            </pre>
                          </div>
                        </div>
                      </div>
                      <div className="section" id="install">
                        <h4>
                          <a className="toc-backref" href="#id45">
                            Install
                          </a>
                          <a
                            className="headerlink"
                            href="#install"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <div className="line-block">
                          <div className="line">
                            <br />
                          </div>
                        </div>
                        <p>
                          To install the Kea executables, support files, and
                          documentation, issue the command:
                        </p>
                        <div className="line-block">
                          <div className="line">
                            <br />
                          </div>
                        </div>
                        <div className="highlight-default notranslate">
                          <div className="highlight">
                            <pre>
                              <span />$ make install{"\n"}
                            </pre>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="section" id="install-fast-dhcp">
                      <h3>
                        <a className="toc-backref" href="#id46">
                          Install Fast DHCP
                        </a>
                        <a
                          className="headerlink"
                          href="#install-fast-dhcp"
                          title="Permalink to this headline"
                        >
                          ¶
                        </a>
                      </h3>
                      <div className="line-block">
                        <div className="line">
                          <br />
                        </div>
                      </div>
                      <p>Refer Fast DHCP documentation.</p>
                    </div>
                    <div className="section" id="setup-fast-authentication">
                      <h3>
                        <a className="toc-backref" href="#id47">
                          Setup FAST Authentication
                        </a>
                        <a
                          className="headerlink"
                          href="#setup-fast-authentication"
                          title="Permalink to this headline"
                        >
                          ¶
                        </a>
                      </h3>
                      <p>
                        This section will only cover configurations required for
                        master DHCP. Refer FAST API Auth documentation for more
                        information regarding fast authentication.
                      </p>
                      <div className="section" id="configurations">
                        <h4>
                          <a className="toc-backref" href="#id48">
                            Configurations
                          </a>
                          <a
                            className="headerlink"
                            href="#configurations"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <p>
                          Config file for fast authentication is present at{" "}
                          <em>/fastdhcp/fast_api_auth/conf/</em>.
                        </p>
                        <p>Open the configuration file.</p>
                        <div className="line-block">
                          <div className="line">
                            <br />
                          </div>
                        </div>
                        <div className="highlight-default notranslate">
                          <div className="highlight">
                            <pre>
                              <span />
                              <span className="n">vi</span>{" "}
                              <span className="o">/</span>
                              <span className="n">fastdhcp</span>
                              <span className="o">/</span>
                              <span className="n">fast_api_auth</span>
                              <span className="o">/</span>
                              <span className="n">conf</span>
                              <span className="o">/</span>
                              <span className="n">config</span>
                              <span className="o">.</span>
                              <span className="n">ini</span>
                              {"\n"}
                            </pre>
                          </div>
                        </div>
                        <p>Under [AUTHENTICATION], set the following fields.</p>
                        <div className="line-block">
                          <div className="line">
                            <br />
                          </div>
                        </div>
                        <div className="highlight-default notranslate">
                          <div className="highlight">
                            <pre>
                              <span />
                              <span className="n">USE_MONGODB</span>
                              <span className="o">=</span>
                              <span className="n">To</span>{" "}
                              <span className="n">use</span>{" "}
                              <span className="n">Mongo</span>{" "}
                              <span className="n">DB</span>{" "}
                              <span className="k">as</span>{" "}
                              <span className="n">a</span>{" "}
                              <span className="n">database</span>{" "}
                              <span className="k">for</span>{" "}
                              <span className="n">user</span>{" "}
                              <span className="n">management</span>
                              <span className="o">.</span>
                              {"\n"}
                              <span className="n">USE_CSV</span>
                              <span className="o">=</span>
                              <span className="n">To</span>{" "}
                              <span className="n">use</span>{" "}
                              <span className="n">a</span>{" "}
                              <span className="n">csv</span>{" "}
                              <span className="k">as</span>{" "}
                              <span className="n">a</span>{" "}
                              <span className="n">database</span>{" "}
                              <span className="k">for</span>{" "}
                              <span className="n">user</span>{" "}
                              <span className="n">management</span>
                              <span className="o">.</span>
                              {"\n"}
                              <span className="n">USE_REPLICA_SET</span>
                              <span className="o">=</span>
                              <span className="kc">True</span>
                              {"\n"}
                              <span className="n">MONGODB_HOST</span>
                              <span className="o">=</span>
                              <span className="n">IP</span>
                              <span className="p">:</span>
                              <span className="n">PORT</span>{" "}
                              <span className="nb">format</span>{" "}
                              <span className="k">for</span>{" "}
                              <span className="n">mongodb</span>
                              <span className="o">.</span>{" "}
                              <span className="k">if</span>{" "}
                              <span className="n">replica</span>{" "}
                              <span className="nb">set</span>
                              <span className="p">,</span>{" "}
                              <span className="n">put</span>{" "}
                              <span className="n">comma</span>{" "}
                              <span className="n">seperated</span>
                              <span className="o">.</span>
                              {"\n"}
                              <span className="n">MONGODB_USERNAME</span>
                              <span className="o">=&lt;</span>
                              <span className="n">Read</span>
                              <span className="o">-</span>
                              <span className="n">Write</span>{" "}
                              <span className="n">username</span>
                              <span className="o">&gt;</span>
                              {"\n"}
                              <span className="n">MONGODB_RS</span>
                              <span className="o">=</span>
                              <span className="n">REPLICA</span>{" "}
                              <span className="n">SET</span>{" "}
                              <span className="n">Name</span>{" "}
                              <span className="k">if</span>{" "}
                              <span className="n">using</span>{" "}
                              <span className="n">replica</span>{" "}
                              <span className="n">sets</span>
                              <span className="o">.</span>
                              {"\n"}
                              <span className="n">MONGODB_DB_NAME</span>
                              <span className="o">=</span>
                              <span className="n">Database</span>{" "}
                              <span className="n">name</span>
                              {"\n"}
                              <span className="n">COLLECTION_NAME</span>
                              <span className="o">=</span>
                              <span className="n">Collection</span>{" "}
                              <span className="n">name</span>
                              <span className="o">.</span>
                              {"\n"}
                              <span className="n">SECRET_DIR</span>
                              <span className="o">=</span>
                              <span className="n">Directory</span>{" "}
                              <span className="n">name</span>{" "}
                              <span className="n">to</span>{" "}
                              <span className="n">store</span>{" "}
                              <span className="n">secret</span>{" "}
                              <span className="n">file</span>
                              {"\n"}
                              <span className="n">SECRET_KEY_FILE_NAME</span>
                              <span className="o">=</span>
                              <span className="n">Secret</span>{" "}
                              <span className="n">file</span>{" "}
                              <span className="n">name</span>
                              {"\n"}
                            </pre>
                          </div>
                        </div>
                      </div>
                      <div
                        className="section"
                        id="set-up-fast-api-authentication-secrets"
                      >
                        <h4>
                          <a className="toc-backref" href="#id49">
                            Set up fast api authentication secrets
                          </a>
                          <a
                            className="headerlink"
                            href="#set-up-fast-api-authentication-secrets"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <p>
                          Inorder to do any operation, we need to setup an ADMIN
                          secret key.
                        </p>
                        <p>
                          To create a new admin key and Mongo Password, run the
                          command from root folder. If USE_MONGODB=true, the
                          setup command will prompt for the mongodb read-write
                          user’s password as well.
                        </p>
                        <div className="line-block">
                          <div className="line">
                            <br />
                          </div>
                        </div>
                        <div className="highlight-default notranslate">
                          <div className="highlight">
                            <pre>
                              <span />$ python3 -m fast_api_auth.setup{"\n"}
                            </pre>
                          </div>
                        </div>
                        <p>
                          If the secrets already exists, below error will be
                          thrown. In such cases, delete the SECRET_KEY_FILE_NAME
                          first and try again.
                        </p>
                        <div className="line-block">
                          <div className="line">
                            <br />
                          </div>
                        </div>
                        <div className="highlight-default notranslate">
                          <div className="highlight">
                            <pre>
                              <span />
                              Exception('A SECRET key already exists',){"\n"}
                              {"\n"}$ rm
                              fast_api_auth/&lt;SECRET_DIR&gt;/&lt;SECRET_KEY_FILE_NAME&gt;
                              {"\n"}
                            </pre>
                          </div>
                        </div>
                        <p>Now, try again,</p>
                        <div className="line-block">
                          <div className="line">
                            <br />
                          </div>
                        </div>
                        <div className="highlight-default notranslate">
                          <div className="highlight">
                            <pre>
                              <span />$ python3 -m fast_api_auth.setup{"\n"}
                              {"\n"}Enter Admin SECRET Key:{"\n"}Enter MONGODB
                              Password: &lt;Read-Write user password created&gt;
                              {"\n"}
                            </pre>
                          </div>
                        </div>
                      </div>
                      <div className="section" id="mongo-based-authentication">
                        <h4>
                          <a className="toc-backref" href="#id50">
                            Mongo Based Authentication
                          </a>
                          <a
                            className="headerlink"
                            href="#mongo-based-authentication"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <div className="line-block">
                          <div className="line">
                            <br />
                          </div>
                        </div>
                        <div className="section" id="add-a-new-user">
                          <h5>
                            <a className="toc-backref" href="#id51">
                              Add a new user
                            </a>
                            <a
                              className="headerlink"
                              href="#add-a-new-user"
                              title="Permalink to this headline"
                            >
                              ¶
                            </a>
                          </h5>
                          <p>
                            To add a new user in fastAuthentication database,
                            type the below command;
                          </p>
                          <div className="line-block">
                            <div className="line">
                              <br />
                            </div>
                          </div>
                          <div className="highlight-default notranslate">
                            <div className="highlight">
                              <pre>
                                <span />$ python3 -m fast_api_auth.app
                                --add-user -u &lt;username&gt; --admin-code
                                900.200 --non-admin-code 300{"\n"}
                                {"\n"}Enter valid Admin Key: &lt;enter secret
                                admin key&gt;{"\n"}Enter new password:{"\n"}
                                Confirm new password:{"\n"}
                              </pre>
                            </div>
                          </div>
                          <p>
                            This will create a new user in fast authentication
                            database.
                          </p>
                          <div className="line-block">
                            <div className="line">
                              <br />
                            </div>
                          </div>
                          <div className="highlight-default notranslate">
                            <div className="highlight">
                              <pre>
                                <span />
                                <span className="p">{"{"}</span>
                                {"\n"}
                                <span className="s2">"_id"</span>
                                <span className="p">:</span>{" "}
                                <span className="p">{"{"}</span>
                                {"\n"}
                                {"    "}
                                <span className="s2">"$oid"</span>
                                <span className="p">:</span>{" "}
                                <span className="s2">
                                  "5f60418240d9ab65a24ab6"
                                </span>
                                {"\n"}
                                <span className="p">{"}"},</span>
                                {"\n"}
                                <span className="s2">"uuid"</span>
                                <span className="p">:</span>{" "}
                                <span className="s2">
                                  "43ae154d-38c5-44cf-8fa3-34c6cac33a6e"
                                </span>
                                <span className="p">,</span>
                                {"\n"}
                                <span className="s2">"username"</span>
                                <span className="p">:</span>{" "}
                                <span className="s2">"&lt;user&gt;"</span>
                                <span className="p">,</span>
                                {"\n"}
                                <span className="s2">"password"</span>
                                <span className="p">:</span>{" "}
                                <span className="s2">
                                  "pbkdf2:sha256:150000$xxxxxxxxxxxxxxxxx"
                                </span>
                                <span className="p">,</span>
                                {"\n"}
                                <span className="s2">"permissions"</span>
                                <span className="p">:</span>{" "}
                                <span className="p">[{"{"}</span>
                                {"\n"}
                                {"    "}
                                <span className="s2">"serverIp"</span>
                                <span className="p">:</span>{" "}
                                <span className="s2">"172.28.12.132"</span>
                                <span className="p">,</span>
                                {"\n"}
                                {"    "}
                                <span className="s2">"adminServiceCodes"</span>
                                <span className="p">:</span>{" "}
                                <span className="p">[</span>
                                <span className="s2">"900"</span>
                                <span className="p">,</span>{" "}
                                <span className="s2">"200"</span>
                                <span className="p">],</span>
                                {"\n"}
                                {"    "}
                                <span className="s2">
                                  "nonAdminServiceCodes"
                                </span>
                                <span className="p">:</span>{" "}
                                <span className="p">[</span>
                                <span className="s2">"300"</span>
                                <span className="p">]</span>
                                {"\n"}
                                <span className="p">{"}"}]</span>
                                {"\n"}
                                <span className="p">{"}"}</span>
                                {"\n"}
                              </pre>
                            </div>
                          </div>
                        </div>
                        <div
                          className="section"
                          id="add-permissions-for-a-server"
                        >
                          <h5>
                            <a className="toc-backref" href="#id52">
                              Add permissions for a server
                            </a>
                            <a
                              className="headerlink"
                              href="#add-permissions-for-a-server"
                              title="Permalink to this headline"
                            >
                              ¶
                            </a>
                          </h5>
                          <p>
                            To add a new server in permissions, run the below
                            command from that server.
                          </p>
                          <div className="line-block">
                            <div className="line">
                              <br />
                            </div>
                          </div>
                          <div className="highlight-default notranslate">
                            <div className="highlight">
                              <pre>
                                <span />
                                <span className="n">python3</span>{" "}
                                <span className="o">-</span>
                                <span className="n">m</span>{" "}
                                <span className="n">fast_api_auth</span>
                                <span className="o">.</span>
                                <span className="n">app</span>{" "}
                                <span className="o">--</span>
                                <span className="n">change</span>
                                <span className="o">-</span>
                                <span className="n">perm</span>{" "}
                                <span className="o">-</span>
                                <span className="n">u</span>{" "}
                                <span className="o">&lt;</span>
                                <span className="n">username</span>
                                <span className="o">&gt;</span>{" "}
                                <span className="o">--</span>
                                <span className="n">add</span>{" "}
                                <span className="o">--</span>
                                <span className="n">admin</span>
                                <span className="o">-</span>
                                <span className="n">code</span>{" "}
                                <span className="mf">900.200</span>{" "}
                                <span className="o">--</span>
                                <span className="n">non</span>
                                <span className="o">-</span>
                                <span className="n">admin</span>
                                <span className="o">-</span>
                                <span className="n">code</span>{" "}
                                <span className="mi">300</span>
                                {"\n"}
                              </pre>
                            </div>
                          </div>
                          <p>This will change the above user as follows;</p>
                          <div className="line-block">
                            <div className="line">
                              <br />
                            </div>
                          </div>
                          <div className="highlight-default notranslate">
                            <div className="highlight">
                              <pre>
                                <span />
                                <span className="p">{"{"}</span>
                                {"\n"}
                                {"    "}
                                <span className="s2">"_id"</span>
                                <span className="p">:</span>{" "}
                                <span className="p">{"{"}</span>
                                {"\n"}
                                {"    "}
                                <span className="s2">"$oid"</span>
                                <span className="p">:</span>{" "}
                                <span className="s2">
                                  "5f60418240d9ab65a24a4bb6"
                                </span>
                                {"\n"}
                                {"    "}
                                <span className="p">{"}"},</span>
                                {"\n"}
                                {"    "}
                                <span className="s2">"uuid"</span>
                                <span className="p">:</span>{" "}
                                <span className="s2">
                                  "43ae154d-38c5-44cf-8fa3-34c6cac33a6e"
                                </span>
                                <span className="p">,</span>
                                {"\n"}
                                {"    "}
                                <span className="s2">"username"</span>
                                <span className="p">:</span>{" "}
                                <span className="s2">"&lt;username&gt;"</span>
                                <span className="p">,</span>
                                {"\n"}
                                {"    "}
                                <span className="s2">"password"</span>
                                <span className="p">:</span>{" "}
                                <span className="s2">
                                  "pbkdf2:sha256:150000$xxxxxxxxxxxxxxxxx"
                                </span>
                                {"\n"}
                                {"    "}
                                <span className="s2">"permissions"</span>
                                <span className="p">:</span>{" "}
                                <span className="p">[{"{"}</span>
                                {"\n"}
                                {"        "}
                                <span className="s2">"serverIp"</span>
                                <span className="p">:</span>{" "}
                                <span className="s2">"172.28.12.132"</span>
                                <span className="p">,</span>
                                {"\n"}
                                {"        "}
                                <span className="s2">"adminServiceCodes"</span>
                                <span className="p">:</span>{" "}
                                <span className="p">[</span>
                                <span className="s2">"900"</span>
                                <span className="p">,</span>{" "}
                                <span className="s2">"200"</span>
                                <span className="p">],</span>
                                {"\n"}
                                {"        "}
                                <span className="s2">
                                  "nonAdminServiceCodes"
                                </span>
                                <span className="p">:</span>{" "}
                                <span className="p">[</span>
                                <span className="s2">"300"</span>
                                <span className="p">]</span>
                                {"\n"}
                                {"    "}
                                <span className="p">{"}"},</span>{" "}
                                <span className="p">{"{"}</span>
                                {"\n"}
                                {"        "}
                                <span className="s2">"serverIp"</span>
                                <span className="p">:</span>{" "}
                                <span className="s2">"10.189.134.56"</span>
                                <span className="p">,</span>
                                {"\n"}
                                {"        "}
                                <span className="s2">"adminServiceCodes"</span>
                                <span className="p">:</span>{" "}
                                <span className="p">[</span>
                                <span className="s2">"200"</span>
                                <span className="p">,</span>{" "}
                                <span className="s2">"900"</span>
                                <span className="p">],</span>
                                {"\n"}
                                {"        "}
                                <span className="s2">
                                  "nonAdminServiceCodes"
                                </span>
                                <span className="p">:</span>{" "}
                                <span className="p">[</span>
                                <span className="s2">"300"</span>
                                <span className="p">]</span>
                                {"\n"}
                                {"    "}
                                <span className="p">{"}"}]</span>
                                {"\n"}
                                <span className="p">{"}"}</span>
                                {"\n"}
                              </pre>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="section"
                        id="csv-based-based-authentication"
                      >
                        <h4>
                          <a className="toc-backref" href="#id53">
                            CSV Based Based Authentication
                          </a>
                          <a
                            className="headerlink"
                            href="#csv-based-based-authentication"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <div className="section" id="add-a-user">
                          <h5>
                            <a className="toc-backref" href="#id54">
                              Add a user
                            </a>
                            <a
                              className="headerlink"
                              href="#add-a-user"
                              title="Permalink to this headline"
                            >
                              ¶
                            </a>
                          </h5>
                          <p>To add a new user to CSV File,</p>
                          <div className="line-block">
                            <div className="line">
                              <br />
                            </div>
                          </div>
                          <div className="highlight-default notranslate">
                            <div className="highlight">
                              <pre>
                                <span />
                                <span className="n">python3</span>{" "}
                                <span className="o">-</span>
                                <span className="n">m</span>{" "}
                                <span className="n">fast_api_auth</span>
                                <span className="o">.</span>
                                <span className="n">app</span>{" "}
                                <span className="o">--</span>
                                <span className="n">mk</span>
                                <span className="o">-</span>
                                <span className="n">admin</span>{" "}
                                <span className="o">-</span>
                                <span className="n">u</span>{" "}
                                <span className="o">&lt;</span>
                                <span className="n">username</span>
                                <span className="o">&gt;</span>
                                {"\n"}
                              </pre>
                            </div>
                          </div>
                          <p>Refer FAST API AUTH documentation for more.</p>
                          <div className="line-block">
                            <div className="line">
                              <br />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="section"
                      id="install-master-dhcp-auth-server"
                    >
                      <h3>
                        <a className="toc-backref" href="#id55">
                          Install Master DHCP Auth Server
                        </a>
                        <a
                          className="headerlink"
                          href="#install-master-dhcp-auth-server"
                          title="Permalink to this headline"
                        >
                          ¶
                        </a>
                      </h3>
                      <p>
                        master-dhcp-auth is the backend authentication server
                        for master DHCP. This provides endpoints required for
                        MasterDHCP user authentication. This also provides an
                        interface for collecting auth-tokens required for FAST
                        Authentication.
                      </p>
                      <p>
                        Installation of Master DHCP consists of installing two
                        servers.
                      </p>
                      <ol className="arabic simple">
                        <li>
                          <p>
                            <strong>Master DHCP Auth</strong> - this is the
                            backend authentication server written in Flask
                            framework.
                          </p>
                        </li>
                        <li>
                          <p>
                            <strong>Master DHCP Frontend</strong> - this is the
                            frontend UI written in React JS.
                          </p>
                        </li>
                      </ol>
                      <div className="line-block">
                        <div className="line">
                          <br />
                        </div>
                      </div>
                      <div className="section" id="clone-git-repository">
                        <h4>
                          <a className="toc-backref" href="#id56">
                            Clone git repository
                          </a>
                          <a
                            className="headerlink"
                            href="#clone-git-repository"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <div className="line-block">
                          <div className="line">
                            <br />
                          </div>
                        </div>
                        <div className="highlight-default notranslate">
                          <div className="highlight">
                            <pre>
                              <span />
                              <span className="n">cd</span>{" "}
                              <span className="o">&lt;</span>
                              <span className="n">directory</span>{" "}
                              <span className="n">where</span>{" "}
                              <span className="n">you</span>{" "}
                              <span className="n">want</span>{" "}
                              <span className="n">the</span>{" "}
                              <span className="n">project</span>
                              <span className="o">&gt;</span>
                              {"\n"}
                              {"\n"}
                              <span className="n">git</span>{" "}
                              <span className="n">clone</span>{" "}
                              <span className="n">https</span>
                              <span className="p">:</span>
                              <span className="o">//</span>
                              <span className="n">git</span>
                              <span className="o">.</span>
                              <span className="n">virtz</span>
                              <span className="o">.</span>
                              <span className="n">centurylink</span>
                              <span className="o">.</span>
                              <span className="n">net</span>
                              <span className="o">/</span>
                              <span className="n">bitbucket</span>
                              <span className="o">/</span>
                              <span className="n">scm</span>
                              <span className="o">/</span>
                              <span className="n">md</span>
                              <span className="o">/</span>
                              <span className="n">master</span>
                              <span className="o">-</span>
                              <span className="n">dhcp</span>
                              <span className="o">-</span>
                              <span className="n">frontend</span>
                              <span className="o">.</span>
                              <span className="n">git</span>
                              {"\n"}
                            </pre>
                          </div>
                        </div>
                      </div>
                      <div
                        className="section"
                        id="create-a-virtual-environment"
                      >
                        <h4>
                          <a className="toc-backref" href="#id57">
                            Create a virtual environment
                          </a>
                          <a
                            className="headerlink"
                            href="#create-a-virtual-environment"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <p>
                          Create virtual environment for fast verification.
                          Python3 has built in support to create a virtual
                          environment.
                        </p>
                        <div className="line-block">
                          <div className="line">
                            <br />
                          </div>
                        </div>
                        <div className="highlight-default notranslate">
                          <div className="highlight">
                            <pre>
                              <span />
                              <span className="n">cd</span>{" "}
                              <span className="n">master</span>
                              <span className="o">-</span>
                              <span className="n">dhcp</span>
                              <span className="o">-</span>
                              <span className="n">frontend</span>
                              <span className="o">/</span>
                              <span className="n">master</span>
                              <span className="o">-</span>
                              <span className="n">dhcp</span>
                              <span className="o">-</span>
                              <span className="n">auth</span>
                              <span className="o">/</span>
                              {"\n"}
                              {"\n"}
                              <span className="n">python3</span>{" "}
                              <span className="o">-</span>
                              <span className="n">m</span>{" "}
                              <span className="n">venv</span>{" "}
                              <span className="o">&lt;</span>
                              <span className="n">name</span>{" "}
                              <span className="k">for</span>{" "}
                              <span className="n">venv</span>
                              <span className="o">&gt;</span>
                              {"\n"}
                            </pre>
                          </div>
                        </div>
                        <div className="line-block">
                          <div className="line">
                            <br />
                          </div>
                        </div>
                      </div>
                      <div className="section" id="install-required-modules">
                        <h4>
                          <a className="toc-backref" href="#id58">
                            Install required modules
                          </a>
                          <a
                            className="headerlink"
                            href="#install-required-modules"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <p>
                          Before installing packages, activate the virtual
                          environment created.
                        </p>
                        <div className="highlight-default notranslate">
                          <div className="highlight">
                            <pre>
                              <span />
                              <span className="o">|</span>
                              {"\n"}
                            </pre>
                          </div>
                        </div>
                        <blockquote>
                          <div>
                            <p>source &lt;name for venv&gt;/bin/activate</p>
                            <p className="attribution">—OR–</p>
                          </div>
                        </blockquote>
                        <blockquote>
                          <div>
                            <p>. &lt;name of venv&gt;/bin/activate</p>
                          </div>
                        </blockquote>
                        <p>
                          Now install required modules inside the virtual
                          environment. Requirements file requirements.txt can be
                          found at root folder of project. Run the following
                          command to install all required packages.
                        </p>
                        <div className="line-block">
                          <div className="line">
                            <br />
                          </div>
                        </div>
                        <div className="highlight-default notranslate">
                          <div className="highlight">
                            <pre>
                              <span />
                              <span className="n">pip3</span>{" "}
                              <span className="n">install</span>{" "}
                              <span className="o">-</span>
                              <span className="n">r</span>{" "}
                              <span className="n">requirements</span>
                              <span className="o">.</span>
                              <span className="n">txt</span>
                              {"\n"}
                            </pre>
                          </div>
                        </div>
                        <p>
                          To see the installed packages in your virtual
                          environment, run
                        </p>
                        <div className="line-block">
                          <div className="line">
                            <br />
                          </div>
                        </div>
                        <div className="highlight-default notranslate">
                          <div className="highlight">
                            <pre>
                              <span />
                              <span className="n">pip</span>{" "}
                              <span className="n">freeze</span>
                              {"\n"}
                            </pre>
                          </div>
                        </div>
                      </div>
                      <div className="section" id="id1">
                        <h4>
                          <a className="toc-backref" href="#id59">
                            Configurations
                          </a>
                          <a
                            className="headerlink"
                            href="#id1"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <p>
                          This configuration file is present at
                          ./masterdhcpauth/masterdhcpauth/config.ini
                        </p>
                        <div className="line-block">
                          <div className="line">
                            <br />
                          </div>
                        </div>
                        <div className="highlight-default notranslate">
                          <div className="highlight">
                            <pre>
                              <span /> <span className="p">[</span>
                              <span className="n">MONGODB</span>
                              <span className="p">]</span>
                              {
                                "\n"
                              } <span className="n">USE_REPLICA_SET</span>{" "}
                              <span className="o">-</span>{" "}
                              <span className="n">Boolean</span>{" "}
                              <span className="n">to</span>{" "}
                              <span className="n">decide</span>{" "}
                              <span className="n">whether</span>{" "}
                              <span className="n">should</span>{" "}
                              <span className="n">use</span>{" "}
                              <span className="n">replica</span>{" "}
                              <span className="nb">set</span>{" "}
                              <span className="ow">or</span>{" "}
                              <span className="ow">not</span>
                              <span className="o">.</span>
                              {
                                "\n"
                              } <span className="n">MONGODB_HOST</span>{" "}
                              <span className="o">-</span>{" "}
                              <span className="n">MongoDB</span>{" "}
                              <span className="n">connection</span>{" "}
                              <span className="n">URI</span>
                              <span className="o">.</span>
                              {"\n"} <span className="n">Example</span>{" "}
                              <span className="n">URI</span>
                              <span className="p">:</span>
                              {"\n"}
                              {"     "}
                              <span className="n">standalone</span>
                              <span className="p">:</span>{" "}
                              <span className="n">mongodb</span>
                              <span className="p">:</span>
                              <span className="o">//</span>
                              <span className="n">mongodb0</span>
                              <span className="o">.</span>
                              <span className="n">example</span>
                              <span className="o">.</span>
                              <span className="n">com</span>
                              <span className="p">:</span>
                              <span className="mi">27017</span>
                              {"\n"}
                              {"     "}
                              <span className="n">replicaset</span>
                              <span className="p">:</span>
                              {"\n"}
                              <span className="n">mongodb</span>
                              <span className="p">:</span>
                              <span className="o">//</span>
                              <span className="n">mongodb0</span>
                              <span className="o">.</span>
                              <span className="n">example</span>
                              <span className="o">.</span>
                              <span className="n">com</span>
                              <span className="p">:</span>
                              <span className="mi">27017</span>
                              <span className="p">,</span>
                              <span className="n">mongodb1</span>
                              <span className="o">.</span>
                              <span className="n">example</span>
                              <span className="o">.</span>
                              <span className="n">com</span>
                              <span className="p">:</span>
                              <span className="mi">27017</span>
                              <span className="p">,</span>
                              <span className="n">mongodb2</span>
                              <span className="o">.</span>
                              <span className="n">example</span>
                              <span className="o">.</span>
                              <span className="n">com</span>
                              <span className="p">:</span>
                              <span className="mi">27017</span>
                              <span className="o">/</span>
                              {
                                "\n"
                              } <span className="n">MONGODB_USERNAME</span>{" "}
                              <span className="o">-</span>{" "}
                              <span className="n">Username</span>{" "}
                              <span className="n">to</span>{" "}
                              <span className="n">connect</span>{" "}
                              <span className="n">mongodb</span>
                              <span className="o">.</span>
                              {
                                "\n"
                              } <span className="n">MONGODB_PASSWORD</span>{" "}
                              <span className="o">-</span>{" "}
                              <span className="n">Password</span>{" "}
                              <span className="n">required</span>{" "}
                              <span className="n">to</span>{" "}
                              <span className="n">connect</span>{" "}
                              <span className="n">mongodb</span>
                              <span className="o">.</span>
                              {"\n"} <span className="n">MONGODB_RS</span>{" "}
                              <span className="o">-</span>{" "}
                              <span className="n">Replicaset</span>{" "}
                              <span className="n">name</span>
                              {
                                "\n"
                              } <span className="n">MONGODB_DB_NAME</span>{" "}
                              <span className="o">-</span>{" "}
                              <span className="n">Database</span>{" "}
                              <span className="n">which</span>{" "}
                              <span className="n">FASTDHCP</span>{" "}
                              <span className="ow">is</span>{" "}
                              <span className="n">using</span>
                              <span className="o">.</span>
                              {"\n"}{" "}
                              <span className="n">MONGODB_COLLECTION</span>{" "}
                              <span className="o">-</span>{" "}
                              <span className="n">Collection</span>{" "}
                              <span className="n">name</span>{" "}
                              <span className="n">which</span>{" "}
                              <span className="n">FASTDHCP</span>{" "}
                              <span className="ow">is</span>{" "}
                              <span className="n">using</span>
                              <span className="o">.</span>
                              {"\n"} <span className="p">[</span>
                              <span className="n">AUTH</span>
                              <span className="p">]</span>
                              {"\n"} <span className="n">SECRET_KEY</span>{" "}
                              <span className="o">-</span>{" "}
                              <span className="n">Secret</span>{" "}
                              <span className="n">key</span>{" "}
                              <span className="n">to</span>{" "}
                              <span className="n">be</span>{" "}
                              <span className="n">used</span>{" "}
                              <span className="k">for</span>{" "}
                              <span className="n">encoding</span>{" "}
                              <span className="n">tokens</span>
                              <span className="o">.</span>
                              {"\n"} <span className="n">APP_ID</span>{" "}
                              <span className="o">-</span>{" "}
                              <span className="n">Uuid</span>{" "}
                              <span className="n">of</span>{" "}
                              <span className="n">Master</span>{" "}
                              <span className="n">DHCP</span>
                              <span className="o">.</span>{" "}
                              <span className="n">This</span>{" "}
                              <span className="nb">id</span>{" "}
                              <span className="n">should</span>{" "}
                              <span className="n">be</span>{" "}
                              <span className="n">present</span>{" "}
                              <span className="ow">in</span>{" "}
                              <span className="n">user</span>
                              <span className="s1">'s appPermissions.</span>
                              {"\n"}
                            </pre>
                          </div>
                        </div>
                        <div className="line-block">
                          <div className="line">
                            <br />
                          </div>
                        </div>
                      </div>
                      <div className="section" id="running-the-server">
                        <h4>
                          <a className="toc-backref" href="#id60">
                            Running the Server
                          </a>
                          <a
                            className="headerlink"
                            href="#running-the-server"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <div className="section" id="using-python-interpreter">
                          <h5>
                            <a className="toc-backref" href="#id61">
                              Using python interpreter
                            </a>
                            <a
                              className="headerlink"
                              href="#using-python-interpreter"
                              title="Permalink to this headline"
                            >
                              ¶
                            </a>
                          </h5>
                          <p>Activate virtual environment.</p>
                          <div className="line-block">
                            <div className="line">
                              <br />
                            </div>
                          </div>
                          <div className="highlight-default notranslate">
                            <div className="highlight">
                              <pre>
                                <span />
                                <span className="n">source</span>{" "}
                                <span className="o">&lt;</span>
                                <span className="n">name</span>{" "}
                                <span className="k">for</span>{" "}
                                <span className="n">venv</span>
                                <span className="o">&gt;/</span>
                                <span className="nb">bin</span>
                                <span className="o">/</span>
                                <span className="n">activate</span>
                                {"\n"}
                              </pre>
                            </div>
                          </div>
                          <p>
                            Run the following command from root directory to
                            start the server.
                          </p>
                          <div className="line-block">
                            <div className="line">
                              <br />
                            </div>
                          </div>
                          <div className="highlight-default notranslate">
                            <div className="highlight">
                              <pre>
                                <span />
                                <span className="n">python</span>{" "}
                                <span className="n">run</span>
                                <span className="o">.</span>
                                <span className="n">py</span>
                                {"\n"}
                              </pre>
                            </div>
                          </div>
                        </div>
                        <div className="section" id="using-gunicorn">
                          <h5>
                            <a className="toc-backref" href="#id62">
                              Using gunicorn
                            </a>
                            <a
                              className="headerlink"
                              href="#using-gunicorn"
                              title="Permalink to this headline"
                            >
                              ¶
                            </a>
                          </h5>
                          <div
                            className="section"
                            id="install-gunicorn-using-pip"
                          >
                            <h6>
                              <a className="toc-backref" href="#id63">
                                Install gunicorn using pip
                              </a>
                              <a
                                className="headerlink"
                                href="#install-gunicorn-using-pip"
                                title="Permalink to this headline"
                              >
                                ¶
                              </a>
                            </h6>
                            <p>Activate virtual environment</p>
                            <div className="line-block">
                              <div className="line">
                                <br />
                              </div>
                            </div>
                            <div className="highlight-default notranslate">
                              <div className="highlight">
                                <pre>
                                  <span />
                                  <span className="n">source</span>{" "}
                                  <span className="o">&lt;</span>
                                  <span className="n">name</span>{" "}
                                  <span className="k">for</span>{" "}
                                  <span className="n">venv</span>
                                  <span className="o">&gt;/</span>
                                  <span className="nb">bin</span>
                                  <span className="o">/</span>
                                  <span className="n">activate</span>
                                  {"\n"}
                                </pre>
                              </div>
                            </div>
                            <p>Install Gunicorn.</p>
                            <div className="line-block">
                              <div className="line">
                                <br />
                              </div>
                            </div>
                            <div className="highlight-default notranslate">
                              <div className="highlight">
                                <pre>
                                  <span />
                                  <span className="n">pip3</span>{" "}
                                  <span className="n">install</span>{" "}
                                  <span className="n">gunicorn</span>
                                  <span className="o">==</span>
                                  <span className="mf">19.9</span>
                                  <span className="o">.</span>
                                  <span className="mi">0</span>
                                  {"\n"}
                                </pre>
                              </div>
                            </div>
                          </div>
                          <div
                            className="section"
                            id="run-using-gunicorn-via-command-line"
                          >
                            <h6>
                              <a className="toc-backref" href="#id64">
                                Run using gunicorn via command line
                              </a>
                              <a
                                className="headerlink"
                                href="#run-using-gunicorn-via-command-line"
                                title="Permalink to this headline"
                              >
                                ¶
                              </a>
                            </h6>
                            <div className="line-block">
                              <div className="line">
                                <br />
                              </div>
                            </div>
                            <div className="highlight-default notranslate">
                              <div className="highlight">
                                <pre>
                                  <span />
                                  <span className="o">/</span>
                                  <span className="n">home</span>
                                  <span className="o">/</span>
                                  <span className="n">ajeeb</span>
                                  <span className="o">/</span>
                                  <span className="n">master</span>
                                  <span className="o">-</span>
                                  <span className="n">dhcp</span>
                                  <span className="o">-</span>
                                  <span className="n">auth</span>
                                  <span className="o">/</span>
                                  <span className="n">venv</span>
                                  <span className="o">/</span>
                                  <span className="nb">bin</span>
                                  <span className="o">/</span>
                                  <span className="n">gunicorn</span>{" "}
                                  <span className="o">--</span>
                                  <span className="n">bind</span>{" "}
                                  <span className="mf">0.0</span>
                                  <span className="o">.</span>
                                  <span className="mf">0.0</span>
                                  <span className="p">:</span>
                                  <span className="mi">8086</span>
                                  {"\n"}
                                  <span className="o">--</span>
                                  <span className="n">pid</span>{" "}
                                  <span className="o">/</span>
                                  <span className="n">home</span>
                                  <span className="o">/</span>
                                  <span className="n">ajeeb</span>
                                  <span className="o">/</span>
                                  <span className="n">master</span>
                                  <span className="o">-</span>
                                  <span className="n">dhcp</span>
                                  <span className="o">-</span>
                                  <span className="n">auth</span>
                                  <span className="o">/</span>
                                  <span className="n">run</span>
                                  <span className="o">/</span>
                                  <span className="n">masterdhcpauth</span>
                                  <span className="o">.</span>
                                  <span className="n">pid</span>{" "}
                                  <span className="o">--</span>
                                  <span className="n">error</span>
                                  <span className="o">-</span>
                                  <span className="n">logfile</span>
                                  {"\n"}
                                  <span className="s2">
                                    "/home/ajeeb/gunicorn/work/masterdhcpauth/log/error.log"
                                  </span>{" "}
                                  <span className="o">--</span>
                                  <span className="n">access</span>
                                  <span className="o">-</span>
                                  <span className="n">logfile</span>
                                  {"\n"}
                                  <span className="s2">
                                    "/home/ajeeb/gunicorn/work/masterdhcpauth/log/access.log"
                                  </span>{" "}
                                  <span className="o">--</span>
                                  <span className="n">workers</span>
                                  <span className="o">=</span>
                                  <span className="mi">4</span>{" "}
                                  <span className="o">--</span>
                                  <span className="n">threads</span>
                                  <span className="o">=</span>
                                  <span className="mi">2</span>{" "}
                                  <span className="n">run</span>
                                  <span className="p">:</span>
                                  <span className="n">masterdhcpauth_app</span>
                                  {"\n"}
                                </pre>
                              </div>
                            </div>
                          </div>
                          <div
                            className="section"
                            id="running-as-a-supervisord-service-with-gunicorn-thread"
                          >
                            <h6>
                              <a className="toc-backref" href="#id65">
                                Running as a supervisord service with gunicorn
                                thread
                              </a>
                              <a
                                className="headerlink"
                                href="#running-as-a-supervisord-service-with-gunicorn-thread"
                                title="Permalink to this headline"
                              >
                                ¶
                              </a>
                            </h6>
                            <p>Copy fastlibvirt.ini to the path as below</p>
                            <div className="line-block">
                              <div className="line">
                                <br />
                              </div>
                            </div>
                            <div className="highlight-default notranslate">
                              <div className="highlight">
                                <pre>
                                  <span />
                                  <span className="n">cp</span>{" "}
                                  <span className="o">./</span>
                                  <span className="n">deploy</span>
                                  <span className="o">/</span>
                                  <span className="n">supervisord</span>
                                  <span className="o">/</span>
                                  <span className="n">masterdhcpauth</span>
                                  <span className="o">.</span>
                                  <span className="n">ini</span>{" "}
                                  <span className="o">/</span>
                                  <span className="n">etc</span>
                                  <span className="o">/</span>
                                  <span className="n">supervisord</span>
                                  <span className="o">.</span>
                                  <span className="n">d</span>
                                  <span className="o">/</span>
                                  <span className="n">masterdhcpauth</span>
                                  <span className="o">.</span>
                                  <span className="n">ini</span>
                                  {"\n"}
                                </pre>
                              </div>
                            </div>
                            <p>Make the fastlibvirt_start script executable.</p>
                            <div className="line-block">
                              <div className="line">
                                <br />
                              </div>
                            </div>
                            <div className="highlight-default notranslate">
                              <div className="highlight">
                                <pre>
                                  <span />
                                  <span className="n">chmod</span>{" "}
                                  <span className="o">+</span>
                                  <span className="n">x</span>{" "}
                                  <span className="o">./</span>
                                  <span className="n">deploy</span>
                                  <span className="o">/</span>
                                  <span className="n">supervisord</span>
                                  <span className="o">/</span>
                                  <span className="n">
                                    masterdhcpauth_start
                                  </span>
                                  {"\n"}
                                </pre>
                              </div>
                            </div>
                            <p>
                              since we made changes to the configs, update
                              supervisord configs.
                            </p>
                            <div className="line-block">
                              <div className="line">
                                <br />
                              </div>
                            </div>
                            <div className="highlight-default notranslate">
                              <div className="highlight">
                                <pre>
                                  <span />
                                  <span className="n">sudo</span>
                                  {"  "}
                                  <span className="n">supervisorctl</span>{" "}
                                  <span className="n">update</span>
                                  {"\n"}
                                </pre>
                              </div>
                            </div>
                            <p>start the supervisor daemon.</p>
                            <div className="line-block">
                              <div className="line">
                                <br />
                              </div>
                            </div>
                            <div className="highlight-default notranslate">
                              <div className="highlight">
                                <pre>
                                  <span />
                                  <span className="n">sudo</span>
                                  {"  "}
                                  <span className="n">supervisorctl</span>{" "}
                                  <span className="n">reload</span>
                                  {"\n"}
                                </pre>
                              </div>
                            </div>
                            <p>check status of service.</p>
                            <div className="line-block">
                              <div className="line">
                                <br />
                              </div>
                            </div>
                            <div className="highlight-default notranslate">
                              <div className="highlight">
                                <pre>
                                  <span />
                                  <span className="n">sudo</span>
                                  {"  "}
                                  <span className="n">supervisorctl</span>{" "}
                                  <span className="n">status</span>
                                  {"\n"}
                                </pre>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="section" id="install-master-dhcp-frontend">
                      <h3>
                        <a className="toc-backref" href="#id66">
                          Install Master DHCP Frontend
                        </a>
                        <a
                          className="headerlink"
                          href="#install-master-dhcp-frontend"
                          title="Permalink to this headline"
                        >
                          ¶
                        </a>
                      </h3>
                      <div className="section" id="id2">
                        <h4>
                          <a className="toc-backref" href="#id67">
                            Clone git repository
                          </a>
                          <a
                            className="headerlink"
                            href="#id2"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <p>Clone the repository.</p>
                        <div className="line-block">
                          <div className="line">
                            <br />
                          </div>
                        </div>
                        <div className="highlight-default notranslate">
                          <div className="highlight">
                            <pre>
                              <span />
                              <span className="n">cd</span>{" "}
                              <span className="o">&lt;</span>
                              <span className="n">directory</span>{" "}
                              <span className="n">where</span>{" "}
                              <span className="n">you</span>{" "}
                              <span className="n">want</span>{" "}
                              <span className="n">the</span>{" "}
                              <span className="n">project</span>
                              <span className="o">&gt;</span>
                              {"\n"}
                              {"\n"}
                              <span className="n">git</span>{" "}
                              <span className="n">clone</span>{" "}
                              <span className="n">https</span>
                              <span className="p">:</span>
                              <span className="o">//</span>
                              <span className="n">git</span>
                              <span className="o">.</span>
                              <span className="n">virtz</span>
                              <span className="o">.</span>
                              <span className="n">centurylink</span>
                              <span className="o">.</span>
                              <span className="n">net</span>
                              <span className="o">/</span>
                              <span className="n">bitbucket</span>
                              <span className="o">/</span>
                              <span className="n">scm</span>
                              <span className="o">/</span>
                              <span className="n">md</span>
                              <span className="o">/</span>
                              <span className="n">master</span>
                              <span className="o">-</span>
                              <span className="n">dhcp</span>
                              <span className="o">-</span>
                              <span className="n">frontend</span>
                              <span className="o">.</span>
                              <span className="n">git</span>
                              {"\n"}
                            </pre>
                          </div>
                        </div>
                      </div>
                      <div className="section" id="install-requirements">
                        <h4>
                          <a className="toc-backref" href="#id68">
                            Install requirements
                          </a>
                          <a
                            className="headerlink"
                            href="#install-requirements"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <p>
                          Go to the directory where package.json is present.
                        </p>
                        <div className="line-block">
                          <div className="line">
                            <br />
                          </div>
                        </div>
                        <div className="highlight-default notranslate">
                          <div className="highlight">
                            <pre>
                              <span />
                              <span className="n">cd</span>{" "}
                              <span className="n">master</span>
                              <span className="o">-</span>
                              <span className="n">dhcp</span>
                              <span className="o">-</span>
                              <span className="n">frontend</span>
                              <span className="o">/</span>
                              <span className="n">master</span>
                              <span className="o">-</span>
                              <span className="n">dhcp</span>
                              <span className="o">-</span>
                              <span className="n">frontend</span>
                              {"\n"}
                            </pre>
                          </div>
                        </div>
                        <div className="line-block">
                          <div className="line">
                            <br />
                          </div>
                        </div>
                        <div className="highlight-default notranslate">
                          <div className="highlight">
                            <pre>
                              <span />
                              <span className="n">npm</span>{" "}
                              <span className="n">install</span>
                              {"\n"}
                            </pre>
                          </div>
                        </div>
                        <div className="line-block">
                          <div className="line">
                            <br />
                          </div>
                        </div>
                      </div>
                      <div
                        className="section"
                        id="prepare-local-ieee-mac-vendor-database"
                      >
                        <h4>
                          <a className="toc-backref" href="#id69">
                            Prepare Local IEEE MAC Vendor database
                          </a>
                          <a
                            className="headerlink"
                            href="#prepare-local-ieee-mac-vendor-database"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <p>
                          Download the following MAC Assignments CSV files from
                          this page.
                        </p>
                        <p>
                          <a
                            className="reference external"
                            href="https://standards.ieee.org/products-services/regauth/index.html"
                          >
                            https://standards.ieee.org/products-services/regauth/index.html
                          </a>
                        </p>
                        <ol className="arabic simple">
                          <li>
                            <p>
                              <em>
                                Download latest IEEE MA-L Assignments (.csv)
                                from this site and paste it inside
                                master-dhcp-frontend/src/registry/ieeemal.csv
                              </em>
                            </p>
                          </li>
                          <li>
                            <p>
                              <em>
                                Download latest IEEE MA-M Assignments (.csv)
                                from this site and paste it inside
                                master-dhcp-frontend/src/registry/ieeemam.csv
                              </em>
                            </p>
                          </li>
                          <li>
                            <p>
                              <em>
                                Download latest IEEE MA-S Assignments (.csv)
                                from this site and paste it inside
                                master-dhcp-frontend/src/registry/ieeemas.csv
                              </em>
                            </p>
                          </li>
                        </ol>
                        <div className="line-block">
                          <div className="line">
                            <br />
                          </div>
                        </div>
                      </div>
                      <div className="section" id="id3">
                        <h4>
                          <a className="toc-backref" href="#id70">
                            Configurations
                          </a>
                          <a
                            className="headerlink"
                            href="#id3"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <p>
                          This configuration files are present at{" "}
                          <em>master-dhcp-frontend/public/conf</em>
                        </p>
                        <div className="section" id="config-json">
                          <h5>
                            <a className="toc-backref" href="#id71">
                              config.json
                            </a>
                            <a
                              className="headerlink"
                              href="#config-json"
                              title="Permalink to this headline"
                            >
                              ¶
                            </a>
                          </h5>
                          <p>
                            Define the configurations in the{" "}
                            <em>config.json</em> file. Required fields are
                            described below.
                          </p>
                          <p>
                            <em>authServerUrl</em>: master-dhcp-auth server url
                          </p>
                          <p>
                            <em>useCsvAuthForMaster</em>: use users.csv for
                            master authentication. In this case, the same user
                            should be present for fast authentication as well.
                            Also, authServerUrl is still required to specify
                            because it is used as an interface for getting
                            auth-tokens and server’s status check.
                          </p>
                          <p>
                            <em>defaults</em>: {"{"} “lab”: , “server”: “Server
                            Id” {"}"} - if not specified, first lab and first
                            server will be taken as default. labs: Specify labs
                            and server details as shown below
                          </p>
                          <div className="line-block">
                            <div className="line">
                              <br />
                            </div>
                          </div>
                          <div className="highlight-default notranslate">
                            <div className="highlight">
                              <pre>
                                <span />
                                <span className="p">[{"{"}</span>
                                {"\n"}
                                {"  "}
                                <span className="s2">"id"</span>
                                <span className="p">:</span>{" "}
                                <span className="s2">"LAB001"</span>
                                <span className="p">,</span>
                                {"\n"}
                                {"  "}
                                <span className="s2">"location"</span>
                                <span className="p">:</span>{" "}
                                <span className="s2">"Denver"</span>
                                <span className="p">,</span>
                                {"\n"}
                                {"  "}
                                <span className="s2">"value"</span>
                                <span className="p">:</span>{" "}
                                <span className="s2">"lab1"</span>
                                <span className="p">,</span>
                                {"\n"}
                                {"  "}
                                <span className="s2">"servers"</span>
                                <span className="p">:</span>{" "}
                                <span className="p">[</span>
                                {"\n"}
                                {"    "}
                                <span className="p">{"{"}</span>
                                {"\n"}
                                {"      "}
                                <span className="s2">"id"</span>
                                <span className="p">:</span>{" "}
                                <span className="s2">"KEA001"</span>
                                <span className="p">,</span>
                                {"\n"}
                                {"      "}
                                <span className="s2">"title"</span>
                                <span className="p">:</span>{" "}
                                <span className="s2">"multiserver1631"</span>
                                <span className="p">,</span>
                                {"\n"}
                                {"      "}
                                <span className="s2">"ip"</span>
                                <span className="p">:</span>{" "}
                                <span className="s2">"172.28.12.132"</span>
                                <span className="p">,</span>
                                {"\n"}
                                {"      "}
                                <span className="s2">"dhcpManagerPort"</span>
                                <span className="p">:</span>{" "}
                                <span className="s2">"5007"</span>
                                <span className="p">,</span>
                                {"\n"}
                                {"      "}
                                <span className="s2">"dhcpMonitorPort"</span>
                                <span className="p">:</span>{" "}
                                <span className="s2">"5555"</span>
                                {"\n"}
                                {"    "}
                                <span className="p">{"}"},</span>
                                {"\n"}
                                {"    "}
                                <span className="p">{"{"}</span>
                                {"\n"}
                                {"      "}
                                <span className="s2">"id"</span>
                                <span className="p">:</span>{" "}
                                <span className="s2">"KEA002"</span>
                                <span className="p">,</span>
                                {"\n"}
                                {"      "}
                                <span className="s2">"title"</span>
                                <span className="p">:</span>{" "}
                                <span className="s2">"virtz-kea-dhcp01"</span>
                                <span className="p">,</span>
                                {"\n"}
                                {"      "}
                                <span className="s2">"ip"</span>
                                <span className="p">:</span>{" "}
                                <span className="s2">"10.189.134.56"</span>
                                <span className="p">,</span>
                                {"\n"}
                                {"      "}
                                <span className="s2">"dhcpManagerPort"</span>
                                <span className="p">:</span>{" "}
                                <span className="s2">"5007"</span>
                                <span className="p">,</span>
                                {"\n"}
                                {"      "}
                                <span className="s2">"dhcpMonitorPort"</span>
                                <span className="p">:</span>{" "}
                                <span className="s2">"5555"</span>
                                {"\n"}
                                {"    "}
                                <span className="p">{"}"}</span>
                                {"\n"}
                                {"    "}
                                <span className="p">]</span>
                                {"\n"}
                                {"    "}
                                <span className="p">{"}"},</span>
                                {"\n"}
                                {"    "}
                                <span className="p">{"{"}</span>
                                {"\n"}
                                {"  "}
                                <span className="s2">"id"</span>
                                <span className="p">:</span>{" "}
                                <span className="s2">"LAB002"</span>
                                <span className="p">,</span>
                                {"\n"}
                                {"  "}
                                <span className="s2">"location"</span>
                                <span className="p">:</span>{" "}
                                <span className="s2">"Bangalore"</span>
                                <span className="p">,</span>
                                {"\n"}
                                {"  "}
                                <span className="s2">"value"</span>
                                <span className="p">:</span>{" "}
                                <span className="s2">"lab2"</span>
                                <span className="p">,</span>
                                {"\n"}
                                {"  "}
                                <span className="s2">"servers"</span>
                                <span className="p">:</span>{" "}
                                <span className="p">[</span>
                                {"\n"}
                                {"    "}
                                <span className="p">{"{"}</span>
                                {"\n"}
                                {"      "}
                                <span className="s2">"id"</span>
                                <span className="p">:</span>{" "}
                                <span className="s2">"DUMMY001"</span>
                                <span className="p">,</span>
                                {"\n"}
                                {"      "}
                                <span className="s2">"title"</span>
                                <span className="p">:</span>{" "}
                                <span className="s2">"Dummy"</span>
                                <span className="p">,</span>
                                {"\n"}
                                {"      "}
                                <span className="s2">"ip"</span>
                                <span className="p">:</span>{" "}
                                <span className="s2">"10.189.11.11"</span>
                                <span className="p">,</span>
                                {"\n"}
                                {"      "}
                                <span className="s2">"dhcpManagerPort"</span>
                                <span className="p">:</span>{" "}
                                <span className="s2">"5007"</span>
                                <span className="p">,</span>
                                {"\n"}
                                {"      "}
                                <span className="s2">"dhcpMonitorPort"</span>
                                <span className="p">:</span>{" "}
                                <span className="s2">"5555"</span>
                                {"\n"}
                                {"    "}
                                <span className="p">{"}"},</span>
                                {"\n"}
                                {"    "}
                                <span className="p">{"{"}</span>
                                {"\n"}
                                {"      "}
                                <span className="s2">"id"</span>
                                <span className="p">:</span>{" "}
                                <span className="s2">"DUMMY002"</span>
                                <span className="p">,</span>
                                {"\n"}
                                {"      "}
                                <span className="s2">"title"</span>
                                <span className="p">:</span>{" "}
                                <span className="s2">"Dummy"</span>
                                <span className="p">,</span>
                                {"\n"}
                                {"      "}
                                <span className="s2">"ip"</span>
                                <span className="p">:</span>{" "}
                                <span className="s2">"10.189.11.12"</span>
                                <span className="p">,</span>
                                {"\n"}
                                {"      "}
                                <span className="s2">"dhcpManagerPort"</span>
                                <span className="p">:</span>{" "}
                                <span className="s2">"5007"</span>
                                <span className="p">,</span>
                                {"\n"}
                                {"      "}
                                <span className="s2">"dhcpMonitorPort"</span>
                                <span className="p">:</span>{" "}
                                <span className="s2">"5555"</span>
                                {"\n"}
                                {"    "}
                                <span className="p">{"}"}</span>
                                {"\n"}
                                {"  "}
                                <span className="p">]</span>
                                {"\n"}
                                <span className="p">{"}"}]</span>
                                {"\n"}
                              </pre>
                            </div>
                          </div>
                        </div>
                        <div className="section" id="apikeys-json">
                          <h5>
                            <a className="toc-backref" href="#id72">
                              apikeys.json
                            </a>
                            <a
                              className="headerlink"
                              href="#apikeys-json"
                              title="Permalink to this headline"
                            >
                              ¶
                            </a>
                          </h5>
                          <p>
                            Configure apikeys.json with the api keys for servers
                            if available. Master DHCP will look for api keys
                            before requesting auth-token from appropriate
                            server. Each server can have two keys based on the
                            access levels. Admin key need to be present in the
                            ‘admin’ and non-admin key need to be placed in the
                            ‘user’. Sample API Key file will look like,
                          </p>
                          <div className="line-block">
                            <div className="line">
                              <br />
                            </div>
                          </div>
                          <div className="highlight-default notranslate">
                            <div className="highlight">
                              <pre>
                                <span />
                                <span className="p">{"{"}</span>
                                {"\n"}
                                {"    "}
                                <span className="s2">"172.1.11.111"</span>
                                <span className="p">:</span>{" "}
                                <span className="p">{"{"}</span>
                                {"\n"}
                                {"    "}
                                <span className="s2">"admin"</span>
                                <span className="p">:</span>{" "}
                                <span className="s2">
                                  "eyJ0eXAiOiJKV1Q9.eyJ1c2IjoxNjQ1NjdY0fQ.RlWug4NSy9Hdmis1A"
                                </span>
                                <span className="p">,</span>
                                {"\n"}
                                {"    "}
                                <span className="s2">"user"</span>
                                <span className="p">:</span>{" "}
                                <span className="s2">
                                  "eyJ0eXAiOiJKV1Q9.eyJ1c2VHAiOjE2MDIdODZ9.mOYvtqYD9HnPzVV8o"
                                </span>
                                {"\n"}
                                {"    "}
                                <span className="p">{"}"}</span>
                                {"\n"}
                                {"    "}
                                <span className="s2">"172.2.22.222"</span>
                                <span className="p">:</span>{" "}
                                <span className="p">{"{"}</span>
                                {"\n"}
                                {"        "}
                                <span className="s2">"admin"</span>
                                <span className="p">:</span>{" "}
                                <span className="s2">
                                  "eyJ0eXAiOiJKI19.eyJ1c2VybhkkkkdY0fQ.RlWug4NSlyGn9Hdmis1A"
                                </span>
                                <span className="p">,</span>
                                {"\n"}
                                {"        "}
                                <span className="s2">"user"</span>
                                <span className="p">:</span>{" "}
                                <span className="s2">
                                  "eyJ0eXAiOiJKLiJ9.eyJ1cAiONDU2OfddDZ9.mOYvt1qYD9HnPfdzVV8o"
                                </span>
                                {"\n"}
                                {"    "}
                                <span className="p">{"}"}</span>
                                {"\n"}
                                <span className="p">{"}"}</span>
                                {"\n"}
                              </pre>
                            </div>
                          </div>
                        </div>
                        <div className="section" id="users-csv">
                          <h5>
                            <a className="toc-backref" href="#id73">
                              users.csv
                            </a>
                            <a
                              className="headerlink"
                              href="#users-csv"
                              title="Permalink to this headline"
                            >
                              ¶
                            </a>
                          </h5>
                          <p>
                            if useCsvAuthForMaster is true, users.csv need to be
                            configured. The csv file contains three fields
                            username, password and isAdmin.
                          </p>
                          <div className="line-block">
                            <div className="line">
                              <br />
                            </div>
                          </div>
                          <div className="highlight-default notranslate">
                            <div className="highlight">
                              <pre>
                                <span />
                                <span className="n">user</span>
                                <span className="p">,</span>
                                <span className="n">password</span>
                                <span className="p">,</span>
                                <span className="n">isadmin</span>
                                {"\n"}
                                <span className="n">user1</span>
                                <span className="p">,</span>{" "}
                                <span className="n">pw1</span>
                                <span className="p">,</span>{" "}
                                <span className="mi">1</span>
                                {"\n"}
                                <span className="n">user2</span>
                                <span className="p">,</span>{" "}
                                <span className="n">pw2</span>
                                <span className="p">,</span>{" "}
                                <span className="mi">0</span>
                                {"\n"}
                              </pre>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="section" id="id4">
                        <h4>
                          <a className="toc-backref" href="#id74">
                            Running the server
                          </a>
                          <a
                            className="headerlink"
                            href="#id4"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <div
                          className="section"
                          id="running-development-server"
                        >
                          <h5>
                            <a className="toc-backref" href="#id75">
                              Running development server
                            </a>
                            <a
                              className="headerlink"
                              href="#running-development-server"
                              title="Permalink to this headline"
                            >
                              ¶
                            </a>
                          </h5>
                          <p>
                            Run the following command to start development
                            server.
                          </p>
                          <div className="line-block">
                            <div className="line">
                              <br />
                            </div>
                          </div>
                          <div className="highlight-default notranslate">
                            <div className="highlight">
                              <pre>
                                <span />
                                <span className="n">npm</span>{" "}
                                <span className="n">start</span>
                                {"\n"}
                              </pre>
                            </div>
                          </div>
                        </div>
                        <div className="section" id="running-production-server">
                          <h5>
                            <a className="toc-backref" href="#id76">
                              Running production server
                            </a>
                            <a
                              className="headerlink"
                              href="#running-production-server"
                              title="Permalink to this headline"
                            >
                              ¶
                            </a>
                          </h5>
                          <div className="section" id="create-build-file">
                            <h6>
                              <a className="toc-backref" href="#id77">
                                Create build file
                              </a>
                              <a
                                className="headerlink"
                                href="#create-build-file"
                                title="Permalink to this headline"
                              >
                                ¶
                              </a>
                            </h6>
                            <p>
                              This will create an optimized build folder in the
                              same directory
                            </p>
                            <div className="line-block">
                              <div className="line">
                                <br />
                              </div>
                            </div>
                            <div className="highlight-default notranslate">
                              <div className="highlight">
                                <pre>
                                  <span />
                                  <span className="n">cd</span>{" "}
                                  <span className="n">master</span>
                                  <span className="o">-</span>
                                  <span className="n">dhcp</span>
                                  <span className="o">-</span>
                                  <span className="n">frontend</span>
                                  <span className="o">/</span>
                                  <span className="n">master</span>
                                  <span className="o">-</span>
                                  <span className="n">dhcp</span>
                                  <span className="o">-</span>
                                  <span className="n">frontend</span>
                                  <span className="o">/</span>
                                  {"\n"}
                                  <span className="n">npm</span>{" "}
                                  <span className="n">run</span>{" "}
                                  <span className="n">build</span>
                                  {"\n"}
                                </pre>
                              </div>
                            </div>
                          </div>
                          <div className="section" id="run-as-supervisord">
                            <h6>
                              <a className="toc-backref" href="#id78">
                                Run as Supervisord
                              </a>
                              <a
                                className="headerlink"
                                href="#run-as-supervisord"
                                title="Permalink to this headline"
                              >
                                ¶
                              </a>
                            </h6>
                            <p>Copy the ini file to supervisord folder</p>
                            <div className="line-block">
                              <div className="line">
                                <br />
                              </div>
                            </div>
                            <div className="highlight-default notranslate">
                              <div className="highlight">
                                <pre>
                                  <span />
                                  <span className="n">sudo</span>{" "}
                                  <span className="n">cp</span>{" "}
                                  <span className="o">./</span>
                                  <span className="n">deploy</span>
                                  <span className="o">/</span>
                                  <span className="n">supervisord</span>
                                  <span className="o">/</span>
                                  <span className="n">masterdhcpui</span>
                                  <span className="o">.</span>
                                  <span className="n">ini</span>{" "}
                                  <span className="o">/</span>
                                  <span className="n">etc</span>
                                  <span className="o">/</span>
                                  <span className="n">supervisord</span>
                                  <span className="o">.</span>
                                  <span className="n">d</span>
                                  <span className="o">/</span>
                                  {"\n"}
                                </pre>
                              </div>
                            </div>
                            <p>
                              Since we made changes to the configs, update
                              supervisord configs.
                            </p>
                            <div className="line-block">
                              <div className="line">
                                <br />
                              </div>
                            </div>
                            <div className="highlight-default notranslate">
                              <div className="highlight">
                                <pre>
                                  <span />
                                  <span className="n">sudo</span>
                                  {"  "}
                                  <span className="n">supervisorctl</span>{" "}
                                  <span className="n">update</span>
                                  {"\n"}
                                </pre>
                              </div>
                            </div>
                            <p>Restart the supervisor daemon.</p>
                            <div className="line-block">
                              <div className="line">
                                <br />
                              </div>
                            </div>
                            <div className="highlight-default notranslate">
                              <div className="highlight">
                                <pre>
                                  <span />
                                  <span className="n">sudo</span>
                                  {"  "}
                                  <span className="n">supervisorctl</span>{" "}
                                  <span className="n">reload</span>
                                  {"\n"}
                                </pre>
                              </div>
                            </div>
                            <p>Check status of service.</p>
                            <div className="line-block">
                              <div className="line">
                                <br />
                              </div>
                            </div>
                            <div className="highlight-default notranslate">
                              <div className="highlight">
                                <pre>
                                  <span />
                                  <span className="n">sudo</span>
                                  {"  "}
                                  <span className="n">supervisorctl</span>{" "}
                                  <span className="n">status</span>{" "}
                                  <span className="n">masterdhcpui</span>
                                  {"\n"}
                                </pre>
                              </div>
                            </div>
                            <p>To check status of all services</p>
                            <div className="line-block">
                              <div className="line">
                                <br />
                              </div>
                            </div>
                            <div className="highlight-default notranslate">
                              <div className="highlight">
                                <pre>
                                  <span />
                                  <span className="n">sudo</span>
                                  {"  "}
                                  <span className="n">supervisorctl</span>{" "}
                                  <span className="n">status</span>
                                  {"\n"}
                                </pre>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="section" id="master-dhcp-auth-endpoints">
                    <h2>
                      <a className="toc-backref" href="#id79">
                        Master DHCP Auth Endpoints
                      </a>
                      <a
                        className="headerlink"
                        href="#master-dhcp-auth-endpoints"
                        title="Permalink to this headline"
                      >
                        ¶
                      </a>
                    </h2>
                    <p>
                      MASTERDHCPAUTH is the backend authentication server for
                      masterdhcp frontend.
                    </p>
                    <div className="section" id="get-user-session">
                      <h3>
                        <a className="toc-backref" href="#id80">
                          001 Get User Session
                        </a>
                        <a
                          className="headerlink"
                          href="#get-user-session"
                          title="Permalink to this headline"
                        >
                          ¶
                        </a>
                      </h3>
                      <div className="section" id="api-information">
                        <h4>
                          <a className="toc-backref" href="#id81">
                            API Information
                          </a>
                          <a
                            className="headerlink"
                            href="#api-information"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <blockquote>
                          <div>
                            <table className="docutils align-default">
                              <colgroup>
                                <col style={{ width: "39%" }} />
                                <col style={{ width: "61%" }} />
                              </colgroup>
                              <tbody>
                                <tr className="row-odd">
                                  <td>
                                    <p>
                                      <strong>Function</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>endpoints.get_user()</p>
                                  </td>
                                </tr>
                                <tr className="row-even">
                                  <td>
                                    <p>
                                      <strong>Description</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>
                                      Get session details from session token.
                                    </p>
                                  </td>
                                </tr>
                                <tr className="row-odd">
                                  <td>
                                    <p>
                                      <strong>HTTP Method</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>POST</p>
                                  </td>
                                </tr>
                                <tr className="row-even">
                                  <td>
                                    <p>
                                      <strong>HTTP Application Type</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>application/json</p>
                                  </td>
                                </tr>
                                <tr className="row-odd">
                                  <td>
                                    <p>
                                      <strong>Call</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>/auth/getuser</p>
                                  </td>
                                </tr>
                                <tr className="row-even">
                                  <td>
                                    <p>
                                      <strong>Input Type</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>JSON</p>
                                  </td>
                                </tr>
                                <tr className="row-odd">
                                  <td>
                                    <p>
                                      <strong>Output Type</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>JSON</p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </blockquote>
                      </div>
                      <div className="section" id="request-parameters">
                        <h4>
                          <a className="toc-backref" href="#id82">
                            Request Parameters
                          </a>
                          <a
                            className="headerlink"
                            href="#request-parameters"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <blockquote>
                          <div>
                            <table className="docutils align-default">
                              <colgroup>
                                <col style={{ width: "16%" }} />
                                <col style={{ width: "15%" }} />
                                <col style={{ width: "26%" }} />
                                <col style={{ width: "44%" }} />
                              </colgroup>
                              <tbody>
                                <tr className="row-odd">
                                  <td>
                                    <p>
                                      <strong>Parameters</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>
                                      <strong>Data Type</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>
                                      <strong>Description</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>
                                      <strong>Example</strong>
                                    </p>
                                  </td>
                                </tr>
                                <tr className="row-even">
                                  <td>
                                    <p>sessionToken</p>
                                  </td>
                                  <td>
                                    <p>string</p>
                                  </td>
                                  <td>
                                    <p>Master DHCP Session Token</p>
                                  </td>
                                  <td>
                                    <p>
                                      eyJ0eI1NiJ9.etaW4iLCJpc0FkNDZ9.z7TiX8RwEmfK
                                    </p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </blockquote>
                      </div>
                      <div className="section" id="response-parameters">
                        <h4>
                          <a className="toc-backref" href="#id83">
                            Response Parameters:
                          </a>
                          <a
                            className="headerlink"
                            href="#response-parameters"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <blockquote>
                          <div>
                            <table className="docutils align-default">
                              <colgroup>
                                <col style={{ width: "15%" }} />
                                <col style={{ width: "14%" }} />
                                <col style={{ width: "42%" }} />
                                <col style={{ width: "29%" }} />
                              </colgroup>
                              <tbody>
                                <tr className="row-odd">
                                  <td>
                                    <p>
                                      <strong>Parameters</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>
                                      <strong>Data Type</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>
                                      <strong>Description</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>
                                      <strong>Example</strong>
                                    </p>
                                  </td>
                                </tr>
                                <tr className="row-even">
                                  <td>
                                    <p>status</p>
                                  </td>
                                  <td>
                                    <p>string</p>
                                  </td>
                                  <td>
                                    <p>can be KO or OK</p>
                                  </td>
                                  <td>
                                    <p>“OK”</p>
                                  </td>
                                </tr>
                                <tr className="row-odd">
                                  <td>
                                    <p>statusCode</p>
                                  </td>
                                  <td>
                                    <p>string</p>
                                  </td>
                                  <td>
                                    <p>status code for each error or success</p>
                                  </td>
                                  <td>
                                    <p>“9020031000”</p>
                                  </td>
                                </tr>
                                <tr className="row-even">
                                  <td>
                                    <p>statusValue</p>
                                  </td>
                                  <td>
                                    <p>string</p>
                                  </td>
                                  <td>
                                    <p>
                                      status description corresponding to the
                                      code
                                    </p>
                                  </td>
                                  <td>
                                    <p>“Command execution successful”</p>
                                  </td>
                                </tr>
                                <tr className="row-odd">
                                  <td>
                                    <p>data</p>
                                  </td>
                                  <td>
                                    <p>JSON</p>
                                  </td>
                                  <td>
                                    <p>response data result</p>
                                  </td>
                                  <td>
                                    <p>
                                      {"{"}
                                      {"}"}
                                    </p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </blockquote>
                        <div className="line-block">
                          <div className="line">
                            <br />
                          </div>
                        </div>
                      </div>
                      <div className="section" id="sample-request-url">
                        <h4>
                          <a className="toc-backref" href="#id84">
                            Sample Request URL
                          </a>
                          <a
                            className="headerlink"
                            href="#sample-request-url"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <blockquote>
                          <div>
                            <p>
                              <code className="docutils literal notranslate">
                                <span className="pre">
                                  http://10.189.126.14:8086/auth/getuser
                                </span>
                              </code>
                            </p>
                          </div>
                        </blockquote>
                      </div>
                      <div className="section" id="sample-request-object">
                        <h4>
                          <a className="toc-backref" href="#id85">
                            Sample Request Object
                          </a>
                          <a
                            className="headerlink"
                            href="#sample-request-object"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <blockquote>
                          <div>
                            <p>Sample request object is:</p>
                            <div className="highlight-default notranslate">
                              <div className="highlight">
                                <pre>
                                  <span />
                                  <span className="p">{"{"}</span>
                                  {"\n"}
                                  {"                "}
                                  <span className="s2">"sessionToken"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="s2">
                                    "eyJ0eXAiOiJKV1QiLCJhbGciOiJI9.
                                  </span>
                                  {"\n"}
                                  {
                                    "                                                 "
                                  }
                                  <span className="n">
                                    WluIjp0cnVlLCJleHAiOjE1OTkxOT
                                  </span>
                                  <span className="o">.</span>
                                  {"\n"}
                                  {
                                    "                                                 "
                                  }
                                  <span className="n">
                                    z7TiXh7TNawUcX13g610EtYDQNDJd
                                  </span>
                                  <span className="s2">"</span>
                                  {"\n"}
                                  <span className="p">{"}"}</span>
                                  {"\n"}
                                </pre>
                              </div>
                            </div>
                          </div>
                        </blockquote>
                      </div>
                      <div className="section" id="sample-response-object">
                        <h4>
                          <a className="toc-backref" href="#id86">
                            Sample Response Object
                          </a>
                          <a
                            className="headerlink"
                            href="#sample-response-object"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <blockquote>
                          <div>
                            <p>
                              This is a successful API response. Values may
                              change:
                            </p>
                            <div className="highlight-default notranslate">
                              <div className="highlight">
                                <pre>
                                  <span />
                                  <span className="p">{"{"}</span>
                                  {"\n"}
                                  {"                  "}
                                  <span className="s2">"status"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="s2">"OK"</span>
                                  <span className="p">,</span>
                                  {"\n"}
                                  {"                  "}
                                  <span className="s2">"statusCode"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="s2">"9020011000"</span>
                                  <span className="p">,</span>
                                  {"\n"}
                                  {"                  "}
                                  <span className="s2">"statusValue"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="s2">
                                    "Command execution successful"
                                  </span>
                                  <span className="p">,</span>
                                  {"\n"}
                                  {"                  "}
                                  <span className="s2">"data"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="p">{"{"}</span>
                                  {"\n"}
                                  {"                          "}
                                  <span className="s2">"status"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="s2">
                                    "Get user Successful"
                                  </span>
                                  <span className="p">,</span>
                                  {"\n"}
                                  {"                          "}
                                  <span className="s2">"data"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="p">{"{"}</span>
                                  {"\n"}
                                  {"                                  "}
                                  <span className="s2">"username"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="s2">"admin"</span>
                                  <span className="p">,</span>
                                  {"\n"}
                                  {"                                  "}
                                  <span className="s2">"isAdmin"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="n">true</span>
                                  <span className="p">,</span>
                                  {"\n"}
                                  {"                                  "}
                                  <span className="s2">"sessionToken"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="s2">
                                    "eyJ0eXAiOiJKV1QiLCJhbGciO.
                                  </span>
                                  {"\n"}
                                  {"                                  "}
                                  <span className="n">
                                    WluIjp0cnVlLCJleHAiOjE1OTk
                                  </span>
                                  <span className="o">.</span>
                                  {"\n"}
                                  {"                                  "}
                                  <span className="n">
                                    z7TiXh7TNawUcX13g610EtYDQN
                                  </span>
                                  <span className="s2">"</span>
                                  {"\n"}
                                  {"                          "}
                                  <span className="p">{"}"}</span>
                                  {"\n"}
                                  {"                  "}
                                  <span className="p">{"}"}</span>
                                  {"\n"}
                                  <span className="p">{"}"}</span>
                                  {"\n"}
                                </pre>
                              </div>
                            </div>
                          </div>
                        </blockquote>
                      </div>
                      <div className="section" id="error-codes">
                        <h4>
                          <a className="toc-backref" href="#id87">
                            Error Codes
                          </a>
                          <a
                            className="headerlink"
                            href="#error-codes"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <blockquote>
                          <div>
                            <table className="docutils align-default">
                              <colgroup>
                                <col style={{ width: "22%" }} />
                                <col style={{ width: "10%" }} />
                                <col style={{ width: "14%" }} />
                                <col style={{ width: "30%" }} />
                                <col style={{ width: "24%" }} />
                              </colgroup>
                              <tbody>
                                <tr className="row-odd">
                                  <td>
                                    <p>
                                      <strong>Error Description</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>
                                      <strong>Status</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>
                                      <strong>Status Code</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>
                                      <strong>Status Value</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>
                                      <strong>Data</strong>
                                    </p>
                                  </td>
                                </tr>
                                <tr className="row-even">
                                  <td>
                                    <p>Unknown Exception</p>
                                  </td>
                                  <td>
                                    <p>KO</p>
                                  </td>
                                  <td>
                                    <p>9020014000</p>
                                  </td>
                                  <td>
                                    <p>An exception occured in the server.</p>
                                  </td>
                                  <td>
                                    <p>
                                      {"{"}“status”: &lt;error message&gt; {"}"}
                                    </p>
                                  </td>
                                </tr>
                                <tr className="row-odd">
                                  <td>
                                    <p>Incorrect JSON</p>
                                  </td>
                                  <td>
                                    <p>KO</p>
                                  </td>
                                  <td>
                                    <p>9020014001</p>
                                  </td>
                                  <td>
                                    <p>No JSON input data provided</p>
                                  </td>
                                  <td>
                                    <p>
                                      {"{"}“status”: &lt;error message&gt; {"}"}
                                    </p>
                                  </td>
                                </tr>
                                <tr className="row-even">
                                  <td>
                                    <p>Missing Keys</p>
                                  </td>
                                  <td>
                                    <p>KO</p>
                                  </td>
                                  <td>
                                    <p>9020014002</p>
                                  </td>
                                  <td>
                                    <p>Could not find JSON key</p>
                                  </td>
                                  <td>
                                    <p>
                                      {"{"}“status”: &lt;error message&gt; {"}"}
                                    </p>
                                  </td>
                                </tr>
                                <tr className="row-odd">
                                  <td>
                                    <p>Database connection failed</p>
                                  </td>
                                  <td>
                                    <p>KO</p>
                                  </td>
                                  <td>
                                    <p>9020014003</p>
                                  </td>
                                  <td>
                                    <p>Unable to connect database</p>
                                  </td>
                                  <td>
                                    <p>
                                      {"{"}“status”: &lt;error message&gt; {"}"}
                                    </p>
                                  </td>
                                </tr>
                                <tr className="row-even">
                                  <td>
                                    <p>Database operation failed</p>
                                  </td>
                                  <td>
                                    <p>KO</p>
                                  </td>
                                  <td>
                                    <p>9020014004</p>
                                  </td>
                                  <td>
                                    <p>Could not perform database operation</p>
                                  </td>
                                  <td>
                                    <p>
                                      {"{"}“status”: &lt;error message&gt; {"}"}
                                    </p>
                                  </td>
                                </tr>
                                <tr className="row-odd">
                                  <td>
                                    <p>Invalid credentials</p>
                                  </td>
                                  <td>
                                    <p>KO</p>
                                  </td>
                                  <td>
                                    <p>9000014005</p>
                                  </td>
                                  <td>
                                    <p>Invalid credentials</p>
                                  </td>
                                  <td>
                                    <p>
                                      {"{"}“status”: &lt;error message&gt; {"}"}
                                    </p>
                                  </td>
                                </tr>
                                <tr className="row-even">
                                  <td>
                                    <p>Expired or Invalid token</p>
                                  </td>
                                  <td>
                                    <p>KO</p>
                                  </td>
                                  <td>
                                    <p>9000014006</p>
                                  </td>
                                  <td>
                                    <p>Token Expired</p>
                                  </td>
                                  <td>
                                    <p>
                                      {"{"}“status”: &lt;error message&gt; {"}"}
                                    </p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </blockquote>
                      </div>
                    </div>
                    <div className="section" id="authenticate-user">
                      <h3>
                        <a className="toc-backref" href="#id88">
                          002 Authenticate user
                        </a>
                        <a
                          className="headerlink"
                          href="#authenticate-user"
                          title="Permalink to this headline"
                        >
                          ¶
                        </a>
                      </h3>
                      <div className="section" id="id5">
                        <h4>
                          <a className="toc-backref" href="#id89">
                            API Information
                          </a>
                          <a
                            className="headerlink"
                            href="#id5"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <blockquote>
                          <div>
                            <table className="docutils align-default">
                              <colgroup>
                                <col style={{ width: "37%" }} />
                                <col style={{ width: "63%" }} />
                              </colgroup>
                              <tbody>
                                <tr className="row-odd">
                                  <td>
                                    <p>
                                      <strong>Function</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>endpoints.authenticate()</p>
                                  </td>
                                </tr>
                                <tr className="row-even">
                                  <td>
                                    <p>
                                      <strong>Description</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>
                                      Authenticate masterdhcp using username and
                                      password
                                    </p>
                                  </td>
                                </tr>
                                <tr className="row-odd">
                                  <td>
                                    <p>
                                      <strong>HTTP Method</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>POST</p>
                                  </td>
                                </tr>
                                <tr className="row-even">
                                  <td>
                                    <p>
                                      <strong>HTTP Application Type</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>application/json</p>
                                  </td>
                                </tr>
                                <tr className="row-odd">
                                  <td>
                                    <p>
                                      <strong>Call</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>/auth/auth</p>
                                  </td>
                                </tr>
                                <tr className="row-even">
                                  <td>
                                    <p>
                                      <strong>Input Type</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>JSON</p>
                                  </td>
                                </tr>
                                <tr className="row-odd">
                                  <td>
                                    <p>
                                      <strong>Output Type</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>JSON</p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </blockquote>
                      </div>
                      <div className="section" id="id6">
                        <h4>
                          <a className="toc-backref" href="#id90">
                            Request Parameters
                          </a>
                          <a
                            className="headerlink"
                            href="#id6"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <blockquote>
                          <div>
                            <table className="docutils align-default">
                              <colgroup>
                                <col style={{ width: "21%" }} />
                                <col style={{ width: "19%" }} />
                                <col style={{ width: "40%" }} />
                                <col style={{ width: "21%" }} />
                              </colgroup>
                              <tbody>
                                <tr className="row-odd">
                                  <td>
                                    <p>
                                      <strong>Parameters</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>
                                      <strong>Data Type</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>
                                      <strong>Description</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>
                                      <strong>Example</strong>
                                    </p>
                                  </td>
                                </tr>
                                <tr className="row-even">
                                  <td>
                                    <p>username</p>
                                  </td>
                                  <td>
                                    <p>string</p>
                                  </td>
                                  <td>
                                    <p>Master DHCP username</p>
                                  </td>
                                  <td>
                                    <p>admin</p>
                                  </td>
                                </tr>
                                <tr className="row-odd">
                                  <td>
                                    <p>password</p>
                                  </td>
                                  <td>
                                    <p>string</p>
                                  </td>
                                  <td>
                                    <p>password</p>
                                  </td>
                                  <td>
                                    <p>1234abcd</p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </blockquote>
                      </div>
                      <div className="section" id="id7">
                        <h4>
                          <a className="toc-backref" href="#id91">
                            Response Parameters:
                          </a>
                          <a
                            className="headerlink"
                            href="#id7"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <blockquote>
                          <div>
                            <table className="docutils align-default">
                              <colgroup>
                                <col style={{ width: "17%" }} />
                                <col style={{ width: "14%" }} />
                                <col style={{ width: "41%" }} />
                                <col style={{ width: "28%" }} />
                              </colgroup>
                              <tbody>
                                <tr className="row-odd">
                                  <td>
                                    <p>
                                      <strong>Parameters</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>
                                      <strong>Data Type</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>
                                      <strong>Description</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>
                                      <strong>Example</strong>
                                    </p>
                                  </td>
                                </tr>
                                <tr className="row-even">
                                  <td>
                                    <p>status</p>
                                  </td>
                                  <td>
                                    <p>string</p>
                                  </td>
                                  <td>
                                    <p>can be KO or OK</p>
                                  </td>
                                  <td>
                                    <p>“OK”</p>
                                  </td>
                                </tr>
                                <tr className="row-odd">
                                  <td>
                                    <p>statusCode</p>
                                  </td>
                                  <td>
                                    <p>string</p>
                                  </td>
                                  <td>
                                    <p>status code for each error or success</p>
                                  </td>
                                  <td>
                                    <p>“9020031000”</p>
                                  </td>
                                </tr>
                                <tr className="row-even">
                                  <td>
                                    <p>statusValue</p>
                                  </td>
                                  <td>
                                    <p>string</p>
                                  </td>
                                  <td>
                                    <p>
                                      status description corresponding to the
                                      code
                                    </p>
                                  </td>
                                  <td>
                                    <p>“Command execution successful”</p>
                                  </td>
                                </tr>
                                <tr className="row-odd">
                                  <td>
                                    <p>data</p>
                                  </td>
                                  <td>
                                    <p>JSON</p>
                                  </td>
                                  <td>
                                    <p>response data result</p>
                                  </td>
                                  <td>
                                    <p>
                                      {"{"}
                                      {"}"}
                                    </p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </blockquote>
                      </div>
                      <div className="section" id="id8">
                        <h4>
                          <a className="toc-backref" href="#id92">
                            Sample Request URL
                          </a>
                          <a
                            className="headerlink"
                            href="#id8"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <blockquote>
                          <div>
                            <p>
                              <code className="docutils literal notranslate">
                                <span className="pre">
                                  http://10.189.126.14:8086/auth/auth
                                </span>
                              </code>
                            </p>
                          </div>
                        </blockquote>
                      </div>
                      <div className="section" id="id9">
                        <h4>
                          <a className="toc-backref" href="#id93">
                            Sample Request Object
                          </a>
                          <a
                            className="headerlink"
                            href="#id9"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <blockquote>
                          <div>
                            <p>Sample request object is:</p>
                            <div className="highlight-default notranslate">
                              <div className="highlight">
                                <pre>
                                  <span />
                                  <span className="p">{"{"}</span>
                                  {"\n"}
                                  {"        "}
                                  <span className="s2">"username"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="s2">"admin"</span>
                                  <span className="p">,</span>
                                  {"\n"}
                                  {"        "}
                                  <span className="s2">"password"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="s2">"admin"</span>
                                  {"\n"}
                                  <span className="p">{"}"}</span>
                                  {"\n"}
                                </pre>
                              </div>
                            </div>
                          </div>
                        </blockquote>
                      </div>
                      <div className="section" id="id10">
                        <h4>
                          <a className="toc-backref" href="#id94">
                            Sample Response Object
                          </a>
                          <a
                            className="headerlink"
                            href="#id10"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <blockquote>
                          <div>
                            <p>
                              This is a successful API response. Values may
                              change:
                            </p>
                            <div className="highlight-default notranslate">
                              <div className="highlight">
                                <pre>
                                  <span />
                                  <span className="p">{"{"}</span>
                                  {"\n"}
                                  {"        "}
                                  <span className="s2">"status"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="s2">"OK"</span>
                                  <span className="p">,</span>
                                  {"\n"}
                                  {"        "}
                                  <span className="s2">"statusCode"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="s2">"9020031000"</span>
                                  <span className="p">,</span>
                                  {"\n"}
                                  {"        "}
                                  <span className="s2">"statusValue"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="s2">
                                    "Command execution successful"
                                  </span>
                                  <span className="p">,</span>
                                  {"\n"}
                                  {"        "}
                                  <span className="s2">"data"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="p">{"{"}</span>
                                  {"\n"}
                                  {"                "}
                                  <span className="s2">"status"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="s2">"Login Successful"</span>
                                  <span className="p">,</span>
                                  {"\n"}
                                  {"                "}
                                  <span className="s2">"username"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="s2">"admin"</span>
                                  <span className="p">,</span>
                                  {"\n"}
                                  {"                "}
                                  <span className="s2">"isAdmin"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="n">true</span>
                                  <span className="p">,</span>
                                  {"\n"}
                                  {"                "}
                                  <span className="s2">"sessionToken"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="s2">
                                    "eyJ0eXAiOiJKV1QiLCJIUzI1NiJ9.
                                  </span>
                                  {"\n"}
                                  {"                        "}
                                  <span className="n">
                                    eyJ1c2VyIjoiYWRtaW4iLCJpc0FkbWzQ0OTN9
                                  </span>
                                  <span className="o">.</span>
                                  {"\n"}
                                  {"                        "}
                                  <span className="n">
                                    H3RPFXB3valIKXentgng
                                  </span>
                                  <span className="s2">"</span>
                                  {"\n"}
                                  {"        "}
                                  <span className="p">{"}"}</span>
                                  {"\n"}
                                  <span className="p">{"}"}</span>
                                  {"\n"}
                                </pre>
                              </div>
                            </div>
                          </div>
                        </blockquote>
                      </div>
                      <div className="section" id="id11">
                        <h4>
                          <a className="toc-backref" href="#id95">
                            Error Codes
                          </a>
                          <a
                            className="headerlink"
                            href="#id11"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <blockquote>
                          <div>
                            <table className="docutils align-default">
                              <colgroup>
                                <col style={{ width: "21%" }} />
                                <col style={{ width: "8%" }} />
                                <col style={{ width: "12%" }} />
                                <col style={{ width: "38%" }} />
                                <col style={{ width: "21%" }} />
                              </colgroup>
                              <tbody>
                                <tr className="row-odd">
                                  <td>
                                    <p>
                                      <strong>Error Description</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>
                                      <strong>Status</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>
                                      <strong>Status Code</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>
                                      <strong>Status Value</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>
                                      <strong>Data</strong>
                                    </p>
                                  </td>
                                </tr>
                                <tr className="row-even">
                                  <td>
                                    <p>Unknown Exception</p>
                                  </td>
                                  <td>
                                    <p>KO</p>
                                  </td>
                                  <td>
                                    <p>9020024000</p>
                                  </td>
                                  <td>
                                    <p>
                                      An exception occured in the server.
                                      Command unsuccessful
                                    </p>
                                  </td>
                                  <td>
                                    <p>
                                      {"{"}“status”: &lt;error message&gt; {"}"}
                                    </p>
                                  </td>
                                </tr>
                                <tr className="row-odd">
                                  <td>
                                    <p>Incorrect JSON</p>
                                  </td>
                                  <td>
                                    <p>KO</p>
                                  </td>
                                  <td>
                                    <p>9020024001</p>
                                  </td>
                                  <td>
                                    <p>No JSON input data provided</p>
                                  </td>
                                  <td>
                                    <p>
                                      {"{"}“status”: &lt;error message&gt; {"}"}
                                    </p>
                                  </td>
                                </tr>
                                <tr className="row-even">
                                  <td>
                                    <p>Missing Keys</p>
                                  </td>
                                  <td>
                                    <p>KO</p>
                                  </td>
                                  <td>
                                    <p>9020024002</p>
                                  </td>
                                  <td>
                                    <p>Could not find JSON key</p>
                                  </td>
                                  <td>
                                    <p>
                                      {"{"}“status”: &lt;error message&gt; {"}"}
                                    </p>
                                  </td>
                                </tr>
                                <tr className="row-odd">
                                  <td>
                                    <p>Database connection failed</p>
                                  </td>
                                  <td>
                                    <p>KO</p>
                                  </td>
                                  <td>
                                    <p>9020024003</p>
                                  </td>
                                  <td>
                                    <p>Unable to connect database</p>
                                  </td>
                                  <td>
                                    <p>
                                      {"{"}“status”: &lt;error message&gt; {"}"}
                                    </p>
                                  </td>
                                </tr>
                                <tr className="row-even">
                                  <td>
                                    <p>Database operation failed</p>
                                  </td>
                                  <td>
                                    <p>KO</p>
                                  </td>
                                  <td>
                                    <p>9020024004</p>
                                  </td>
                                  <td>
                                    <p>Could not perform database operation</p>
                                  </td>
                                  <td>
                                    <p>
                                      {"{"}“status”: &lt;error message&gt; {"}"}
                                    </p>
                                  </td>
                                </tr>
                                <tr className="row-odd">
                                  <td>
                                    <p>Invalid credentials</p>
                                  </td>
                                  <td>
                                    <p>KO</p>
                                  </td>
                                  <td>
                                    <p>9000024005</p>
                                  </td>
                                  <td>
                                    <p>Invalid credentials</p>
                                  </td>
                                  <td>
                                    <p>
                                      {"{"}“status”: &lt;error message&gt; {"}"}
                                    </p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </blockquote>
                      </div>
                    </div>
                    <div className="section" id="get-auth-tokens">
                      <h3>
                        <a className="toc-backref" href="#id96">
                          003 Get Auth Tokens
                        </a>
                        <a
                          className="headerlink"
                          href="#get-auth-tokens"
                          title="Permalink to this headline"
                        >
                          ¶
                        </a>
                      </h3>
                      <div className="section" id="id12">
                        <h4>
                          <a className="toc-backref" href="#id97">
                            API Information
                          </a>
                          <a
                            className="headerlink"
                            href="#id12"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <blockquote>
                          <div>
                            <table className="docutils align-default">
                              <colgroup>
                                <col style={{ width: "33%" }} />
                                <col style={{ width: "67%" }} />
                              </colgroup>
                              <tbody>
                                <tr className="row-odd">
                                  <td>
                                    <p>
                                      <strong>Function</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>endpoints.get_auth_tokens()</p>
                                  </td>
                                </tr>
                                <tr className="row-even">
                                  <td>
                                    <p>
                                      <strong>Description</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>
                                      Get FAST auth token for a list of servers
                                    </p>
                                  </td>
                                </tr>
                                <tr className="row-odd">
                                  <td>
                                    <p>
                                      <strong>HTTP Method</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>POST</p>
                                  </td>
                                </tr>
                                <tr className="row-even">
                                  <td>
                                    <p>
                                      <strong>HTTP Application Type</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>application/json</p>
                                  </td>
                                </tr>
                                <tr className="row-odd">
                                  <td>
                                    <p>
                                      <strong>Call</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>/auth/get_auth_tokens</p>
                                  </td>
                                </tr>
                                <tr className="row-even">
                                  <td>
                                    <p>
                                      <strong>Input Type</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>JSON</p>
                                  </td>
                                </tr>
                                <tr className="row-odd">
                                  <td>
                                    <p>
                                      <strong>Output Type</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>JSON</p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </blockquote>
                      </div>
                      <div className="section" id="id13">
                        <h4>
                          <a className="toc-backref" href="#id98">
                            Request Parameters
                          </a>
                          <a
                            className="headerlink"
                            href="#id13"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <blockquote>
                          <div>
                            <table className="docutils align-default">
                              <colgroup>
                                <col style={{ width: "21%" }} />
                                <col style={{ width: "19%" }} />
                                <col style={{ width: "40%" }} />
                                <col style={{ width: "21%" }} />
                              </colgroup>
                              <tbody>
                                <tr className="row-odd">
                                  <td>
                                    <p>
                                      <strong>Parameters</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>
                                      <strong>Data Type</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>
                                      <strong>Description</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>
                                      <strong>Example</strong>
                                    </p>
                                  </td>
                                </tr>
                                <tr className="row-even">
                                  <td>
                                    <p>username</p>
                                  </td>
                                  <td>
                                    <p>string</p>
                                  </td>
                                  <td>
                                    <p>Master DHCP username</p>
                                  </td>
                                  <td>
                                    <p>admin</p>
                                  </td>
                                </tr>
                                <tr className="row-odd">
                                  <td>
                                    <p>password</p>
                                  </td>
                                  <td>
                                    <p>string</p>
                                  </td>
                                  <td>
                                    <p>Master DHCP password</p>
                                  </td>
                                  <td>
                                    <p>1234abcd</p>
                                  </td>
                                </tr>
                                <tr className="row-even">
                                  <td>
                                    <p>servers</p>
                                  </td>
                                  <td>
                                    <p>string</p>
                                  </td>
                                  <td>
                                    <p>list of servers</p>
                                  </td>
                                  <td>
                                    <p>admin</p>
                                  </td>
                                </tr>
                                <tr className="row-odd">
                                  <td>
                                    <p>endpoint</p>
                                  </td>
                                  <td>
                                    <p>string</p>
                                  </td>
                                  <td>
                                    <p>fast endpoint for getting token</p>
                                  </td>
                                  <td>
                                    <p>/dhcp4/token</p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </blockquote>
                      </div>
                      <div className="section" id="id14">
                        <h4>
                          <a className="toc-backref" href="#id99">
                            Response Parameters:
                          </a>
                          <a
                            className="headerlink"
                            href="#id14"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <blockquote>
                          <div>
                            <table className="docutils align-default">
                              <colgroup>
                                <col style={{ width: "16%" }} />
                                <col style={{ width: "15%" }} />
                                <col style={{ width: "39%" }} />
                                <col style={{ width: "30%" }} />
                              </colgroup>
                              <tbody>
                                <tr className="row-odd">
                                  <td>
                                    <p>
                                      <strong>Parameters</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>
                                      <strong>Data Type</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>
                                      <strong>Description</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>
                                      <strong>Example</strong>
                                    </p>
                                  </td>
                                </tr>
                                <tr className="row-even">
                                  <td>
                                    <p>status</p>
                                  </td>
                                  <td>
                                    <p>string</p>
                                  </td>
                                  <td>
                                    <p>can be KO or OK</p>
                                  </td>
                                  <td>
                                    <p>“OK”</p>
                                  </td>
                                </tr>
                                <tr className="row-odd">
                                  <td>
                                    <p>statusCode</p>
                                  </td>
                                  <td>
                                    <p>string</p>
                                  </td>
                                  <td>
                                    <p>status code for each error or success</p>
                                  </td>
                                  <td>
                                    <p>“9020031000”</p>
                                  </td>
                                </tr>
                                <tr className="row-even">
                                  <td>
                                    <p>statusValue</p>
                                  </td>
                                  <td>
                                    <p>string</p>
                                  </td>
                                  <td>
                                    <p>
                                      status description corresponding to the
                                      code
                                    </p>
                                  </td>
                                  <td>
                                    <p>“Command execution successful”</p>
                                  </td>
                                </tr>
                                <tr className="row-odd">
                                  <td>
                                    <p>data</p>
                                  </td>
                                  <td>
                                    <p>JSON</p>
                                  </td>
                                  <td>
                                    <p>response data result</p>
                                  </td>
                                  <td>
                                    <p>
                                      {"{"}
                                      {"}"}
                                    </p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </blockquote>
                      </div>
                      <div className="section" id="id15">
                        <h4>
                          <a className="toc-backref" href="#id100">
                            Sample Request URL
                          </a>
                          <a
                            className="headerlink"
                            href="#id15"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <blockquote>
                          <div>
                            <p>
                              <code className="docutils literal notranslate">
                                <span className="pre">
                                  http://10.189.126.14:8086/auth/get_auth_tokens
                                </span>
                              </code>
                            </p>
                          </div>
                        </blockquote>
                      </div>
                      <div className="section" id="id16">
                        <h4>
                          <a className="toc-backref" href="#id101">
                            Sample Request Object
                          </a>
                          <a
                            className="headerlink"
                            href="#id16"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <blockquote>
                          <div>
                            <p>Sample request object is:</p>
                            <div className="highlight-default notranslate">
                              <div className="highlight">
                                <pre>
                                  <span />
                                  <span className="p">{"{"}</span>
                                  {"\n"}
                                  {"        "}
                                  <span className="s2">"username"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="s2">"adminTEST"</span>
                                  <span className="p">,</span>
                                  {"\n"}
                                  {"        "}
                                  <span className="s2">"password"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="s2">"admin"</span>
                                  <span className="p">,</span>
                                  {"\n"}
                                  {"        "}
                                  <span className="s2">"servers"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="p">[</span>
                                  {"\n"}
                                  {"                "}
                                  <span className="p">{"{"}</span>
                                  <span className="s2">"id"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="s2">"KEA001"</span>
                                  <span className="p">,</span>{" "}
                                  <span className="s2">"ip"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="s2">"10.189.134.56"</span>
                                  <span className="p">,</span>{" "}
                                  <span className="s2">"port"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="s2">"5007"</span>
                                  <span className="p">{"}"},</span>
                                  {"\n"}
                                  {"                "}
                                  <span className="p">{"{"}</span>
                                  <span className="s2">"id"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="s2">"KEA002"</span>
                                  <span className="p">,</span>{" "}
                                  <span className="s2">"ip"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="s2">"172.28.12.132"</span>
                                  <span className="p">,</span>{" "}
                                  <span className="s2">"port"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="s2">"5007"</span>
                                  <span className="p">{"}"},</span>
                                  {"\n"}
                                  {"                "}
                                  <span className="p">{"{"}</span>
                                  <span className="s2">"id"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="s2">"KEA003"</span>
                                  <span className="p">,</span>{" "}
                                  <span className="s2">"ip"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="s2">"172.28.11.13"</span>
                                  <span className="p">,</span>{" "}
                                  <span className="s2">"port"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="s2">"5007"</span>
                                  <span className="p">{"}"}</span>
                                  {"\n"}
                                  {"        "}
                                  <span className="p">],</span>
                                  {"\n"}
                                  {"        "}
                                  <span className="s2">"endpoint"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="s2">"/dhcp4/token"</span>
                                  {"\n"}
                                  <span className="p">{"}"}</span>
                                  {"\n"}
                                </pre>
                              </div>
                            </div>
                          </div>
                        </blockquote>
                      </div>
                      <div className="section" id="id17">
                        <h4>
                          <a className="toc-backref" href="#id102">
                            Sample Response Object
                          </a>
                          <a
                            className="headerlink"
                            href="#id17"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <blockquote>
                          <div>
                            <p>
                              This is a successful API response. Values may
                              change:
                            </p>
                            <div className="highlight-default notranslate">
                              <div className="highlight">
                                <pre>
                                  <span />
                                  <span className="p">{"{"}</span>
                                  {"\n"}
                                  {"        "}
                                  <span className="s2">"status"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="s2">"OK"</span>
                                  <span className="p">,</span>
                                  {"\n"}
                                  {"        "}
                                  <span className="s2">"statusCode"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="s2">"9020041000"</span>
                                  <span className="p">,</span>
                                  {"\n"}
                                  {"        "}
                                  <span className="s2">"statusValue"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="s2">
                                    "Command execution successful"
                                  </span>
                                  <span className="p">,</span>
                                  {"\n"}
                                  {"        "}
                                  <span className="s2">"data"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="p">{"{"}</span>
                                  {"\n"}
                                  {"                "}
                                  <span className="s2">"status"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="s2">
                                    "Auth tokens collected"
                                  </span>
                                  <span className="p">,</span>
                                  {"\n"}
                                  {"                "}
                                  <span className="s2">"username"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="s2">"adminTEST"</span>
                                  <span className="p">,</span>
                                  {"\n"}
                                  {"                "}
                                  <span className="s2">"authTokens"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="p">{"{"}</span>
                                  {"\n"}
                                  {"                        "}
                                  <span className="s2">"KEA001"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="s2">
                                    "eyJ0eXAiOiJKLCJhbGciOiJIUzI1NiJ9.
                                  </span>
                                  {"\n"}
                                  {
                                    "                                           "
                                  }
                                  <span className="n">
                                    eyJ1c2VyIjoiYWRtaW4iLCJpc0FkbWlu
                                  </span>
                                  <span className="o">.</span>
                                  {"\n"}
                                  {
                                    "                                           "
                                  }
                                  <span className="n">
                                    z7TiXh7TNawUcX13g610EtYDQNDJ8UX8
                                  </span>
                                  <span className="s2">",</span>
                                  {"\n"}
                                  {"                        "}
                                  <span className="s2">"KEA002"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="s2">
                                    "eyJ0eXAiOiJKV1QiiJIUzI1NiJ9dsafd.
                                  </span>
                                  {"\n"}
                                  {
                                    "                                           "
                                  }
                                  <span className="n">
                                    eyJwZXJtaXNMjI4MTIxTEiLCJrrwedlo
                                  </span>
                                  <span className="o">.</span>
                                  {"\n"}
                                  {
                                    "                                           "
                                  }
                                  <span className="n">
                                    bubaOZR3OfvSz_7GAQEgsdwqfsdaf232
                                  </span>
                                  <span className="s2">"</span>
                                  {"\n"}
                                  {"                "}
                                  <span className="p">{"}"}</span>
                                  {"\n"}
                                  {"        "}
                                  <span className="p">{"}"}</span>
                                  {"\n"}
                                  <span className="p">{"}"}</span>
                                  {"\n"}
                                </pre>
                              </div>
                            </div>
                          </div>
                        </blockquote>
                      </div>
                      <div className="section" id="id18">
                        <h4>
                          <a className="toc-backref" href="#id103">
                            Error Codes
                          </a>
                          <a
                            className="headerlink"
                            href="#id18"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <blockquote>
                          <div>
                            <table className="docutils align-default">
                              <colgroup>
                                <col style={{ width: "20%" }} />
                                <col style={{ width: "10%" }} />
                                <col style={{ width: "14%" }} />
                                <col style={{ width: "30%" }} />
                                <col style={{ width: "26%" }} />
                              </colgroup>
                              <tbody>
                                <tr className="row-odd">
                                  <td>
                                    <p>
                                      <strong>Error Description</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>
                                      <strong>Status</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>
                                      <strong>Status Code</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>
                                      <strong>Status Value</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>
                                      <strong>Data</strong>
                                    </p>
                                  </td>
                                </tr>
                                <tr className="row-even">
                                  <td>
                                    <p>Unknown Exception</p>
                                  </td>
                                  <td>
                                    <p>KO</p>
                                  </td>
                                  <td>
                                    <p>9020034000</p>
                                  </td>
                                  <td>
                                    <p>An exception occured in the server.</p>
                                  </td>
                                  <td>
                                    <p>
                                      {"{"}“status”: &lt;error message&gt; {"}"}
                                    </p>
                                  </td>
                                </tr>
                                <tr className="row-odd">
                                  <td>
                                    <p>Incorrect JSON</p>
                                  </td>
                                  <td>
                                    <p>KO</p>
                                  </td>
                                  <td>
                                    <p>9020034001</p>
                                  </td>
                                  <td>
                                    <p>No JSON input data provided</p>
                                  </td>
                                  <td>
                                    <p>
                                      {"{"}“status”: &lt;error message&gt; {"}"}
                                    </p>
                                  </td>
                                </tr>
                                <tr className="row-even">
                                  <td>
                                    <p>Missing Keys</p>
                                  </td>
                                  <td>
                                    <p>KO</p>
                                  </td>
                                  <td>
                                    <p>9020034002</p>
                                  </td>
                                  <td>
                                    <p>Could not find JSON key</p>
                                  </td>
                                  <td>
                                    <p>
                                      {"{"}“status”: &lt;error message&gt; {"}"}
                                    </p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </blockquote>
                      </div>
                    </div>
                    <div className="section" id="get-serever-s-status">
                      <h3>
                        <a className="toc-backref" href="#id104">
                          004 Get Serever’s Status
                        </a>
                        <a
                          className="headerlink"
                          href="#get-serever-s-status"
                          title="Permalink to this headline"
                        >
                          ¶
                        </a>
                      </h3>
                      <div className="section" id="id19">
                        <h4>
                          <a className="toc-backref" href="#id105">
                            API Information
                          </a>
                          <a
                            className="headerlink"
                            href="#id19"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <blockquote>
                          <div>
                            <table className="docutils align-default">
                              <colgroup>
                                <col style={{ width: "33%" }} />
                                <col style={{ width: "67%" }} />
                              </colgroup>
                              <tbody>
                                <tr className="row-odd">
                                  <td>
                                    <p>
                                      <strong>Function</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>endpoints.check_servers_status()</p>
                                  </td>
                                </tr>
                                <tr className="row-even">
                                  <td>
                                    <p>
                                      <strong>Description</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>
                                      Get session details from session token.
                                    </p>
                                  </td>
                                </tr>
                                <tr className="row-odd">
                                  <td>
                                    <p>
                                      <strong>HTTP Method</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>POST</p>
                                  </td>
                                </tr>
                                <tr className="row-even">
                                  <td>
                                    <p>
                                      <strong>HTTP Application Type</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>application/json</p>
                                  </td>
                                </tr>
                                <tr className="row-odd">
                                  <td>
                                    <p>
                                      <strong>Call</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>/auth/servers_status</p>
                                  </td>
                                </tr>
                                <tr className="row-even">
                                  <td>
                                    <p>
                                      <strong>Input Type</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>JSON</p>
                                  </td>
                                </tr>
                                <tr className="row-odd">
                                  <td>
                                    <p>
                                      <strong>Output Type</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>JSON</p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </blockquote>
                      </div>
                      <div className="section" id="id20">
                        <h4>
                          <a className="toc-backref" href="#id106">
                            Request Parameters
                          </a>
                          <a
                            className="headerlink"
                            href="#id20"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <blockquote>
                          <div>
                            <table className="docutils align-default">
                              <colgroup>
                                <col style={{ width: "16%" }} />
                                <col style={{ width: "14%" }} />
                                <col style={{ width: "30%" }} />
                                <col style={{ width: "40%" }} />
                              </colgroup>
                              <tbody>
                                <tr className="row-odd">
                                  <td>
                                    <p>
                                      <strong>Parameters</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>
                                      <strong>Data Type</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>
                                      <strong>Description</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>
                                      <strong>Example</strong>
                                    </p>
                                  </td>
                                </tr>
                                <tr className="row-even">
                                  <td>
                                    <p>sessionToken</p>
                                  </td>
                                  <td>
                                    <p>string</p>
                                  </td>
                                  <td>
                                    <p>Master DHCP Session Token</p>
                                  </td>
                                  <td>
                                    <p>
                                      eyJ0eI1NiJ9.etaW4iLCJpc0FkNDZ9.z7TiX8RwEmfK
                                    </p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </blockquote>
                      </div>
                      <div className="section" id="id21">
                        <h4>
                          <a className="toc-backref" href="#id107">
                            Response Parameters:
                          </a>
                          <a
                            className="headerlink"
                            href="#id21"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <blockquote>
                          <div>
                            <table className="docutils align-default">
                              <colgroup>
                                <col style={{ width: "17%" }} />
                                <col style={{ width: "13%" }} />
                                <col style={{ width: "42%" }} />
                                <col style={{ width: "28%" }} />
                              </colgroup>
                              <tbody>
                                <tr className="row-odd">
                                  <td>
                                    <p>
                                      <strong>Parameters</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>
                                      <strong>Data Type</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>
                                      <strong>Description</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>
                                      <strong>Example</strong>
                                    </p>
                                  </td>
                                </tr>
                                <tr className="row-even">
                                  <td>
                                    <p>status</p>
                                  </td>
                                  <td>
                                    <p>string</p>
                                  </td>
                                  <td>
                                    <p>can be KO or OK</p>
                                  </td>
                                  <td>
                                    <p>“OK”</p>
                                  </td>
                                </tr>
                                <tr className="row-odd">
                                  <td>
                                    <p>statusCode</p>
                                  </td>
                                  <td>
                                    <p>string</p>
                                  </td>
                                  <td>
                                    <p>status code for each error or success</p>
                                  </td>
                                  <td>
                                    <p>“9020031000”</p>
                                  </td>
                                </tr>
                                <tr className="row-even">
                                  <td>
                                    <p>statusValue</p>
                                  </td>
                                  <td>
                                    <p>string</p>
                                  </td>
                                  <td>
                                    <p>
                                      status description corresponding to the
                                      code
                                    </p>
                                  </td>
                                  <td>
                                    <p>“Command execution successful”</p>
                                  </td>
                                </tr>
                                <tr className="row-odd">
                                  <td>
                                    <p>data</p>
                                  </td>
                                  <td>
                                    <p>JSON</p>
                                  </td>
                                  <td>
                                    <p>response data result</p>
                                  </td>
                                  <td>
                                    <p>
                                      {"{"}
                                      {"}"}
                                    </p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </blockquote>
                      </div>
                      <div className="section" id="id22">
                        <h4>
                          <a className="toc-backref" href="#id108">
                            Sample Request URL
                          </a>
                          <a
                            className="headerlink"
                            href="#id22"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <blockquote>
                          <div>
                            <p>
                              <code className="docutils literal notranslate">
                                <span className="pre">
                                  http://10.189.126.14:8086/auth/servers_status
                                </span>
                              </code>
                            </p>
                          </div>
                        </blockquote>
                      </div>
                      <div className="section" id="id23">
                        <h4>
                          <a className="toc-backref" href="#id109">
                            Sample Request Object
                          </a>
                          <a
                            className="headerlink"
                            href="#id23"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <blockquote>
                          <div>
                            <p>Sample request object is:</p>
                            <div className="highlight-default notranslate">
                              <div className="highlight">
                                <pre>
                                  <span />
                                  <span className="p">{"{"}</span>
                                  {"\n"}
                                  {"        "}
                                  <span className="s2">"servers"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="p">[</span>
                                  {"\n"}
                                  {"                "}
                                  <span className="p">{"{"}</span>
                                  <span className="s2">"id"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="s2">"KEA001"</span>
                                  <span className="p">,</span>{" "}
                                  <span className="s2">"ip"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="s2">"10.189.134.56"</span>
                                  <span className="p">,</span>{" "}
                                  <span className="s2">"port"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="s2">"5007"</span>
                                  <span className="p">{"}"},</span>
                                  {"\n"}
                                  {"                "}
                                  <span className="p">{"{"}</span>
                                  <span className="s2">"id"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="s2">"KEA002"</span>
                                  <span className="p">,</span>{" "}
                                  <span className="s2">"ip"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="s2">"172.28.12.132"</span>
                                  <span className="p">,</span>{" "}
                                  <span className="s2">"port"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="s2">"5007"</span>
                                  <span className="p">{"}"},</span>
                                  {"\n"}
                                  {"                "}
                                  <span className="p">{"{"}</span>
                                  <span className="s2">"id"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="s2">"KEA003"</span>
                                  <span className="p">,</span>{" "}
                                  <span className="s2">"ip"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="s2">"172.28.11.13"</span>
                                  <span className="p">,</span>{" "}
                                  <span className="s2">"port"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="s2">"5007"</span>
                                  <span className="p">{"}"}</span>
                                  {"\n"}
                                  {"        "}
                                  <span className="p">]</span>
                                  {"\n"}
                                  <span className="p">{"}"}</span>
                                  {"\n"}
                                </pre>
                              </div>
                            </div>
                          </div>
                        </blockquote>
                      </div>
                      <div className="section" id="id24">
                        <h4>
                          <a className="toc-backref" href="#id110">
                            Sample Response Object
                          </a>
                          <a
                            className="headerlink"
                            href="#id24"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <blockquote>
                          <div>
                            <p>
                              This is a successful API response. Values may
                              change:
                            </p>
                            <div className="highlight-default notranslate">
                              <div className="highlight">
                                <pre>
                                  <span />
                                  <span className="p">{"{"}</span>
                                  {"\n"}
                                  {"        "}
                                  <span className="s2">"status"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="s2">"OK"</span>
                                  <span className="p">,</span>
                                  {"\n"}
                                  {"        "}
                                  <span className="s2">"statusCode"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="s2">"9020051000"</span>
                                  <span className="p">,</span>
                                  {"\n"}
                                  {"        "}
                                  <span className="s2">"statusValue"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="s2">
                                    "Command execution successful"
                                  </span>
                                  <span className="p">,</span>
                                  {"\n"}
                                  {"        "}
                                  <span className="s2">"data"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="p">{"{"}</span>
                                  {"\n"}
                                  {"                "}
                                  <span className="s2">"status"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="s2">
                                    "Server status checks successful"
                                  </span>
                                  <span className="p">,</span>
                                  {"\n"}
                                  {"                "}
                                  <span className="s2">"serversStatus"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="p">{"{"}</span>
                                  {"\n"}
                                  {"                        "}
                                  <span className="s2">"10.189.134.56"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="n">true</span>
                                  <span className="p">,</span>
                                  {"\n"}
                                  {"                        "}
                                  <span className="s2">"172.28.12.132"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="n">true</span>
                                  <span className="p">,</span>
                                  {"\n"}
                                  {"                        "}
                                  <span className="s2">"172.28.11.13"</span>
                                  <span className="p">:</span>{" "}
                                  <span className="n">false</span>
                                  {"\n"}
                                  {"                "}
                                  <span className="p">{"}"}</span>
                                  {"\n"}
                                  {"        "}
                                  <span className="p">{"}"}</span>
                                  {"\n"}
                                  <span className="p">{"}"}</span>
                                  {"\n"}
                                </pre>
                              </div>
                            </div>
                          </div>
                        </blockquote>
                      </div>
                      <div className="section" id="id25">
                        <h4>
                          <a className="toc-backref" href="#id111">
                            Error Codes
                          </a>
                          <a
                            className="headerlink"
                            href="#id25"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <blockquote>
                          <div>
                            <table className="docutils align-default">
                              <colgroup>
                                <col style={{ width: "21%" }} />
                                <col style={{ width: "8%" }} />
                                <col style={{ width: "12%" }} />
                                <col style={{ width: "38%" }} />
                                <col style={{ width: "21%" }} />
                              </colgroup>
                              <tbody>
                                <tr className="row-odd">
                                  <td>
                                    <p>
                                      <strong>Error Description</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>
                                      <strong>Status</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>
                                      <strong>Status Code</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>
                                      <strong>Status Value</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <p>
                                      <strong>Data</strong>
                                    </p>
                                  </td>
                                </tr>
                                <tr className="row-even">
                                  <td>
                                    <p>Unknown Exception</p>
                                  </td>
                                  <td>
                                    <p>KO</p>
                                  </td>
                                  <td>
                                    <p>9020044000</p>
                                  </td>
                                  <td>
                                    <p>
                                      An exception occured in the server.
                                      Command unsuccessful
                                    </p>
                                  </td>
                                  <td>
                                    <p>
                                      {"{"}“status”: &lt;error message&gt; {"}"}
                                    </p>
                                  </td>
                                </tr>
                                <tr className="row-odd">
                                  <td>
                                    <p>Incorrect JSON</p>
                                  </td>
                                  <td>
                                    <p>KO</p>
                                  </td>
                                  <td>
                                    <p>9020044001</p>
                                  </td>
                                  <td>
                                    <p>No JSON input data provided</p>
                                  </td>
                                  <td>
                                    <p>
                                      {"{"}“status”: &lt;error message&gt; {"}"}
                                    </p>
                                  </td>
                                </tr>
                                <tr className="row-even">
                                  <td>
                                    <p>Missing Keys</p>
                                  </td>
                                  <td>
                                    <p>KO</p>
                                  </td>
                                  <td>
                                    <p>9020044002</p>
                                  </td>
                                  <td>
                                    <p>Could not find JSON key</p>
                                  </td>
                                  <td>
                                    <p>
                                      {"{"}“status”: &lt;error message&gt; {"}"}
                                    </p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </blockquote>
                      </div>
                    </div>
                  </div>
                  <div className="section" id="master-dhcp-gui-user-guide">
                    <h2>
                      <a className="toc-backref" href="#id112">
                        Master DHCP GUI User Guide
                      </a>
                      <a
                        className="headerlink"
                        href="#master-dhcp-gui-user-guide"
                        title="Permalink to this headline"
                      >
                        ¶
                      </a>
                    </h2>
                    <div className="section" id="change-lab-and-server">
                      <h3>
                        <a className="toc-backref" href="#id113">
                          Change lab and server
                        </a>
                        <a
                          className="headerlink"
                          href="#change-lab-and-server"
                          title="Permalink to this headline"
                        >
                          ¶
                        </a>
                      </h3>
                      <p>
                        Step 1: Click on the server IP button on top-right of
                        the page.
                      </p>
                      <a
                        className="reference internal image-reference"
                        href="_images/change_server_btn.png"
                      >
                        <img
                          alt="_images/change_server_btn.png"
                          src="_images/change_server_btn.png"
                          style={{ width: "200px" }}
                        />
                      </a>
                      <p>Step 2: Choose appropriate Lab</p>
                      <a
                        className="reference internal image-reference"
                        href="_images/choose_server_page.png"
                      >
                        <img
                          alt="_images/choose_server_page.png"
                          src="_images/choose_server_page.png"
                          style={{ width: "600px" }}
                        />
                      </a>
                      <p>
                        Step 3: Click on the select button for required server.
                      </p>
                    </div>
                    <div className="section" id="subnets">
                      <h3>
                        <a className="toc-backref" href="#id114">
                          Subnets
                        </a>
                        <a
                          className="headerlink"
                          href="#subnets"
                          title="Permalink to this headline"
                        >
                          ¶
                        </a>
                      </h3>
                      <div className="section" id="view-subnet">
                        <h4>
                          <a className="toc-backref" href="#id115">
                            View subnet
                          </a>
                          <a
                            className="headerlink"
                            href="#view-subnet"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <p>
                          Step 1: Choose the subnet ID from the drop down list.
                        </p>
                        <a
                          className="reference internal image-reference"
                          href="_images/subnet_view_001.png"
                        >
                          <img
                            alt="_images/subnet_view_001.png"
                            src="_images/subnet_view_001.png"
                            style={{ width: "200px" }}
                          />
                        </a>
                        <p>Step 2: To view option-data/pools/reservations;</p>
                        <ol className="loweralpha simple">
                          <li>
                            <p>Click on the respective buttons,</p>
                          </li>
                        </ol>
                        <a
                          className="reference internal image-reference"
                          href="_images/subnet_view_002.png"
                        >
                          <img
                            alt="_images/subnet_view_002.png"
                            src="_images/subnet_view_002.png"
                            style={{ width: "300px" }}
                          />
                        </a>
                        <ol className="loweralpha simple" start={2}>
                          <li>
                            <p>Choose the required item,</p>
                          </li>
                        </ol>
                        <a
                          className="reference internal image-reference"
                          href="_images/subnet_view_003.png"
                        >
                          <img
                            alt="_images/subnet_view_003.png"
                            src="_images/subnet_view_003.png"
                            style={{ width: "300px" }}
                          />
                        </a>
                        <ol className="loweralpha simple" start={3}>
                          <li>
                            <p>
                              Selected item will get displayed on the right
                              side.
                            </p>
                          </li>
                        </ol>
                        <a
                          className="reference internal image-reference"
                          href="_images/subnet_view_004.png"
                        >
                          <img
                            alt="_images/subnet_view_004.png"
                            src="_images/subnet_view_004.png"
                            style={{ width: "600px" }}
                          />
                        </a>
                        <p>
                          Step 3: To view relay item, click on the eye button.
                          Item will be displayed at right column.
                        </p>
                        <a
                          className="reference internal image-reference"
                          href="_images/subnet_view_005.png"
                        >
                          <img
                            alt="_images/subnet_view_005.png"
                            src="_images/subnet_view_005.png"
                            style={{ width: "400px" }}
                          />
                        </a>
                      </div>
                      <div className="section" id="add-subnet">
                        <h4>
                          <a className="toc-backref" href="#id116">
                            Add subnet
                          </a>
                          <a
                            className="headerlink"
                            href="#add-subnet"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <p>
                          Step 1: Click on the <em>Add Subnet</em> button.
                        </p>
                        <a
                          className="reference internal image-reference"
                          href="_images/subnet_add_001.png"
                        >
                          <img
                            alt="_images/subnet_add_001.png"
                            src="_images/subnet_add_001.png"
                            style={{ width: "600px" }}
                          />
                        </a>
                        <p>Step 2: Fill the required details.</p>
                        <a
                          className="reference internal image-reference"
                          href="_images/subnet_add_002a.png"
                        >
                          <img
                            alt="_images/subnet_add_002a.png"
                            src="_images/subnet_add_002a.png"
                            style={{ width: "600px" }}
                          />
                        </a>
                        <a
                          className="reference internal image-reference"
                          href="_images/subnet_add_002b.png"
                        >
                          <img
                            alt="_images/subnet_add_002b.png"
                            src="_images/subnet_add_002b.png"
                            style={{ width: "600px" }}
                          />
                        </a>
                        <p>
                          Step 3: Click on the update (tick) button before
                          adding option-data/pools/reservations. This is
                          important because the filled details will be lost if
                          we edit next column without saving the first column.
                        </p>
                        <a
                          className="reference internal image-reference"
                          href="_images/tick.png"
                        >
                          <img
                            alt="_images/tick.png"
                            src="_images/tick.png"
                            style={{ width: "50px", height: "100px" }}
                          />
                        </a>
                        <p>
                          Step 4: Add option-data/pools/reservations by clicking
                          add (+) button next to the field.
                        </p>
                        <a
                          className="reference internal image-reference"
                          href="_images/plus.png"
                        >
                          <img
                            alt="_images/plus.png"
                            src="_images/plus.png"
                            style={{ width: "100px", height: "100px" }}
                          />
                        </a>
                        <p>
                          In such cases, a + sign will be prepended to the table
                          label which indicates this is a new data being added
                          and not an existing one.
                        </p>
                        <a
                          className="reference internal image-reference"
                          href="_images/subnet_add_003.png"
                        >
                          <img
                            alt="_images/subnet_add_003.png"
                            src="_images/subnet_add_003.png"
                            style={{ width: "400px" }}
                          />
                        </a>
                        <p>
                          After filling appropriate data, click on the update
                          button to save.
                        </p>
                        <p>
                          Step5: After filling the subnet details, click on the{" "}
                          <em>update</em> button to see the subnet object we are
                          going to add. This Button will appear when we start
                          filling/editing the details.
                        </p>
                        <a
                          className="reference internal image-reference"
                          href="_images/update.png"
                        >
                          <img
                            alt="_images/update.png"
                            src="_images/update.png"
                            style={{ width: "200px" }}
                          />
                        </a>
                        <p>
                          Clicking the <em>diff</em> button will display the
                          difference between current object ({"{"}
                          {"}"} in the case) and updated object.
                        </p>
                        <p>
                          Step 6: Submit after verifying the subnet details.
                        </p>
                      </div>
                      <div className="section" id="modify-subnet">
                        <h4>
                          <a className="toc-backref" href="#id117">
                            Modify subnet
                          </a>
                          <a
                            className="headerlink"
                            href="#modify-subnet"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <p>Step 1: Choose the subnet from the dropdown list.</p>
                        <a
                          className="reference internal image-reference"
                          href="_images/subnet_mod_001.png"
                        >
                          <img
                            alt="_images/subnet_mod_001.png"
                            src="_images/subnet_mod_001.png"
                            style={{ width: "600px" }}
                          />
                        </a>
                        <p>Step 2: Fill the required details.</p>
                        <a
                          className="reference internal image-reference"
                          href="_images/subnet_mod_002a.png"
                        >
                          <img
                            alt="_images/subnet_mod_002a.png"
                            src="_images/subnet_mod_002a.png"
                            style={{ width: "600px" }}
                          />
                        </a>
                        <a
                          className="reference internal image-reference"
                          href="_images/subnet_mod_002b.png"
                        >
                          <img
                            alt="_images/subnet_mod_002b.png"
                            src="_images/subnet_mod_002b.png"
                            style={{ width: "600px" }}
                          />
                        </a>
                        <p>
                          Step 3: Click on the update (tick) button before
                          adding option-data/pools/reservations. This is
                          important because the filled details will be lost if
                          we edit next column without saving the first column.
                        </p>
                        <a
                          className="reference internal image-reference"
                          href="_images/tick.png"
                        >
                          <img
                            alt="_images/tick.png"
                            src="_images/tick.png"
                            style={{ width: "50px", height: "100px" }}
                          />
                        </a>
                        <p>
                          Step 4: Add option-data/pools/reservations by clicking
                          add (+) button next to the field.
                        </p>
                        <a
                          className="reference internal image-reference"
                          href="_images/plus.png"
                        >
                          <img
                            alt="_images/plus.png"
                            src="_images/plus.png"
                            style={{ width: "100px", height: "100px" }}
                          />
                        </a>
                        <p>
                          In such cases, a + sign will be prepended to the table
                          label which indicates this is a new data being added
                          and not an existing one.
                        </p>
                        <a
                          className="reference internal image-reference"
                          href="_images/subnet_add_003.png"
                        >
                          <img
                            alt="_images/subnet_add_003.png"
                            src="_images/subnet_add_003.png"
                            style={{ width: "400px" }}
                          />
                        </a>
                        <p>
                          After filling appropriate data, click on the update
                          button to save.
                        </p>
                        <p>
                          Step5: After filling the subnet details, click on the{" "}
                          <em>update</em> button to see the subnet object we are
                          going to add. This Button will appear when we start
                          filling/editing the details.
                        </p>
                        <a
                          className="reference internal image-reference"
                          href="_images/update.png"
                        >
                          <img
                            alt="_images/update.png"
                            src="_images/update.png"
                            style={{ width: "200px" }}
                          />
                        </a>
                        <p>
                          Clicking the <em>diff</em> button will display the
                          difference between current object and updated object.
                        </p>
                        <p>
                          Step 6: Submit after verifying the subnet details.
                        </p>
                      </div>
                      <div className="section" id="delete-subnet">
                        <h4>
                          <a className="toc-backref" href="#id118">
                            Delete subnet
                          </a>
                          <a
                            className="headerlink"
                            href="#delete-subnet"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <p>Step 1: Choose the subnet from the dropdown list.</p>
                        <a
                          className="reference internal image-reference"
                          href="_images/subnet_mod_001.png"
                        >
                          <img
                            alt="_images/subnet_mod_001.png"
                            src="_images/subnet_mod_001.png"
                            style={{ width: "600px" }}
                          />
                        </a>
                        <p>
                          Step 2: Click the trash button on the top-right of
                          table.
                        </p>
                        <p>Step 3: Confirm delete on the popup window.</p>
                        <a
                          className="reference internal image-reference"
                          href="_images/subnet_del_001.png"
                        >
                          <img
                            alt="_images/subnet_del_001.png"
                            src="_images/subnet_del_001.png"
                            style={{ width: "600px" }}
                          />
                        </a>
                      </div>
                    </div>
                    <div className="section" id="leases">
                      <h3>
                        <a className="toc-backref" href="#id119">
                          Leases
                        </a>
                        <a
                          className="headerlink"
                          href="#leases"
                          title="Permalink to this headline"
                        >
                          ¶
                        </a>
                      </h3>
                      <div className="section" id="view-leases">
                        <h4>
                          <a className="toc-backref" href="#id120">
                            View leases
                          </a>
                          <a
                            className="headerlink"
                            href="#view-leases"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <p>
                          Step1: Click on the Leases tab and leases will be
                          loaded and displayed.
                        </p>
                        <a
                          className="reference internal image-reference"
                          href="_images/leases_view_001.png"
                        >
                          <img
                            alt="_images/leases_view_001.png"
                            src="_images/leases_view_001.png"
                            style={{ width: "500px" }}
                          />
                        </a>
                      </div>
                      <div className="section" id="add-lease">
                        <h4>
                          <a className="toc-backref" href="#id121">
                            Add lease
                          </a>
                          <a
                            className="headerlink"
                            href="#add-lease"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <p>Step 1: Click on the add lease button.</p>
                        <a
                          className="reference internal image-reference"
                          href="_images/leases_add_001.png"
                        >
                          <img
                            alt="_images/leases_add_001.png"
                            src="_images/leases_add_001.png"
                            style={{ width: "150px" }}
                          />
                        </a>
                        <p>Step 2: Fill lease details.</p>
                        <a
                          className="reference internal image-reference"
                          href="_images/leases_add_002a.png"
                        >
                          <img
                            alt="_images/leases_add_002a.png"
                            src="_images/leases_add_002a.png"
                            style={{ width: "500px" }}
                          />
                        </a>
                        <a
                          className="reference internal image-reference"
                          href="_images/leases_add_002b.png"
                        >
                          <img
                            alt="_images/leases_add_002b.png"
                            src="_images/leases_add_002b.png"
                            style={{ width: "500px" }}
                          />
                        </a>
                        <p>
                          Step 3: After filling the subnet details, click on the{" "}
                          <em>update</em> button to see the subnet object we are
                          going to add. This Button will appear when we start
                          filling/editing the details.
                        </p>
                        <a
                          className="reference internal image-reference"
                          href="_images/update.png"
                        >
                          <img
                            alt="_images/update.png"
                            src="_images/update.png"
                            style={{ width: "200px" }}
                          />
                        </a>
                        <p>Step 4: Verify the details and click submit</p>
                        <a
                          className="reference internal image-reference"
                          href="_images/leases_add_003.png"
                        >
                          <img
                            alt="_images/leases_add_003.png"
                            src="_images/leases_add_003.png"
                            style={{ width: "500px" }}
                          />
                        </a>
                      </div>
                      <div className="section" id="modify-lease">
                        <h4>
                          <a className="toc-backref" href="#id122">
                            Modify lease
                          </a>
                          <a
                            className="headerlink"
                            href="#modify-lease"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <p>
                          Step 1: Click the edit button at the right most column
                          of the lease to modify.
                        </p>
                        <a
                          className="reference internal image-reference"
                          href="_images/leases_mod_001.png"
                        >
                          <img
                            alt="_images/leases_mod_001.png"
                            src="_images/leases_mod_001.png"
                            style={{ width: "500px" }}
                          />
                        </a>
                        <p>
                          Step 2: Click the edit button to enable the fields.
                        </p>
                        <p>Step 3: Fill lease details.</p>
                        <a
                          className="reference internal image-reference"
                          href="_images/leases_add_002a.png"
                        >
                          <img
                            alt="_images/leases_add_002a.png"
                            src="_images/leases_add_002a.png"
                            style={{ width: "500px" }}
                          />
                        </a>
                        <a
                          className="reference internal image-reference"
                          href="_images/leases_add_002b.png"
                        >
                          <img
                            alt="_images/leases_add_002b.png"
                            src="_images/leases_add_002b.png"
                            style={{ width: "500px" }}
                          />
                        </a>
                        <p>
                          Step 4: After filling the subnet details, click on the{" "}
                          <em>update</em> button to see the subnet object we are
                          going to add. This Button will appear when we start
                          filling/editing the details.
                        </p>
                        <a
                          className="reference internal image-reference"
                          href="_images/update.png"
                        >
                          <img
                            alt="_images/update.png"
                            src="_images/update.png"
                            style={{ width: "200px" }}
                          />
                        </a>
                        <p>Step 5: Verify the details and click submit.</p>
                        <a
                          className="reference internal image-reference"
                          href="_images/leases_add_003.png"
                        >
                          <img
                            alt="_images/leases_add_003.png"
                            src="_images/leases_add_003.png"
                            style={{ width: "500px" }}
                          />
                        </a>
                      </div>
                      <div className="section" id="delete-lease">
                        <h4>
                          <a className="toc-backref" href="#id123">
                            Delete lease
                          </a>
                          <a
                            className="headerlink"
                            href="#delete-lease"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <p>
                          Step 1: Click the edit button at the right most column
                          of the lease to modify.
                        </p>
                        <a
                          className="reference internal image-reference"
                          href="_images/leases_mod_001.png"
                        >
                          <img
                            alt="_images/leases_mod_001.png"
                            src="_images/leases_mod_001.png"
                            style={{ width: "500px" }}
                          />
                        </a>
                        <p>
                          Step 2: Click the trash button to delete the lease.
                        </p>
                        <p>Step 3: Confirm delete on the pop up.</p>
                        <a
                          className="reference internal image-reference"
                          href="_images/leases_del_001.png"
                        >
                          <img
                            alt="_images/leases_del_001.png"
                            src="_images/leases_del_001.png"
                            style={{ width: "500px" }}
                          />
                        </a>
                      </div>
                      <div className="section" id="wipe-lease">
                        <h4>
                          <a className="toc-backref" href="#id124">
                            Wipe lease
                          </a>
                          <a
                            className="headerlink"
                            href="#wipe-lease"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <p>Step 1: Click on the wipe button.</p>
                        <a
                          className="reference internal image-reference"
                          href="_images/leases_add_001.png"
                        >
                          <img
                            alt="_images/leases_add_001.png"
                            src="_images/leases_add_001.png"
                            style={{ width: "150px" }}
                          />
                        </a>
                        <p>
                          Step 2: Enter the subnet ID and click the wipe button
                          to wipe all the leases associated with that subnet.
                        </p>
                        <a
                          className="reference internal image-reference"
                          href="_images/leases_wipe_001.png"
                        >
                          <img
                            alt="_images/leases_wipe_001.png"
                            src="_images/leases_wipe_001.png"
                            style={{ width: "400px" }}
                          />
                        </a>
                      </div>
                    </div>
                    <div className="section" id="client-classes">
                      <h3>
                        <a className="toc-backref" href="#id125">
                          Client Classes
                        </a>
                        <a
                          className="headerlink"
                          href="#client-classes"
                          title="Permalink to this headline"
                        >
                          ¶
                        </a>
                      </h3>
                      <div className="section" id="view-client-classes">
                        <h4>
                          <a className="toc-backref" href="#id126">
                            View client classes
                          </a>
                          <a
                            className="headerlink"
                            href="#view-client-classes"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <p>Step 1: Choose the client class to display.</p>
                        <a
                          className="reference internal image-reference"
                          href="_images/cc_view_001.png"
                        >
                          <img
                            alt="_images/cc_view_001.png"
                            src="_images/cc_view_001.png"
                            style={{ width: "400px" }}
                          />
                        </a>
                        <a
                          className="reference internal image-reference"
                          href="_images/cc_view_002.png"
                        >
                          <img
                            alt="_images/cc_view_002.png"
                            src="_images/cc_view_002.png"
                            style={{ width: "400px" }}
                          />
                        </a>
                      </div>
                      <div className="section" id="add-client-classes">
                        <h4>
                          <a className="toc-backref" href="#id127">
                            Add client classes
                          </a>
                          <a
                            className="headerlink"
                            href="#add-client-classes"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <p>Step 1: Click on the “Add Client Class” button.</p>
                        <a
                          className="reference internal image-reference"
                          href="_images/cc_add_001.png"
                        >
                          <img
                            alt="_images/cc_add_001.png"
                            src="_images/cc_add_001.png"
                            style={{ width: "500px" }}
                          />
                        </a>
                        <p>Step 2: Fill the client class details.</p>
                        <a
                          className="reference internal image-reference"
                          href="_images/cc_add_002.png"
                        >
                          <img
                            alt="_images/cc_add_002.png"
                            src="_images/cc_add_002.png"
                            style={{ width: "500px" }}
                          />
                        </a>
                        <p>
                          Step 3: After filling the subnet details, click on the{" "}
                          <em>update</em> button to see the subnet object we are
                          going to add. This Button will appear when we start
                          filling/editing the details.
                        </p>
                        <a
                          className="reference internal image-reference"
                          href="_images/update.png"
                        >
                          <img
                            alt="_images/update.png"
                            src="_images/update.png"
                            style={{ width: "200px" }}
                          />
                        </a>
                        <p>Step 5: Verify the details and click submit.</p>
                        <a
                          className="reference internal image-reference"
                          href="_images/cc_add_003.png"
                        >
                          <img
                            alt="_images/cc_add_003.png"
                            src="_images/cc_add_003.png"
                            style={{ width: "500px" }}
                          />
                        </a>
                      </div>
                      <div className="section" id="modify-client-classes">
                        <h4>
                          <a className="toc-backref" href="#id128">
                            Modify client classes
                          </a>
                          <a
                            className="headerlink"
                            href="#modify-client-classes"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <p>Step 1: Choose the client class to modify.</p>
                        <a
                          className="reference internal image-reference"
                          href="_images/cc_view_001.png"
                        >
                          <img
                            alt="_images/cc_view_001.png"
                            src="_images/cc_view_001.png"
                            style={{ width: "400px" }}
                          />
                        </a>
                        <p>Step 2: Fill the client class details.</p>
                        <a
                          className="reference internal image-reference"
                          href="_images/cc_add_002.png"
                        >
                          <img
                            alt="_images/cc_add_002.png"
                            src="_images/cc_add_002.png"
                            style={{ width: "500px" }}
                          />
                        </a>
                        <p>
                          Step 3: After filling the subnet details, click on the{" "}
                          <em>update</em> button to see the subnet object we are
                          going to add. This Button will appear when we start
                          filling/editing the details.
                        </p>
                        <a
                          className="reference internal image-reference"
                          href="_images/update.png"
                        >
                          <img
                            alt="_images/update.png"
                            src="_images/update.png"
                            style={{ width: "200px" }}
                          />
                        </a>
                        <p>Step 5: Verify the details and click submit.</p>
                        <a
                          className="reference internal image-reference"
                          href="_images/cc_add_003.png"
                        >
                          <img
                            alt="_images/cc_add_003.png"
                            src="_images/cc_add_003.png"
                            style={{ width: "500px" }}
                          />
                        </a>
                      </div>
                      <div className="section" id="delete-client-classes">
                        <h4>
                          <a className="toc-backref" href="#id129">
                            Delete client classes
                          </a>
                          <a
                            className="headerlink"
                            href="#delete-client-classes"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <p>Step 1: Choose the client class to delete.</p>
                        <a
                          className="reference internal image-reference"
                          href="_images/cc_del_001.png"
                        >
                          <img
                            alt="_images/cc_del_001.png"
                            src="_images/cc_del_001.png"
                            style={{ width: "400px" }}
                          />
                        </a>
                        <p>
                          Step 2: Click the trash button on the top right of
                          table.
                        </p>
                        <p>Step 3: Confirm delete on the pop up.</p>
                        <a
                          className="reference internal image-reference"
                          href="_images/cc_del_002.png"
                        >
                          <img
                            alt="_images/cc_del_002.png"
                            src="_images/cc_del_002.png"
                            style={{ width: "500px" }}
                          />
                        </a>
                      </div>
                    </div>
                    <div className="section" id="dhcp-dump">
                      <h3>
                        <a className="toc-backref" href="#id130">
                          DHCP Dump
                        </a>
                        <a
                          className="headerlink"
                          href="#dhcp-dump"
                          title="Permalink to this headline"
                        >
                          ¶
                        </a>
                      </h3>
                      <div className="section" id="trigger-packet-collection">
                        <h4>
                          <a className="toc-backref" href="#id131">
                            Trigger Packet Collection
                          </a>
                          <a
                            className="headerlink"
                            href="#trigger-packet-collection"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <p>
                          Step 1: Click on the trigger button to start packet
                          collection.
                        </p>
                        <a
                          className="reference internal image-reference"
                          href="_images/dd_trigger_001.png"
                        >
                          <img
                            alt="_images/dd_trigger_001.png"
                            src="_images/dd_trigger_001.png"
                            style={{ width: "500px" }}
                          />
                        </a>
                        <p>
                          This will reset the count and start collecting from 0.
                        </p>
                        <a
                          className="reference internal image-reference"
                          href="_images/dd_trigger_002.png"
                        >
                          <img
                            alt="_images/dd_trigger_002.png"
                            src="_images/dd_trigger_002.png"
                            style={{ width: "500px" }}
                          />
                        </a>
                      </div>
                      <div className="section" id="get-packets">
                        <h4>
                          <a className="toc-backref" href="#id132">
                            Get Packets
                          </a>
                          <a
                            className="headerlink"
                            href="#get-packets"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <p>
                          Step 1: User can specify the starting position and
                          count of packets.
                        </p>
                        <a
                          className="reference internal image-reference"
                          href="_images/dd_getrows_001.png"
                        >
                          <img
                            alt="_images/dd_getrows_001.png"
                            src="_images/dd_getrows_001.png"
                            style={{ width: "500px" }}
                          />
                        </a>
                        <p>Step 2: Click get rows to view the packets.</p>
                        <a
                          className="reference internal image-reference"
                          href="_images/dd_getrows_002.png"
                        >
                          <img
                            alt="_images/dd_getrows_002.png"
                            src="_images/dd_getrows_002.png"
                            style={{ width: "500px" }}
                          />
                        </a>
                        <p>Step 3: Click on the rows to expand the logs.</p>
                        <a
                          className="reference internal image-reference"
                          href="_images/dd_getrows_003.png"
                        >
                          <img
                            alt="_images/dd_getrows_003.png"
                            src="_images/dd_getrows_003.png"
                            style={{ width: "500px" }}
                          />
                        </a>
                      </div>
                      <div className="section" id="stop-packet-collection">
                        <h4>
                          <a className="toc-backref" href="#id133">
                            Stop Packet Collection
                          </a>
                          <a
                            className="headerlink"
                            href="#stop-packet-collection"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <p>
                          Step 1: Click on the stop button to stop packet
                          collection.
                        </p>
                        <a
                          className="reference internal image-reference"
                          href="_images/dd_trigger_001.png"
                        >
                          <img
                            alt="_images/dd_trigger_001.png"
                            src="_images/dd_trigger_001.png"
                            style={{ width: "500px" }}
                          />
                        </a>
                      </div>
                    </div>
                    <div className="section" id="raw-api">
                      <h3>
                        <a className="toc-backref" href="#id134">
                          RAW API
                        </a>
                        <a
                          className="headerlink"
                          href="#raw-api"
                          title="Permalink to this headline"
                        >
                          ¶
                        </a>
                      </h3>
                      <p>
                        RAW API facilitates firing of all the FAST DHCP api
                        endpoints as raw. Following are the APIs available,
                      </p>
                      <blockquote>
                        <div>
                          <ol className="arabic simple">
                            <li>
                              <p>Get Kea config”,</p>
                            </li>
                            <li>
                              <p>Get IP from MAC Address</p>
                            </li>
                            <li>
                              <p>Add Subnet</p>
                            </li>
                            <li>
                              <p>Modify Subnet</p>
                            </li>
                            <li>
                              <p>Delete Subnet</p>
                            </li>
                            <li>
                              <p>Add Subnet Option</p>
                            </li>
                            <li>
                              <p>Delete Subnet Option</p>
                            </li>
                            <li>
                              <p>Add Reservation</p>
                            </li>
                            <li>
                              <p>Delete Reservation</p>
                            </li>
                            <li>
                              <p>Add Option Reservation</p>
                            </li>
                            <li>
                              <p>Delete Option Reservation</p>
                            </li>
                            <li>
                              <p>Get Leases</p>
                            </li>
                            <li>
                              <p>Add Lease</p>
                            </li>
                            <li>
                              <p>Delete Lease</p>
                            </li>
                            <li>
                              <p>Modify Lease</p>
                            </li>
                            <li>
                              <p>Wipe Leases</p>
                            </li>
                            <li>
                              <p>Add Client Class</p>
                            </li>
                            <li>
                              <p>Modify Client Class</p>
                            </li>
                            <li>
                              <p>Delete Client Class</p>
                            </li>
                          </ol>
                        </div>
                      </blockquote>
                      <div className="section" id="get-calls">
                        <h4>
                          <a className="toc-backref" href="#id135">
                            GET Calls
                          </a>
                          <a
                            className="headerlink"
                            href="#get-calls"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <p>Step 1: Choose the API from drop down list.</p>
                        <a
                          className="reference internal image-reference"
                          href="_images/raw_get_001.png"
                        >
                          <img
                            alt="_images/raw_get_001.png"
                            src="_images/raw_get_001.png"
                            style={{ width: "500px" }}
                          />
                        </a>
                        <p>Step 2: Click the GET Button and wait..</p>
                        <a
                          className="reference internal image-reference"
                          href="_images/raw_get_002.png"
                        >
                          <img
                            alt="_images/raw_get_002.png"
                            src="_images/raw_get_002.png"
                            style={{ width: "500px" }}
                          />
                        </a>
                        <p>
                          Step 3: Uncheck the collapsed tag to expand the
                          result.
                        </p>
                        <a
                          className="reference internal image-reference"
                          href="_images/raw_get_003.png"
                        >
                          <img
                            alt="_images/raw_get_003.png"
                            src="_images/raw_get_003.png"
                            style={{ width: "500px" }}
                          />
                        </a>
                        <p>
                          Step 3: Check the ‘data type’/ ‘object size’/ ‘clip
                          board’ to see the metadata of response.
                        </p>
                        <a
                          className="reference internal image-reference"
                          href="_images/raw_get_004.png"
                        >
                          <img
                            alt="_images/raw_get_004.png"
                            src="_images/raw_get_004.png"
                            style={{ width: "500px" }}
                          />
                        </a>
                      </div>
                      <div className="section" id="post-calls">
                        <h4>
                          <a className="toc-backref" href="#id136">
                            POST Calls
                          </a>
                          <a
                            className="headerlink"
                            href="#post-calls"
                            title="Permalink to this headline"
                          >
                            ¶
                          </a>
                        </h4>
                        <p>Step 1: Choose the API from drop down list.</p>
                        <a
                          className="reference internal image-reference"
                          href="_images/raw_get_001.png"
                        >
                          <img
                            alt="_images/raw_get_001.png"
                            src="_images/raw_get_001.png"
                            style={{ width: "500px" }}
                          />
                        </a>
                        <p>
                          Step 2: Enter the input , click the POST Button and
                          wait..
                        </p>
                        <a
                          className="reference internal image-reference"
                          href="_images/raw_post_001.png"
                        >
                          <img
                            alt="_images/raw_post_001.png"
                            src="_images/raw_post_001.png"
                            style={{ width: "500px" }}
                          />
                        </a>
                        <p>
                          Step 3: Uncheck the collapsed tag to expand the
                          result.
                        </p>
                        <a
                          className="reference internal image-reference"
                          href="_images/raw_post_002.png"
                        >
                          <img
                            alt="_images/raw_post_002.png"
                            src="_images/raw_post_002.png"
                            style={{ width: "500px" }}
                          />
                        </a>
                        <p>
                          Step 3: Check the ‘data type’/ ‘object size’/ ‘clip
                          board’ to see the metadata of response.
                        </p>
                        <a
                          className="reference internal image-reference"
                          href="_images/raw_post_003.png"
                        >
                          <img
                            alt="_images/raw_post_003.png"
                            src="_images/raw_post_003.png"
                            style={{ width: "500px" }}
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="section" id="indices-and-tables">
                  <h1>
                    <a className="toc-backref" href="#id137">
                      Indices and tables
                    </a>
                    <a
                      className="headerlink"
                      href="#indices-and-tables"
                      title="Permalink to this headline"
                    >
                      ¶
                    </a>
                  </h1>
                  <ul className="simple">
                    <li>
                      <p>
                        <a className="reference internal" href="genindex.html">
                          <span className="std std-ref">Index</span>
                        </a>
                      </p>
                    </li>
                    <li>
                      <p>
                        <a
                          className="reference internal"
                          href="py-modindex.html"
                        >
                          <span className="std std-ref">Module Index</span>
                        </a>
                      </p>
                    </li>
                    <li>
                      <p>
                        <a className="reference internal" href="search.html">
                          <span className="std std-ref">Search Page</span>
                        </a>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div
            className="sphinxsidebar"
            role="navigation"
            aria-label="main navigation"
          >
            <div className="sphinxsidebarwrapper">
              <h1 className="logo">
                <a href="#">Master DHCP</a>
              </h1>
              <h3>Navigation</h3>
              <div className="relations">
                <h3>Related Topics</h3>
                <ul>
                  <li>
                    <a href="#">Documentation overview</a>
                    <ul></ul>
                  </li>
                </ul>
              </div>
              <div id="searchbox" style={{ display: "none" }} role="search">
                <h3 id="searchlabel">Quick search</h3>
                <div className="searchformwrapper">
                  <form className="search" action="search.html" method="get">
                    <input type="text" name="q" aria-labelledby="searchlabel" />
                    <input type="submit" defaultValue="Go" />
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="clearer" />
        </div>
        <div className="footer">
          ©2020, Ajeeb Basheer. | Powered by{" "}
          <a href="http://sphinx-doc.org/">Sphinx 3.2.1</a>
          &amp;{" "}
          <a href="https://github.com/bitprophet/alabaster">Alabaster 0.7.12</a>
          |
          <a href="_sources/index.rst.txt" rel="nofollow">
            Page source
          </a>
        </div>
      </div>
    );
  }
}

export default Documentation;
