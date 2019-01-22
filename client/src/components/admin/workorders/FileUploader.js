import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import '@uppy/progress-bar/dist/style.css'
import {InsertPhoto} from "@material-ui/icons";
const Uppy = require('@uppy/core')
const GoogleDrive = require('@uppy/google-drive')
const Dropbox = require('@uppy/dropbox')
const Tus = require('@uppy/tus')
const React = require('react')
const { DashboardModal, ProgressBar } = require('@uppy/react')


class FileUploader extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      showInlineDashboard: false,
      open: false
    }

    this.uppy2 = new Uppy({ id: 'uppy2', autoProceed: false, debug: true })
      .use(Tus, { endpoint: 'https://master.tus.io/files/' })
      .use(GoogleDrive, { serverUrl: 'https://companion.uppy.io' })
      .use(Dropbox, { serverUrl: 'https://companion.uppy.io' })

    this.handleModalClick = this.handleModalClick.bind(this)
  }

  componentWillUnmount () {
    this.uppy.close()
    this.uppy2.close()
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
           <InsertPhoto onClick={this.handleModalClick}
          />
          <DashboardModal
            uppy={this.uppy2}
            plugins={['GoogleDrive', 'Dropbox']}
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

