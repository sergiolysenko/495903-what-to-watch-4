import React from "react";
import {VideoPreview} from "../../components/utils/constants.js";

const withPlayingCard = (Component) => {
  class WithPlayingCard extends React.PureComponent {
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

  return WithPlayingCard;
};

export default withPlayingCard;

