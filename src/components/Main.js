import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
      <div className="container-fluid text-monospace">
      <br></br>
      &nbsp;
      <br></br>
        <div className="row" >
          <div className="col-md-10" >
            <div className="embed-responsive embed-responsive-16by9" style={{ maxHeight: '768px'}}>
              <video
                src={`https://newschain.infura-ipfs.io/ipfs/${this.props.currentHash}`}
                controls
                style={{width:'95%'}}
              />
            </div>
            <h3><i>{this.props.currentTitle}</i></h3>
          </div>
          <div className=" overflow-auto text-center" style={{ maxHeight: '768px', minWidth: '175px', position:'absolute' , right:'5px',top:'50px' }}>
            <h5><b>Share Video </b></h5>
            <form onSubmit={(event) => {
              event.preventDefault();
              const title = this.videoTitle.value;
              this.props.uploadVideo(title);
            }} >
              &nbsp;
              <input type='file' accept='.mp4, .mkv, .ogg, .wmv' onChange={this.props.captureFile} style={{width:'250px'}} />
              <div className="form-group mr-sm-2">
                <input
                  id='videoTitle'
                  className='form-control-sm'
                  placeholder='Title...'
                  required
                  ref={(input) => {this.videoTitle = input}}
                />
              </div>
              <button type="submit" className="btn btn-danger btn-block btn-sm"> Upload! </button>
              &nbsp;
            </form>
            

            {this.props.videos.map((video,key) => {
              return(
                <div className="card mb-4 text-center bg-secondary mx-auto" style={{ width: '175px'}} key={key} >
                  <div className="card-title bg-dark">
                    <small className="text-white"><b>{video.title}</b></small>
                  </div>
                  <div>
                    <p onClick={() => this.props.changeVideo(video.hash, video.title)}>
                      <video
                        src={`https://newschain.infura-ipfs.io/ipfs/${video.hash}`}
                        style={{ width: '150px' }}
                      />
                    </p>
                  </div>
                </div>
              )
            })}



          </div>
        </div>
      </div>
    );
  }
}

export default Main;