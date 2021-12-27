import React, { Component } from 'react';
import DVideo from '../abis/DVideo.json'
import Navbar from './Navbar'
import Main from './Main'
import Web3 from 'web3';
import './App.css';

//Declare IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      buffer:null,
      account:'0x0',
      dvideo:null,
      videos:[],
      loading:true,
      currentHash:null,
      currentTitle:null
    };
  }

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() { //important part
    const web3 = window.web3


    //Load accounts
    const accounts = await web3.eth.getAccounts(); //now our applcation is also talkig to blockchain (like browser talk by metamask)


    //Add first account the the state
    this.setState({account:accounts[0]});


    //Get network ID
    const networkId = await web3.eth.net.getId();
    //Get network data
    const networkData = DVideo.networks[networkId];
    //Check if net data exists, then
    if(networkData){
      const dvideo = new web3.eth.Contract(DVideo.abi,DVideo.networks[networkId].address);//fetching the DVideo smart contract (as 'dvideo' variable) we made from the blockchain as we have uploaded it on blockchain via truffle migrate cmd
      this.setState({dvideo});

      const videosCount = await dvideo.methods.videoCount().call();//in web3 everytime we read the data from blockchain we have to use call() after the method name not just write the method name with ()
      this.setState({videosCount});

      //load videos sort by newest
      for(var i=videosCount;i>=1;i--){
        const video = await dvideo.methods.videos(i).call();
        this.setState({
          videos:[...this.state.videos,video]
        })
      }


      //see latest video with title to view by default
      const latest = await dvideo.methods.videos(videosCount).call();
      this.setState({
        currentHash:latest.hash,
        currentTitle:latest.title
      })

      this.setState({loading:false})
  }
    else {
      window.alert("Newschain contract not deployed to detected network");
    }
      //Assign dvideo contract to a variable
      //Add dvideo to the state

      //Check videoAmounts
      //Add videAmounts to the state

      //Iterate throught videos and add them to the state (by newest)


      //Set latest video and it's title to view as default 
      //Set loading state to false

      //If network data doesn't exisits, log error
  }

  //Get video
  captureFile = event => { // capture the file and convert it into buffer , hence to make it ready to upload for ipfs, i.e., this just prepare the file to upload on ipfs
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);

    reader.onloadend = () =>{
      this.setState({buffer:Buffer(reader.result)});

    }

  }

  //Upload video
  uploadVideo = title => { //upload the title and file to the blockchain!!!!!!!
    console.log("submitting to ipfs...");
    // add to ipfs... using connection to ipfs by library (ipfs-http-client') we impoerted above using npm
    
    // using ipfs.add(file,callback) !! that's it
  
    ipfs.add(this.state.buffer,(error,result) =>{
      //result will have hash of the uploaded video!
      //put on blockchain... --> It is 2 step process , 1st pass the file to ipfs, then we get the hash back and now 2nd then we put this hash inside the smart contarct, i.e., save it to the blockchain (mapping)

      console.log(result);//contains ipfs returned hash
      //https://ipfs.infura.io/ipfs/QmPtqiSvUBLrcu693tApCfTRsbhGApT6jKEfCnFXugJNt5

      if(error){
        console.log(error);
        return;
      }

      this.setState({loading:true});

      this.state.dvideo.methods.uploadVideo(result[0].hash, title).send({from : this.state.account}).on('transactionHash', (hash) => {
        this.setState({loading:false});
      }); //similarly like .call() we have to use .send() to put the o blockchain

      
    })
  }

  //Change Video
  changeVideo = (hash, title) => { 
    this.setState({
      'currentHash':hash,
      'currentTitle':title
    })
  }



  render() {
    return (
      <div>
        <Navbar 
          //Account
          account={this.state.account}
        />
        { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
              captureFile={this.captureFile}
              uploadVideo={this.uploadVideo}
              changeVideo={this.changeVideo}
              currentHash={this.state.currentHash}
              currentTitle={this.state.currentTitle}
              videos={this.state.videos}
            />
        }
      </div>
    );
  }
}

export default App;