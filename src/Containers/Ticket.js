import React, { Component } from "react";
import { connect } from "react-redux";
import storage from "../Firebase/index";
import Axios from "axios";
import email from "../SMTP/smtp";
import * as actions from "../Action";
import * as emailjs from "emailjs-com";
class Ticket extends Component {
  state = {
    Company: "-- select an option --",
    Software: "-- select an option --",
    Status: "pending",
    Fileurl: "",
    Date: null,
    AssignedTo: "",
    Title: "",
    Description: "",
    saved: false,
    saving: false,
    titleerr: false,
    descriptionerr: false,
  };

  flag = false;
  body = (<h1>{this.state.Software}</h1>);
  componentDidUpdate = async () => {};
  alertclose = () => {
    window.location.reload();
  };
  submitHandler = async (event) => {
    event.preventDefault();
    this.setState({ saving: true });
    if (
      this.state.titleerr === true ||
      this.state.Title === "" ||
      this.state.descriptionerr === true ||
      this.state.Description === "" ||
      this.state.Company === "-- select an option --" ||
      this.state.Software === "-- select an option --"
    ) {
      this.setState({ saving: false });
      alert(
        "Select Company/Software" +
          " and " +
          "Description should be at least 10 words"
      );
    } else {
      //console.log(this.props.ticklist.length+1)
      // this.setState({TicketNo:count+1})
      let ticketdata = this.state;
      ticketdata["TicketNo"] = this.props.ticklist.length + 1;

      // console.log(this.props.cmp);
      let result = await Axios.post(
        "https://helpdesk-support-ticket-default-rtdb.asia-southeast1.firebasedatabase.app/Tickets.json",
        ticketdata
      );
      if (result.status === 200) {
        this.setState({ saved: true });
        let templateParams = {
          ticketno: ticketdata.TicketNo,
          company: ticketdata.Company,
          software: ticketdata.Software,
          // subject: subject,
          title: ticketdata.Title,
          message_html: ticketdata.Description,
          status: ticketdata.Status,
        };
        await emailjs.send(
          "gmail",
          "template_kf61TVsV",
          templateParams,
          "user_WD4kk3ZSDFoD8ueoVbQd8"
        );
        let List3 = [];
        const result3 = await Axios.get(
          "https://helpdesk-support-ticket-default-rtdb.asia-southeast1.firebasedatabase.app/Tickets.json"
        );
        if (result3.status === 200) {
          console.log(result3.data);
          let keys3 = Object.keys(result3.data);
          keys3.map((obj) => {
            let restemp = result3.data[obj];
            restemp["key"] = obj;
            List3.push(restemp);
          });
          this.props.load3(List3);
        }

        alert("Ticket registered");
      }
    }
  };
  file = null;
  firebaseupload = async (event) => {
    console.log(this.file);
    const result = storage.ref("images/" + this.file.name).put(this.file);

    result.on(
      "state_changed",
      (snapshots) => {},
      () => {},
      () => {
        const url1 = storage
          .ref("images")
          .child(this.file.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            this.setState({ Fileurl: url });
            alert("File has been uploaded.");
          });
      }
    );
    //console.log(result.downloadURL);
  };
  eventHandler = async (event, id) => {
    let value = event.target.value;

    if (id === "Title") {
      if (value.length < 5) {
        console.log("here");
        this.setState({ titleerr: true });
      } else this.setState({ titleerr: false });
      this.setState({ Title: value, Date: new Date() });
    }

    if (id === "Desc") {
      if (value.length < 10) {
        console.log("here");
        this.setState({ descriptionerr: true });
      } else this.setState({ descriptionerr: false });
      this.setState({ Description: value, Date: new Date() });
    }

    if (id === "Company") {
      //   console.log(value);
      this.setState({ Company: value });
    }
    if (id === "Software") {
      //   console.log(value);
      this.setState({ Software: value });
    }
    if (id === "Status") {
      //   console.log(value);
      this.setState({ Status: value });
    }
    if (id === "file") {
      // console.log(value);
      this.file = event.target.files[0];
      // this.setState({file:event.target.files})
    }
  };
  render() {
    let Toast = (
      <div class="alert alert-success alert-dismissible">
        <button type="button" class="close" data-dismiss="alert">
          &times;
        </button>
        <strong>Success!</strong> Saved Successfully!
      </div>
    );
    console.log(this.state);
    return (
      <div className="container">
        <br></br>
        {this.state.saved ? Toast : null}
        <h1 style={{ fontWeight: "bold" }}>Register New Ticket</h1>
        <br></br>
        {/* {Toast} */}
        <form onSubmit={this.submitHandler}>
          <div className="form-group">
            <label>Company:</label>
            <select
              className="form-control"
              onChange={(event) => {
                this.eventHandler(event, "Company");
              }}
            >
              <option disabled selected value>
                {" "}
                -- select an option --{" "}
              </option>
              {this.props.cmp.CompanyList.map((obj) => {
                return <option>{obj.Name}</option>;
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Software:</label>
            <select
              className="form-control"
              onChange={(event) => {
                this.eventHandler(event, "Software");
              }}
            >
              <option disabled selected value>
                {" "}
                -- select an option --{" "}
              </option>
              {this.props.cmp.SoftwareList.map((obj) => {
                return <option>{obj.Name}</option>;
              })}
            </select>
          </div>

          <div className="form-group">
            <label>Status:</label>
            <select
              className="form-control"
              onChange={(event) => {
                this.eventHandler(event, "Status");
              }}
            >
              {this.props.cmp.Status.map((obj) => {
                return <option>{obj}</option>;
              })}
            </select>
          </div>

          <div class="form-group">
            <label for="comment">Title:</label>
            <textarea
              class="form-control"
              rows="1"
              id="comment"
              name="text"
              onChange={(event) => {
                this.eventHandler(event, "Title");
              }}
            ></textarea>
            {this.state.titleerr ? (
              <label style={{ color: "Red" }}>
                Describe in at least 5 words.
              </label>
            ) : (
              <div></div>
            )}
          </div>

          <div class="form-group">
            <label for="comment">Description:</label>
            <textarea
              class="form-control"
              rows="5"
              id="comment"
              name="text"
              onChange={(event) => {
                this.eventHandler(event, "Desc");
              }}
            ></textarea>
            {this.state.descriptionerr ? (
              <label style={{ color: "Red" }}>
                Describe in at least 10 words.
              </label>
            ) : (
              <div></div>
            )}
          </div>

          {this.state.saving ? (
            <button
              type="submit"
              className="btn btn-primary"
              style={{ margin: "5px" }}
              disabled
            >
              Submit
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-primary"
              style={{ margin: "5px" }}
            >
              Submit
            </button>
          )}
          <button
            type="button"
            onClick={this.alertclose}
            className="btn btn-danger"
            style={{ margin: "5px" }}
          >
            New
          </button>
        </form>
      </div>
    );
  }
}
const mapPropsToStore = (state) => {
  return {
    cmp: state,
    ticklist: state.TicketList,
  };
};
const MapPropsToAction = (dispatch) => {
  return {
    load: (li) => {
      dispatch(actions.LoadEmp(li));
    },
    load1: (li) => {
      dispatch(actions.LoadCom(li));
    },
    load2: (li) => {
      dispatch(actions.LoadSof(li));
    },
    load3: (li) => {
      dispatch(actions.LoadTickets(li));
    },
  };
};
export default connect(mapPropsToStore, MapPropsToAction)(Ticket);
