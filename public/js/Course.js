var Course = React.createClass({
  render: function(){
    return (
      <div onClick={this.addDropCourse} >
        <p>
          {this.props.course["name"]}
        </p>
        <p>
          {this.props.course["author"]}
        </p>
        <p>
          {this.props.course["days"].join(", ")}
        </p>
        <p>
          {this.props.course["time"].join("-")}
        </p>
      </div>
    );
  },
    addDropCourse: function(){
      this.props.context.setState({registeredCourses: this.props.context.state.registeredCourses.concat([this.props.course["name"]])});
    }
});
