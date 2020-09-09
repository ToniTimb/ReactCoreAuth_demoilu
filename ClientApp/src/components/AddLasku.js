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
export class AddLasku extends Component {
    constructor(props) {
        super(props);

        this.state = { title: "", lasku: new Lasku(), loading: true };
        this.initialize();
        

        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    async initialize() {
        this.state = { title: "Lisää tiedosto", lasku: new Lasku(), loading: false };
    }

    
    render() {
        let contents = this.state.loading
            ? <p><em>loading...</em></p>
            : this.renderCreateForm();
        
        return (
            <div>
                <h1>{this.state.title}</h1>  
                <hr />
                {contents}
            </div>
        );
    }


    handleSave(event) {
        event.preventDefault();

        //siirretään ensin tiedosto WWWROOT kansioon fileModel ja FileControlleria käyttäen

       // const formData = new FormData();
       //formData.append("formFile", this.state.tiedosto);
       //  formData.append("fileName", this.state.tiedosto.name);
        const formData = new FormData();
        formData.append("formFile", this.state.tiedosto);
        formData.append("fileName", this.state.tiedosto.name);

        try {
            // const res = axios.post("api/file", formData);
           // const res = axios.post("api/home", this.state.tiedosto);
          //  console.log(res);

            axios({
                method: 'post',
                url: 'api/file',
                baseURL: '/',
                data: formData
            });

        } catch (ex) {
            console.log(ex);
        }

        //siirretään loput tiedot sql serverille
        const data = new FormData(event.target);
        
       // console.log(this.state, "---the state$$$$$");

        data.append("tunniste", this.state.tiedosto.name);

        //tarkastetaan vielä mitä data pitää sisällänsä
        for (var value of data.values()) {
            console.log(value);
        }
        //normaalisti fetch käytössä, mutta testataan miten tämä toimii
        axios({
            method: 'post',
            url: 'api/laskutapi',
            baseURL: '/',
            data:data
        })
            .then(response => {
                this.props.history.push('/fetch-laskut');
            })
            .catch(error => {
                console.log(error);
            });
        //var response2 = fetch('api/LaskutApi', { method: 'POST', body: data });
        
        //this.props.history.push('/fetch-laskut');
       

        }
    
    handleCancel(event) {
        event.preventDefault();
        this.props.history.push('/fetch-laskut');
    }

    renderCreateForm() {
        
        return (
            <form onSubmit={this.handleSave} encType="multipart/form-data">
                <div className="form-group row">
                    <input type="hidden" name="laskuId" value={this.state.lasku.laskuId} />
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="laskuNro">Tunniste</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="laskuNro" defaultValue={this.state.laskuNro} required />
                    </div>
                </div>

                
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="file"></label>
                    <div className="col-md-4">
                        <input className="form-control" type="file" name="Tiedoston" onChange={(e) => this.fileSelectedHandler(e)} />
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

       

        let file = e.target.files[0];
       // console.log(e.target.files[0]);

        this.setState({
            //title: "Muokkaa",
            //laskuId: 0,
            //laskuNro: "",
            //tunniste: "",
            tiedosto: file,
            loading: false

        });
        
    }
      
}

