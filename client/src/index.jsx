import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      descView: false,
      cowUpdate: "",
      updateDesc: "",
      cowDelete: "",
      showCow: "",
      showDesc: "",
      newCow: "",
      newDesc: "",
      cows: [
        {
          Buttercup:
            "	a herbaceous plant with bright yellow cup-shaped flowers, common in grassland and as a garden weed. All kinds are poisonous and generally avoided by livestock.",
        },
        {
          Daisy:
            "	a small grassland plant that has flowers with a yellow disk and white rays. It has given rise to many ornamental garden varieties.",
        },
        {
          Milkshake:
            "a cold drink made of milk, a sweet flavoring such as fruit or chocolate, and typically ice cream, whisked until it is frothy.",
        },
        { Bessie: "a person's best or closest friend." },
        { MooDonna: "	archaic : lady -- used as a form of respectful address." },
        {
          MooLawn:
            "a legendary Chinese warrior from the Northern and Southern dynasties period (420–589) of Chinese history.",
        },
      ],
    };
  }
  handleNewCow(e) {
    this.setState({ newCow: e.target.value });
  }
  handleNewDesc(e) {
    this.setState({ newDesc: e.target.value });
  }
  handleUpdate(e) {
    this.setState({ cowUpdate: e.target.value });
  }
  handleUpdateDesc(e) {
    this.setState({ updateDesc: e.target.value });
  }
  handleDelete(e) {
    this.setState({ cowDelete: e.target.value });
  }
  handleClick(e) {
    let name = e.target.innerHTML;
    this.state.cows.forEach((el) => {
      if (el[name]) {
        this.setState({
          descView: !false,
          showCow: name,
          showDesc: el[name],
        });
      }
    });
  }
  hideDesc() {
    this.setState({
      descView: false,
      showCow: "",
      showDesc: "",
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    let id = this.state.cows.length + 1;
    let obj = {};
    obj[this.state.newCow] = this.state.newDesc;
    let objToSend = {};
    objToSend[id] = obj;
    $.ajax({
      url: "/api/cows",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(objToSend),
      success: () =>
        this.setState({
          newCow: "",
          newDesc: "",
          cows: this.state.cows.concat(obj),
        }),
      error: () => console.log("error"),
    });
  }
  updateClick(e) {
    e.preventDefault();
    let obj = {};
    obj[this.state.cowUpdate] = this.state.updateDesc;
    let cowSearch = this.state.cowUpdate.toLowerCase();
    this.state.cows.forEach((el) => {
      let name = Object.keys(el)[0];
      if (name.toLowerCase() === cowSearch) {
        let index = this.state.cows.indexOf(el) + 1;
        $.ajax({
          url: `/api/cows/${index}`,
          method: "PUT",
          contentType: "application/json",
          data: JSON.stringify(obj),
          success: () => {
            this.setState({
              cows: this.state.cows.filter(
                (elem) => Object.keys(elem)[0] !== cowSearch
              ),
            });
            this.setState({
              cows: this.state.cows.concat(obj),
              cowUpdate: "",
              updateDesc: "",
            });
          },
          error: () => console.log("error"),
        });
      }
    });
  }
  deleteClick(e) {
    e.preventDefault();
    let nameLower = this.state.cowDelete.toLowerCase();
    this.state.cows.forEach((el) => {
      let name = Object.keys(el)[0].toLowerCase();
      if (name === nameLower) {
        let index = this.state.cows.indexOf(el) + 1;
        $.ajax({
          url: `/api/cows/${index}`,
          method: "DELETE",
          contentType: "application/json",
          data: JSON.stringify(el),
          success: () =>
            this.setState({
              cows: this.state.cows.filter(
                (elem) => Object.keys(elem)[0].toLowerCase() !== nameLower
              ),
            }),
          error: () => console.log("error"),
        });
      }
    });
  }

  render() {
    return (
      <div>
        <h1>Cow-List</h1>
        {!this.state.descView ? (
          <h4>Click on one of the cows to see their description</h4>
        ) : (
          <div onClick={this.hideDesc.bind(this)}>
            <h3>{this.state.showCow}</h3>
            <p>{this.state.showDesc}</p>
          </div>
        )}
        <div>
          <ol>
            {this.state.cows.map((el) => {
              return (
                <li
                  key={this.state.cows.indexOf(el)}
                  onClick={this.handleClick.bind(this)}
                >
                  <p>{Object.keys(el)[0]}</p>
                </li>
              );
            })}
          </ol>
        </div>
        <div style={{ marginTop: "30px" }}>
          <h4>New Cow</h4>
          <input
            placeholder="Enter Cow name..."
            onChange={this.handleNewCow.bind(this)}
            value={this.state.newCow}
          />
          <br />
          <input
            placeholder="Enter Cow description..."
            style={{ marginTop: "5px" }}
            onChange={this.handleNewDesc.bind(this)}
            value={this.state.newDesc}
          />
          <br />
          <button
            style={{ marginTop: "5px" }}
            onClick={this.handleSubmit.bind(this)}
          >
            Submit
          </button>
        </div>

        <div>
          <div>
            <label htmlFor="update">
              {" "}
              <h4>Update Cow</h4>
            </label>
            <input
              className="update"
              name="update"
              onChange={this.handleUpdate.bind(this)}
              placeholder="Enter Cow name..."
              value={this.state.cowUpdate}
            />
            <br />
            <input
              placeholder="Enter Cow description..."
              style={{ marginTop: "5px" }}
              onChange={this.handleUpdateDesc.bind(this)}
              value={this.state.updateDesc}
            />
            <br />
            <button
              style={{ marginTop: "5px" }}
              onClick={this.updateClick.bind(this)}
            >
              Update
            </button>
          </div>
          <div>
            <label htmlFor="update">
              {" "}
              <h4>Delete Cow </h4>
            </label>
            <input
              className="update"
              name="update"
              onChange={this.handleDelete.bind(this)}
              placeholder="Enter Cow name..."
            />
            <br />
            <button
              style={{ marginTop: "5px" }}
              onClick={this.deleteClick.bind(this)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);
