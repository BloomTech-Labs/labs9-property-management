import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import '@uppy/progress-bar/dist/style.css'
import {InsertPhoto} from "@material-ui/icons";
import Transloadit from '@uppy/transloadit';
const Uppy = require('@uppy/core')
const GoogleDrive = require('@uppy/google-drive')
const Dropbox = require('@uppy/dropbox')
const Url = require('@uppy/url')
const React = require('react')
const { DashboardModal } = require('@uppy/react')
const dotenv = require('dotenv');


dotenv.load();


class FileUploader extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      open: false,
      img_url:null,
    }
    
    this.uppy = Uppy({
      id: 'uppy',
      debug: false,
      autoProceed: false,
      restrictions: {
        maxFileSize: 1000000,
        maxNumberOfFiles: 1,
        minNumberOfFiles: 1
      }
    })
      .use(Transloadit, {
        service: 'https://api2.transloadit.com',
        waitForEncoding: true,
        params: {
          auth: {
            key: 'a45d67901f6a11e9bfbbed9e321ead56'
          },
          template_id: '1645d210203911e9a543a1e9d68eabe6',
          
        },
        steps: {
          ":original": {
            "robot": "/upload/handle"
          },
          "filter": {
            "use": ":original",
            "robot": "/file/filter",
            "accepts": [
              [
                "${file.mime}",
                "regex",
                "image"
              ]
            ],
            "error_on_decline": true
          },
          "viruscheck": {
            "use": "filter",
            "robot": "/file/virusscan",
            "error_on_decline": true
          },
          "export": {
            "use": [
              ":original"
            ],
            "robot": "/google/store",
            "credentials": "propertyApp",
            "path": "${unique_prefix}/${file.url_name}",
            "acl": "public-read",
          }
        }
        
      })
      .use(GoogleDrive, {
        id: 'addGoogleDrive',
        serverUrl: 'https://api2.transloadit.com/companion',
        serverPattern: /.transloadit.com$/
      })
      .use(Dropbox, {
        id: 'addDropbox',
        serverUrl: 'https://api2.transloadit.com/companion',
        serverPattern: /.transloadit.com$/
      })
      .use(Url, {
        id: 'addUrl',
        serverUrl: 'https://api2.transloadit.com/companion',
        serverPattern: /.transloadit.com$/
      })
      .on('transloadit:complete', (assembly) => {
        let url = assembly.results[":original"][0].url
        console.log(url)
          
        this.setState({
          img_url:url
        });
      })


      
      this.handleModalClick = this.handleModalClick.bind(this)
      this.GetURL = this.GetURL.bind(this)
  }

  componentWillUnmount () {
    this.uppy.close()
  }

  handleModalClick () {
    this.setState({
      open: !this.state.open
    })
  }

  GetURL(){
    return this.state.img_url
  }

  render () {

    return (
      <div>
        <div>
           <InsertPhoto onClick={this.handleModalClick}
          />
          <DashboardModal
            uppy={this.uppy}
            plugins={['addGoogleDrive', 'addDropbox', 'addUrl']}
            closeModalOnClickOutside
            open={this.state.open}
            target={document.body}
            onRequestClose={() => this.setState({ open: false })}
          />
        </div>

      </div>
    )
  }
}
 
export default FileUploader;

