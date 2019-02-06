import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import '@uppy/progress-bar/dist/style.css'
import {InsertPhoto} from "@material-ui/icons";
import Transloadit from '@uppy/transloadit';
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography';
import { withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import './FileUploader.css'

const Uppy = require('@uppy/core')
const GoogleDrive = require('@uppy/google-drive')
const Dropbox = require('@uppy/dropbox')
const Url = require('@uppy/url')
const React = require('react')
const { DashboardModal } = require('@uppy/react')

const PhotoUploadIcon = styled(InsertPhoto)`
  color: #999;
  font-size: 300px !important;
  cursor: pointer;
  @media (max-width: 960px) {
    font-size: 64px;
  }
`;

const styles = theme => ({
  container: {
    marginLeft: 60,
    marginBottom: 20,
  },
});

class FileUploader extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      open: false,
    }
    
    const {GetURL} = this.props;

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
        GetURL({original:assembly.results[":original"][0].url
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
    const { classes } = this.props;
    return (
      <div>
        <div>
           <PhotoUploadIcon onClick={this.handleModalClick}
          />
            <Typography className={classes.container} component="h1" variant="h5">
              Upload a Photo
            </Typography>
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

FileUploader.propTypes = {
  classes: PropTypes.object.isRequired,
  GetURL: PropTypes.func,
};

FileUploader.defaultProps = {
  GetURL: () => {},
};
 
export default withStyles(styles)(FileUploader);

