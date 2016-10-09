var Course = React.createClass({
  render: function(){
    var actionName = this.state.registered ? "Unregister" : "Register";
    return (
      <div className="card">
        <div className="card-content">
          <div className="card-title">
            {this.props.course["name"]}
          </div>
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
        <div className="card-action">
          <a onClick={this.addDropCourse}>{actionName}</a>
        </div>
      </div>
    );
  },

  getInitialState: function(){
    return({registered: false});
  },

  addDropCourse: function(){
    // TODO update state
    console.log(this.props.addDropCourse(this.props.course));
  }
});
