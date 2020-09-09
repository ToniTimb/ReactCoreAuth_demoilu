import React, { Component } from 'react';
import axios from 'axios';



export class File {
    constructor() {
        this.fileId = 0;
        this.fileNo = "";
        this.fileName = "";
        this.fileImage = null;
    }
}
export class EditFile extends Component {
    constructor(props) {
        super(props);

        this.state = { title: "", file: new File(), loading: true };
        this.initialize();
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    async initialize() {

        const fileId = this.props.match.params["fileId"];
        console.log(fileId);


        if (fileId > 0) {
            const response = await fetch('api/filesapi/' + fileId);

            const data = await response.json();
            console.log(data);

            this.setState({
                title: "Muokkaa",
                fileId: data.fileId,
                fileNo: data.fileNo,
                fileName: data.fileName,
                fileImage: data.fileImage,
                loading: false
            });

            console.log(fileId);
        }
        else {
            this.state = {
                title: "Lisää tiedosto",
                fileId: 0,
                fileNo: "",
                fileName: "",
                fileImage: null,
                loading: false,
            };
        }
    }
    render() {

        console.log(this.state.fileId);

        let contents = this.state.loading
            ? <p><em>loading...</em></p>
            : this.renderCreateForm();
        console.log(this.state.fileId);
        return (
            <div>
                <h1>{this.state.title}</h1>
                <h3>FileId {this.state.fileId}</h3>
                <hr />
                {contents}
            </div>
        );
    }
    handleSave(event) {
        const data = new FormData(event.target);
        //var blob = new Blob([this.state.fileImage.data], { type: "application / pdf" });
        //data.append("fileImage", blob, this.state.fileName);
        event.preventDefault();

        data.set("fileName", this.state.fileName);
       data.set("fileImage", this.state.fileImage);
        
       
        for (var value of data.values()) {
            console.log(value);
        }
        if (this.state.fileId) {

            var response1 = fetch('api/FilesApi/' + this.state.fileId, { method: 'PUT', body: data });
            this.props.history.push('/fetch-files');
        }
        else {

            //var response2 = fetch('api/FilesApi', { method: 'POST', body: JSON.stringify(data) });
            const options = {
                method: 'POST',
                body: data,
                headers: { 'Content-Type': 'multipart/form-data' }
            }
           if (options && options.headers) {
                delete options.headers['Content-Type'];
            }
            var response2 = fetch('api/FilesApi',options);


       /* axios.post('api/FilesApi', data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        */
            this.props.history.push('/fetch-files');


        }
    }

    handleCancel(event) {
        event.preventDefault();
        this.props.history.push('/fetch-files');
    }

    renderCreateForm() {
        return (
            <form onSubmit={this.handleSave} encType="multipart/form-data">
                <div className="form-group row">
                    <input type="hidden" name="fileId" value={this.state.fileId} />
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="fileNo">fileNo</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="fileNo" defaultValue={this.state.fileNo} required />
                    </div>
                </div>

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="fileImage">fileImage</label>
                    <div className="col-md-4">
                        <input className="form-control" type="file" onChange={(e) => this.fileSelectedHandler(e)} required/>
                    </div>
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-success">Save</button>
                    <button className="btn btn-danger" onClick={this.handleCancel}>Cancel</button>
                </div>
            </form>
        );
    }
    fileSelectedHandler = e => {

        //console.log(e.target.files, "$$$");
        //console.log(e.target.files[0], "$$$$");

        let file = e.target.files[0];
        let fileN = e.target.files[0].name;
        console.log(e.target.files[0]);


        this.setState({
            fileName: fileN,
            fileImage: file,
            loading: false

        });
        
    }


   
}






