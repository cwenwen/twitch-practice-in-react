import React, { Component } from 'react';

const GamePage = props => {
  const { page } = props;
  return ( 
    <React.Fragment>
    <h1 class="main--title mt-3 display-4 text-center">
      {page.title}
    </h1>
    <p class="main--subtitle lead text-center">
      Top 24 popular live streams sorted by current viewers
    </p>
    <div className='container'>
      <div className="row">
        {page.streams && page.streams.map(item => {
          let thumbnailURL = item.thumbnail_url.replace('{width}x{height}', '720x400');
          return (
            <a className="streambox col-12 col-sm-6 col-md-4 col-lg-3 p-1" href={item.url} target="_blank">
              <img className="img-fluid" src={thumbnailURL} alt="Stream thumbnail" />
              <div className="row m-0">
                <div className="col-3 p-2">
                  <img className="rounded-circle img-fluid" src={item.userInfo.profile_image_url} alt="User profile image" />
                </div>
                <div className="col-9 p-1 flex-column">
                  <div className="h-50 d-flex">
                    <div className="align-self-center text-truncate">
                      {item.title}
                    </div>
                  </div>
                  <div className="h-50 d-flex">
                    <div className="align-self-center text-truncate">
                      <small>
                        {item.userInfo.display_name}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
    </React.Fragment>
   );
}
 
export default GamePage;