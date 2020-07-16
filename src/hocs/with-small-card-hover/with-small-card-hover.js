import React from "react";
import PropTypes from "prop-types";
import {VideoPreview} from "../../components/utils/constants.js";

const withSmallCardHover = (Component) => {
  class WithSmallCardHover extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false,
      };

      this.handleHover = this.handleHover.bind(this);
      this.handleOut = this.handleOut.bind(this);
    }

    componentWillUnmount() {
      clearTimeout(this.videoTimer);
    }

    handleHover() {
      this.videoTimer = setTimeout(() => this.setState({isPlaying: true}), VideoPreview.INTERVAL);
    }

    handleOut() {
      clearTimeout(this.videoTimer);

      this.setState({
        isPlaying: false,
      });
    }

    render() {
      return (
        <Component
          {...this.props}
          isPlaying={this.state.isPlaying}
          onMouseEnter={this.handleHover}
          onMouseLeave={this.handleOut}
        />
      );
    }
  }

  WithSmallCardHover.propTypes = {
    movie: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      cardImg: PropTypes.string.isRequired,
      preview: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
    onHover: PropTypes.func.isRequired
  };
  return WithSmallCardHover;
};

export default withSmallCardHover;

