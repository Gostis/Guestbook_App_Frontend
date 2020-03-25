import React from "react";
import "./Home.css";
import axios from "axios";

class Home extends React.Component {
  constructor() {
    super();
    this.state = { user: {} };
  }

  async getUser() {
    try {
      const res = await axios.get("https://localhost:44303/api/users/98765", {
        headers: {
          Accept: "application/json"
        }
      });
      this.setState({ user: res.data });
    } catch (error) {
      console.log(error);
    }
  }

  async createUser(accessToken, idToken) {
    const testUser = {
      id: "1122266",
      oAuthUserId: idToken.sub,
      firstName: "Jacob",
      lastName: "Nyman",
      email: "jacob@jacob.com",
      creationDate: "2012-01-10",
      likes: ["123"]
    };

    try {
      const res = await axios.post(
        "https://localhost:44303/api/users",
        testUser,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
    } catch (error) {}
  }

  componentDidMount() {
    const accessToken = this.props.auth.getAccessToken();
    const idToken = this.props.auth.getUserId();

    this.getUser();
    this.createUser(accessToken, idToken);
  }

  render() {
    return <h1>{this.state.user.firstName}</h1>;
  }
}

export default Home;
