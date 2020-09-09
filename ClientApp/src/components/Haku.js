import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import authService from './api-authorization/AuthorizeService'


export class Lasku {
    constructor() {
        this.laskuId = 0;
        this.laskuNro = "";
        this.tunniste = "";
        this.tiedosto = "";
    }
}
export class Haku extends Component {
    static displayName = "Files";

    constructor(props) {
        super(props);
        this.state = { lasku: new Lasku(), loading: true };
        this.initialize();
        this.handleSearch = this.handleSearch.bind(this);
       
    }

    async initialize() {

        var laskuId = this.props.match.params["laskuId"];
        console.log(laskuId);

        const response = await fetch('api/LaskutApi/' + laskuId);


        const data = await response.json();

        this.setState({

            laskuId: data.laskuId,
            laskuNro: data.laskuNro,
            tunniste: data.tunniste,
            tiedosto: data.tiedosto,
            loading: false

        });

    }
    render() {

        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderFilesTable();

        return (
            <div>
                {contents}
            </div>
        );
    }


    renderFilesTable() {
        return (
            <table className='table' aria-labelledby="tabelLable">
                <thead>
                    <tr>
                        <th><input className="form-control" type="text" placeholder="Hae LaskuId:llä" id="hae" /></th>
                        <th><button className="btn btn-danger" onClick={(id) => this.handleSearch(document.getElementById("hae").value)}>Hae</button></th>
                    </tr>
                    <tr>
                        <th>LaskuId #</th>
                        <th>LaskuNro</th>
                        <th>Tunniste</th>
                        <th>Tiedosto</th>
                    </tr>

                </thead>
                <tbody>

                    <tr key={this.state.laskuId}>
                        <td>{this.state.laskuId}</td>
                        <td>{this.state.laskuNro}</td>
                        <td>{this.state.tunniste}</td>
                        <td>{this.state.tiedosto}</td>
                    </tr>
                </tbody>
            </table>
        );
    }

    handleSearch(id) {
        this.props.history.push('/laskut/haku/' + id);
        console.log(id);
        window.location.reload();

    }
    //handleSearch = (id) => {

    // fetch('/api/FilesApi/' + id, { method: 'get' })
    // .then(data => {
    //  this.setState({
    //     files: this.state.files.filter((rec) => {
    //         return (rec.fileId == id);
    //     })
    //   });
    // });
    //  console.log(id);








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
