import React from "react";

const withActiveItem = (Component, activeTab) => {
  class WithActiveItem extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: activeTab,
      };

      this.handleActive = this.handleActive.bind(this);
    }

    render() {
      return (
        <Component
          {...this.props}
          handleActive={this.handleActive}
          activeItem={this.state.activeItem}
        />
      );
    }

    handleActive(item) {
      this.setState({
        activeItem: item,
      });
    }
  }

  return WithActiveItem;
};


export default withActiveItem;
