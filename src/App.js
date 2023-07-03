import './App.css';
import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    selectedFile: null,
    fileUploadedSuccessfully: false
  }

  onFileChange = event => {
    console.log("event: ", event)
    this.setState({ selectedFile: event.target.files[0] });
  }

  onFileUpload = () => {
    if (this.state.selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1] // Extract the Base64 data from the data URL
        console.log("base64String: ", base64String);
        const formData = new FormData();
        formData.append(
          this.state.selectedFile.name,
          base64String
        )
        axios.post("https://103g1j8fy5.execute-api.us-east-1.amazonaws.com/dev/upload", formData)
          .then(() => {
            this.setState({ selectedFile: null, fileUploadedSuccessfully: true });
          })
          .catch(error => {
            console.error('Error uploading file:', error);
          });
      };
      reader.readAsDataURL(this.state.selectedFile);
    }
  }

  fileData = () => {
    if (this.state.selectedFile) {
      return (
      <div>
        <h2>File Details:</h2>
        <p>File Name: {this.state.selectedFile.name}</p>
        <p>File Type: {this.state.selectedFile.type}</p>
        <p>Last Modified: {this.state.selectedFile.lastModifiedDate.toDateString()}</p>
      </div>
      );
      } else if (this.state.fileUploadedSuccessfully) {
        return (
          <div>
            <br />
            <h2>File Uploaded Successfully</h2>
          </div>
        );
      }
      else {
        return (
          <div>
            <br />
            <h4>Choose a file to upload and press upload</h4>
          </div>
        );
      }
  }

  render() {
    return (
      <div className="container">
        <h1>Upload File</h1>
        <div>
          <input type="file" onChange={this.onFileChange} />
          <button onClick={this.onFileUpload}>
            Upload
          </button>
        </div>
        {this.fileData()}
      </div>
    );
  }
}

export default App;
