pragma solidity ^0.5.16;

contract DVideo {

  uint public videoCount = 0;
  string public name = "DVideo";


  //Create id=>struct mapping
  //2. store the video , also help in 4. list the videos
  mapping(uint => Video) public videos;


  //Create Struct
  //1. model the video
  struct Video{
    uint id;
    string hash;
    string title;
    address author;//here necessaery to put ; at last as well but no need toput , at last of event
  }

  //Create Event
  event VideoUploaded(
    uint id,
    string hash,
    string title,
    address author 
  ); // here must use semicolon

  // constructor() public {
  // }

// 3. upload the video
  function uploadVideo(string memory _videoHash, string memory _title) public {
    // Make sure the video hash exists
    require(bytes(_videoHash).length>0);

    // Make sure video title exists
    require(bytes(_title).length>0);

    // Make sure uploader address exists
    require(msg.sender != address(0));


    // Increment video id
    videoCount++;

    // Add video to the contract
    videos[videoCount] = Video(videoCount,_videoHash,_title,msg.sender);


    // Trigger an event
    emit VideoUploaded(videoCount,_videoHash,_title,msg.sender);
  }
}
