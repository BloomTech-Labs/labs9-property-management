import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import '@uppy/progress-bar/dist/style.css'
import Button from '@material-ui/core/Button';
import Transloadit from '@uppy/transloadit';
import { withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import '../workorders/FileUploader.css'
import styles from './styles';

const Uppy = require('@uppy/core')
const GoogleDrive = require('@uppy/google-drive')
const Dropbox = require('@uppy/dropbox')
const Url = require('@uppy/url')
const React = require('react')
const { DashboardModal } = require('@uppy/react')



class ContractUploader extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      open: false,
    }
    
    const {GetContract} = this.props;

    this.uppy = Uppy({
      id: 'uppy',
      debug: false,
      autoProceed: false,
      restrictions: {
        maxFileSize: 4000000,
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
          template_id: '53a4e2b02a3c11e98a5f3bbfdcb3df53',
          
        },
        "steps": {
            ":original": {
              "robot": "/upload/handle"
            },
            "viruscheck": {
              "use": ":original",
              "robot": "/file/virusscan",
              "error_on_decline": true
            },
            "export": {
              "use": [":original"],
              "robot": "/google/store",
              "credentials": "propertyApp",
              "path": "${unique_prefix}/${file.url_name}",
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
        GetContract({original:assembly.results[":original"][0].url
      });  
          
      });     
      this.handleModalClick = this.handleModalClick.bind(this)
  }

  componentWillUnmount () {
    this.uppy.close()
  }

  handleModalClick () {
    this.setState({
      open: !this.state.open
    })
  }

  render () {

    return (
      <div>
        <div>
           <Button 
           onClick={this.handleModalClick}
           color="primary"
           variant="contained"
           >
           Upload A Contract
           </Button>
            <DashboardModal
              uppy={this.uppy}
              plugins={['addGoogleDrive', 'addDropbox', 'addUrl']}
              closeModalOnClickOutside
              open={this.state.open}
              onRequestClose={() => this.setState({ open: false })}
            />
        </div>

      </div>
    )
  }
}

ContractUploader.propTypes = {
  classes: PropTypes.object.isRequired,
   GetContract: PropTypes.func,
};

ContractUploader.defaultProps = {
  GetContract: () => {},
};
 
export default withStyles(styles)(ContractUploader);