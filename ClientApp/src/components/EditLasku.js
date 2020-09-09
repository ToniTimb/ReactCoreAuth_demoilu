import React, { Component } from 'react';
import axios from 'axios';

export class Lasku {
    constructor() {
        this.laskuId = 0;
        this.laskuNro = "";
        this.tunniste = "";
        this.tiedosto = "";
    }
}
export class EditLasku extends Component {
    constructor(props) {
        super(props);

        this.state = { title: "", lasku: new Lasku(), loading: true };
        this.initialize();
        console.log(this.state);


        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    async initialize() {

        var laskuId = this.props.match.params["laskuId"];
        console.log(laskuId);

        const response = await fetch('api/LaskutApi/' + laskuId);
        const data = await response.json();

        this.setState({
            title: "Muokkaa",
            laskuId: data.laskuId,
            laskuNro: data.laskuNro,
            tunniste: data.tunniste,
            tiedosto: data.tiedosto,
            loading: false

        });
        console.log(this.state.tunniste);
    }
    render() {
        let contents = this.state.loading
            ? <p><em>loading...</em></p>
            : this.renderCreateForm();
        console.log(this.state.laskuId);
        return (
            <div>
                <h1>{this.state.title}</h1>
                <h3>LaskuId {this.state.laskuId}</h3>
                <hr />
                {contents}
            </div>
        );
    }
    handleSave(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        for (var key of data.values()) {
            console.log(key);
            
        }

        var response1 = fetch('api/LaskutApi/' + this.state.laskuId, { method: 'PUT', body: data });
        console.log(this.state.laskuNro);
        this.props.history.push('/fetch-laskut');
        


    }
    handleCancel(event) {
        event.preventDefault();
        this.props.history.push('/fetch-laskut');
    }

    renderCreateForm() {
        return (
            <form onSubmit={this.handleSave}>
                <div className="form-group row">
                    <input type="hidden" name="laskuId" value={this.state.laskuId} />
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="laskuNro">laskuNro</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="laskuNro" defaultValue={this.state.laskuNro} required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="tunniste">tunniste</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="tunniste" defaultValue={this.state.tunniste} />
                    </div>
                </div>

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="tiedosto">tiedosto</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="tiedosto" defaultValue={this.state.tiedosto} />
                    </div>
                </div>

                
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Save</button>
                    <button className="btn btn-danger" onClick={this.handleCancel}>Cancel</button>
                </div>
            </form>
        );
    }
}


