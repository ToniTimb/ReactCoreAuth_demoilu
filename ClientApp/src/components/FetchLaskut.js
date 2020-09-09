import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import authService from './api-authorization/AuthorizeService'
import axios from 'axios';

export class FetchLaskut extends Component {
    static displayName = "Laskut";

    constructor(props) {
        super(props);
        this.state = { laskut: [], loading: true };
    }

    componentDidMount() {
        this.populateLaskutData();
    }
    async populateLaskutData() {
        //tunnistus lisätty
        const token = await authService.getAccessToken();
        const response = await fetch('/api/LaskutApi', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        //const response = await fetch('/api/LaskutApi');
        const data = await response.json();
        this.setState({ laskut: data, loading: false });
    }
    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderLaskutTable(this.state.laskut);
        return (
            <div>
                <h1 id="tabelLable" >Tiedostot</h1>
                <p>
                    <Link to="add-lasku">Lisää uusi tiedosto</Link>
                </p>
                {contents}
            </div>
        );
    }
    renderLaskutTable(laskut) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLable">
                <thead>
                    <tr>
                        <td>
                            <input className="form-control" type="text" placeholder="Hae fileId:llä" id="hae" />
                            <button className="btn btn-danger" onClick={(id) => this.handleSearch(document.getElementById("hae").value)}>Hae</button>
                        </td>
                    </tr>
                    <tr>
                        <th>TiedostoId #</th>
                        <th>Tunniste</th>
                        <th>Tiedoston nimi</th>

                    </tr>
                </thead>
                <tbody>
                    {laskut.map(lasku =>
                        <tr key={lasku.laskuId}>

                            <td>{lasku.laskuId}</td>
                            <td>{lasku.laskuNro}</td>
                            <td>{lasku.tunniste}</td>
                            <td>
                                <button className="btn btn-primary" onClick={(filename) => this.downloadFile(lasku.tunniste)}>Lataa tiedosto</button>&nbsp;
                                <button className="btn btn-danger" onClick={(id) => this.handleDelete(lasku.laskuId)}>Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
    handleSearch(id) {
        this.props.history.push('/laskut/haku/' + id);
        console.log(id);
    }
    handleEdit(id) {
        this.props.history.push('/laskut/edit/' + id);
    }
    handleDelete(id) {
        if (!window.confirm("Haluatko poistaa Laskun jonka LaskuId on : " + id)) {
            return;
        }
        else {
           
           
            fetch('/api/LaskutApi/' + id, { method: 'delete' })
                .then(data => {
                    this.setState({
                        laskut: this.state.laskut.filter((rec) => {
                            return (rec.laskuId !== id);

                        })
                    });
                });
           
        }
    }

    
    downloadFile = (filename) => {
        // window.document.location.href = 'https://localhost:44343/' + filename;

        axios({
           
            url: '/' + filename,
           
            method: 'GET',
            responseType: 'blob', // important
        }).then((response) => {

            const blob = new Blob([response.data], { type: response.data.type });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('Download', filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        });
    }
}
