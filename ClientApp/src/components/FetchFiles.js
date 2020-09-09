import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import authService from './api-authorization/AuthorizeService'

export class FetchFiles extends Component {
    static displayName = "Files";

    constructor(props) {
        super(props);
        this.state = { files: [], loading: true };
    }

    componentDidMount() {
        this.populateFilesData();
    }
    async populateFilesData() { 
        //tunnistus kytketty pois päältä
       // const token = await authService.getAccessToken();
       // const response = await fetch('/api/FilesApi',  {
        //    headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        //});
        const response = await fetch('/api/FilesApi');

        const data = await response.json();

        this.setState({ files: data, loading: false });
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderFilesTable(this.state.files);

        return (
            <div>
                <h1 id="tabelLable" >Files</h1>
                <p>Tämä komponentti hakee tiedostot palvelimelta</p>
                <p>
                    <Link to="add-file">Lisää uusi tiedosto</Link>
                </p>
                {contents}
            </div>
        );
    }

    renderFilesTable(files) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLable">
                <thead>
                    <tr>
                        <th>FileId #</th>
                        <th>FileNo</th>
                        <th>FileName</th>
                        <th>FileImage</th>
                    </tr>
                </thead>
                <tbody>
                    {files.map(file =>
                        <tr key={file.fileId}>
                            
                            <td>{file.fileId}</td>
                            <td>{file.fileNo}</td>
                            <td>{file.fileName}</td>

                                <td><img src={file.fileImage} alt="empty" width="50" height="60" /></td>
                            <td>
                                
                                <button className="btn btn-success" onClick={(id) => this.handleEdit(file.fileId)}>Edit</button>&nbsp;
                                <button className="btn btn-danger" onClick={(id) => this.handleDelete(file.fileId)}>Delete</button>
                                
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    handleEdit(id) {
        this.props.history.push('/files/edit/' + id);

    }

    handleDelete(id) {
        if (!window.confirm("Haluatko poistaa tiedoston jonka FileId on : " + id)) {
            return;
        }
        else {
            fetch('/api/FilesApi/' + id, { method: 'delete' })
                .then(data => {
                    this.setState({
                        files: this.state.files.filter((rec) => {
                            return (rec.fileId !== id);
                        })
                    });
                });
        }
    }
}
