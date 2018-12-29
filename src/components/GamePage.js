import PropTypes from 'prop-types';
import React from 'react';

const GamePage = props => {
  const { gameInfo, currentStreams, error } = props;
  const pageDescription =
    'Top 24 popular live streams sorted by current viewers';
  const errorMsg = 'Something went wrong, please try again later';

  return (
    <div>
      <h1 className="main--title mt-3 display-4 text-center">
        {error ? 'Oops!' : gameInfo}
      </h1>
      <p className="main--subtitle lead text-center">
        {error ? errorMsg : pageDescription}
      </p>
      <div className="container">
        <div className="row">
          {currentStreams &&
            currentStreams.map(item => {
              const thumbnailURL = item.thumbnail_url.replace(
                '{width}x{height}',
                '720x400'
              );
              return (
                <a
                  key={currentStreams.indexOf(item)}
                  className="streambox col-12 col-sm-6 col-md-4 col-lg-3 p-1"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="img-fluid"
                    src={thumbnailURL}
                    alt="Stream thumbnail"
                  />
                  <div className="row m-0">
                    <div className="col-3 p-2">
                      <img
                        className="rounded-circle img-fluid"
                        src={item.userInfo.profile_image_url}
                        alt="User profile"
                      />
                    </div>
                    <div className="col-9 p-1 flex-column">
                      <div className="h-50 d-flex">
                        <div className="align-self-center text-truncate">
                          {item.title}
                        </div>
                      </div>
                      <div className="h-50 d-flex">
                        <div className="align-self-center text-truncate">
                          <small>{item.userInfo.display_name}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
        </div>
      </div>
    </div>
  );
};

GamePage.propTypes = {
  gameInfo: PropTypes.string,
  currentStreams: PropTypes.array,
  error: PropTypes.bool,
};

export default GamePage;
