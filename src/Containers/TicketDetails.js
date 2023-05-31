import React, { Component } from "react";
import { connect } from "react-redux";
import Axios from "axios";
import * as Actions from "../Action";

class TicketDetails extends Component {
  state = {
    Ticket: {},
    Remarks: "",
  };
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    for (let param of query.entries()) {
      console.log(param[0]); // yields ['start', '5']

      this.props.ticks.map((obj) => {
        if (obj.key === param[0]) {
          this.setState({ Ticket: obj });
          console.log(obj);
        }
      });
    }
  }
  changehandler = (event) => {
    let value = event.target.value;
    this.setState({ Remarks: value });
  };
  componentDidUpdate = () => {
    console.log();
  };

  resolve = async (event) => {
    event.preventDefault();
    let newticket = this.state.Ticket;
    newticket["Status"] = "resolved";
    newticket["Resolved"] = true;
    newticket["UpdatedOn"] = new Date();
    newticket["Remarks"] = this.state.Remarks;
    this.setState({ Ticket: newticket });
    console.log(newticket);
    const result = await Axios.put(
      "https://helpdesk-support-ticket-default-rtdb.asia-southeast1.firebasedatabase.app/Tickets/" +
        newticket.key +
        ".json",
      newticket
    );
    if (result.status === 200) {
      alert("Ticket Resolved.");

      const result2 = await Axios.get(
        "https://helpdesk-support-ticket-default-rtdb.asia-southeast1.firebasedatabase.app/Tickets.json"
      );
      if (result2.status === 200) {
        let List = result2.data;
        this.props.updateTickets(List);
      }
    } else {
      alert("Network Error.");
    }
    this.props.history.push({ pathname: "/ListTicket" });
  };

  reject = async (event) => {
    event.preventDefault();
    let newticket = this.state.Ticket;
    newticket["Status"] = "rejected";
    newticket["Rejected"] = true;
    newticket["UpdatedOn"] = new Date();
    newticket["Remarks"] = this.state.Remarks;
    this.setState({ Ticket: newticket });
    console.log(newticket);
    const result = await Axios.put(
      "https://helpdesk-support-ticket-default-rtdb.asia-southeast1.firebasedatabase.app/Tickets/" +
        newticket.key +
        ".json",
      newticket
    );
    if (result.status === 200) {
      alert("Ticket Rejected.");

      const result2 = await Axios.get(
        "https://helpdesk-support-ticket-default-rtdb.asia-southeast1.firebasedatabase.app/Tickets.json"
      );
      if (result2.status === 200) {
        let List = result2.data;
        this.props.updateTickets(List);
      }
    } else {
      alert("Network Error.");
    }
    this.props.history.push({ pathname: "/ListTicket" });
  };

  accept = async (event) => {
    event.preventDefault();
    let newticket = this.state.Ticket;
    newticket["Status"] = "accepted";
    newticket["Accepted"] = true;
    newticket["UpdatedOn"] = new Date();
    newticket["Remarks"] = this.state.Remarks;
    this.setState({ Ticket: newticket });
    console.log(newticket);
    const result = await Axios.put(
      "https://helpdesk-support-ticket-default-rtdb.asia-southeast1.firebasedatabase.app/Tickets/" +
        newticket.key +
        ".json",
      newticket
    );
    if (result.status === 200) {
      alert("Ticket Accepted.");

      const result2 = await Axios.get(
        "https://helpdesk-support-ticket-default-rtdb.asia-southeast1.firebasedatabase.app/Tickets.json"
      );
      if (result2.status === 200) {
        let List = result2.data;
        this.props.updateTickets(List);
      }
    } else {
      alert("Network Error.");
    }
    this.props.history.push({ pathname: "/ListTicket" });
  };

  pending = async (event) => {
    event.preventDefault();
    let newticket = this.state.Ticket;
    newticket["Status"] = "pending";
    newticket["Pending"] = true;
    newticket["UpdatedOn"] = new Date();
    newticket["Remarks"] = this.state.Remarks;
    this.setState({ Ticket: newticket });
    console.log(newticket);
    const result = await Axios.put(
      "https://helpdesk-support-ticket-default-rtdb.asia-southeast1.firebasedatabase.app/Tickets/" +
        newticket.key +
        ".json",
      newticket
    );
    if (result.status === 200) {
      alert("Ticket Pending.");

      const result2 = await Axios.get(
        "https://helpdesk-support-ticket-default-rtdb.asia-southeast1.firebasedatabase.app/Tickets.json"
      );
      if (result2.status === 200) {
        let List = result2.data;
        this.props.updateTickets(List);
      }
    } else {
      alert("Network Error.");
    }
    this.props.history.push({ pathname: "/ListTicket" });
  };


  render() {
    console.log(this.state.Ticket);

    return (
      <div className="container">
        <br></br>
        <h1 style={{ fontWeight: "bold" }}>Ticket Details</h1>
        <br></br>
        <form>
          <div class="form-group row">
            <label
              class="col-lg-3 col-form-label form-control-label"
              style={{ fontWeight: "bold" }}
            >
              Ticket Number:{" "}
            </label>
            <input
              class="col-lg-9  form-control"
              value={this.state.Ticket.TicketNo}
              disabled
            ></input>
          </div>
          <div class="form-group row">
            <label
              class="col-lg-3 col-form-label form-control-label"
              style={{ fontWeight: "bold" }}
            >
              Software:{" "}
            </label>
            <input
              class="col-lg-9  form-control"
              value={this.state.Ticket.Software}
              disabled
            ></input>
          </div>
          <div class="form-group row">
            <label
              class="col-lg-3 col-form-label form-control-label"
              style={{ fontWeight: "bold" }}
            >
              Company:{" "}
            </label>
            <input
              class="col-lg-9  form-control"
              value={this.state.Ticket.Company}
              disabled
            ></input>
          </div>
          <div class="form-group row">
            <label
              class="col-lg-3 col-form-label form-control-label"
              style={{ fontWeight: "bold" }}
            >
              Status:{" "}
            </label>
            <input
              class="col-lg-9  form-control"
              value={this.state.Ticket.Status}
              disabled
            ></input>
          </div>
          <div class="form-group row">
            <label
              class="col-lg-3 col-form-label form-control-label"
              style={{ fontWeight: "bold" }}
            >
              Date:{" "}
            </label>
            <input
              class="col-lg-9  form-control"
              value={this.state.Ticket.Date}
              disabled
            ></input>
          </div>
          <div class="form-group row">
            <label
              class="col-lg-3 col-form-label form-control-label"
              style={{ fontWeight: "bold" }}
            >
              Description:{" "}
            </label>
            <input
              class="col-lg-9  form-control"
              value={this.state.Ticket.Description}
              disabled
            ></input>
          </div>
          <div class="form-group row">
            <label
              class="col-lg-3 col-form-label form-control-label"
              style={{ fontWeight: "bold" }}
            >
              Resolved:{" "}
            </label>
            {this.state.Ticket.Resolved === true ? (
              <input
                class="col-lg-9  form-control"
                value="True"
                disabled
              ></input>
            ) : (
              <input
                class="col-lg-9  form-control"
                value="False"
                disabled
              ></input>
            )}
          </div>
          <div class="form-group row">
            <label
              class="col-lg-3 col-form-label form-control-label"
              style={{ fontWeight: "bold" }}
            >
              Remarks:{" "}
            </label>
            {this.state.Ticket.Resolved === true ? (
              <input
                class="col-lg-9  form-control"
                value={this.state.Ticket.Remarks}
                disabled
              ></input>
            ) : (
              <input
                class="col-lg-9  form-control"
                onChange={this.changehandler}
              ></input>
            )}
          </div>
          {this.state.Ticket.Resolved === true ||
          this.state.Ticket.Resolved === true ? (
            <button
              //disabled
              type="button"
              class="btn btn-primary col-lg-12"
              data-toggle="modal"
              data-target="#myModal"
            >
              RESOLVE
            </button>
          ) : (
            <button
              type="button"
              class="btn btn-primary col-lg-12"
              data-toggle="modal"
              data-target="#myModal"
            >
              RESOLVE
            </button>
          )}
          <div class="modal" id="myModal">
            <div class="modal-dialog">
              <div class="modal-content">
                {/* <!-- Modal Header --> */}
                <div
                  class="modal-header"
                  style={{ backgroundColor: "#2bbbad" }}
                >
                  <h4 class="modal-title">Attention</h4>
                  <button type="button" class="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>

                {/* <!-- Modal body --> */}
                <div class="modal-body" style={{ backgroundColor: "azure" }}>
                  Are you sure you want to resolve the ticket
                </div>

                {/* <!-- Modal footer --> */}
                <div class="modal-footer" style={{ backgroundColor: "azure" }}>
                  <button
                    type="button"
                    class="btn btn-danger"
                    data-dismiss="modal"
                  >
                    NO
                  </button>
                  <button
                    type="submit"
                    class="btn btn-primary"
                    data-dismiss="modal"
                    onClick={(event) => {
                      this.resolve(event);
                    }}
                  >
                    Resolve
                  </button>
                </div>
              </div>
            </div>
          </div>

          {this.state.Ticket.Rejected === true ||
          this.state.Ticket.Rejected === true ? (
            <button
              //disabled
              type="button"
              class="btn btn-danger col-lg-12"
              data-toggle="modal"
              data-target="#myModal2"
            >
              REJECT
            </button>
          ) : (
            <button
              type="button"
              class="btn btn-danger col-lg-12"
              data-toggle="modal"
              data-target="#myModal2"
            >
              REJECT
            </button>
          )}
          <div class="modal" id="myModal2">
            <div class="modal-dialog">
              <div class="modal-content">
                {/* <!-- Modal Header --> */}
                <div
                  class="modal-header"
                  style={{ backgroundColor: "#2bbbad" }}
                >
                  <h4 class="modal-title">Attention</h4>
                  <button type="button" class="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>

                {/* <!-- Modal body --> */}
                <div class="modal-body" style={{ backgroundColor: "azure" }}>
                  Are you sure you want to reject the ticket
                </div>

                {/* <!-- Modal footer --> */}
                <div class="modal-footer" style={{ backgroundColor: "azure" }}>
                  <button
                    type="button"
                    class="btn btn-danger"
                    data-dismiss="modal"
                  >
                    NO
                  </button>
                  <button
                    type="submit"
                    class="btn btn-primary"
                    data-dismiss="modal"
                    onClick={(event) => {
                      this.reject(event);
                    }}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>

          {this.state.Ticket.Accepted === true ||
          this.state.Ticket.Accepted === true ? (
            <button
              //disabled
              type="button"
              class="btn btn-warning col-lg-12"
              data-toggle="modal"
              data-target="#myModal3"
            >
              ACCEPT
            </button>
          ) : (
            <button
              type="button"
              class="btn btn-warning col-lg-12"
              data-toggle="modal"
              data-target="#myModal3"
            >
              ACCEPT
            </button>
          )}
          <div class="modal" id="myModal3">
            <div class="modal-dialog">
              <div class="modal-content">
                {/* <!-- Modal Header --> */}
                <div
                  class="modal-header"
                  style={{ backgroundColor: "#2bbbad" }}
                >
                  <h4 class="modal-title">Attention</h4>
                  <button type="button" class="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>

                {/* <!-- Modal body --> */}
                <div class="modal-body" style={{ backgroundColor: "azure" }}>
                  Are you sure you want to accept the ticket
                </div>

                {/* <!-- Modal footer --> */}
                <div class="modal-footer" style={{ backgroundColor: "azure" }}>
                  <button
                    type="button"
                    class="btn btn-danger"
                    data-dismiss="modal"
                  >
                    NO
                  </button>
                  <button
                    type="submit"
                    class="btn btn-primary"
                    data-dismiss="modal"
                    onClick={(event) => {
                      this.accept(event);
                    }}
                  >
                    Accepted
                  </button>
                </div>
              </div>0
            </div>
          </div>

          
          {this.state.Ticket.Pending === true ||
          this.state.Ticket.Pending === true ? (
            <button
              //disabled
              type="button"
              class="btn btn-info col-lg-12"
              data-toggle="modal"
              data-target="#myModal4"
            >
              PENDING
            </button>
          ) : (
            <button
              type="button"
              class="btn btn-info col-lg-12"
              data-toggle="modal"
              data-target="#myModal4"
            >
              PENDING
            </button>
          )}
          <div class="modal" id="myModal4">
            <div class="modal-dialog">
              <div class="modal-content">
                {/* <!-- Modal Header --> */}
                <div
                  class="modal-header"
                  style={{ backgroundColor: "#2bbbad" }}
                >
                  <h4 class="modal-title">Attention</h4>
                  <button type="button" class="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>

                {/* <!-- Modal body --> */}
                <div class="modal-body" style={{ backgroundColor: "azure" }}>
                  Are you sure you want to pending the ticket
                </div>

                {/* <!-- Modal footer --> */}
                <div class="modal-footer" style={{ backgroundColor: "azure" }}>
                  <button
                    type="button"
                    class="btn btn-danger"
                    data-dismiss="modal"
                  >
                    NO
                  </button>
                  <button
                    type="submit"
                    class="btn btn-primary"
                    data-dismiss="modal"
                    onClick={(event) => {
                      this.pending(event);
                    }}
                  >
                    Pending
                  </button>
                </div>
              </div>
            </div>
          </div>

        </form>
      </div>
    );
  }
}

const MapStateToProps = (state) => {
  return {
    ticks: state.TicketList,
  };
};

const MapActionToProps = (dispatch) => {
  return {
    updateTickets: (List) => {
      dispatch(Actions.LoadTickets(List));
    },
  };
};

export default connect(MapStateToProps, MapActionToProps)(TicketDetails);
