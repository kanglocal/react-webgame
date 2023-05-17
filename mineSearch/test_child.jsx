import React, { PureComponent } from "react";

class Test_child extends React.Component {
  state = {
    first: "",
  };
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    console.log("1: child_constructor");
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("error:", error, errorInfo);
  }
  componentDidMount() {
    console.log("3: child_componentDidMount");
    this.setState({
      first: "first",
    });
  }

  componentDidUpdate() {
    console.log("4: child_componentDidUpdate");
  }

  render() {
    console.log("2: child_render");
    if (this.state.hasError) {
      // UI렌더링
      return (
        <div>
          <p>{error.toString()}</p>
          <p>{this.state.second}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default Test_child;
