import React, { PureComponent } from "react";
import Test_child from "./test_child";

class Test_parent extends React.Component {
  state = {
    first: "",
  };
  constructor(props) {
    super(props);
    console.log("1: parent_constructor");
  }
  componentDidMount() {
    console.log("3: parent_componentDidMount");
    this.setState({
      first: "first",
    });
  }

  componentDidUpdate() {
    console.log("4: parent_componentDidUpdate");
  }

  render() {
    console.log("2: parent_render");
    <div>
      <div>content</div>
      <Test_child />
    </div>;
  }
}

export default Test_parent;
